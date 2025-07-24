import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { SweetalertService } from '../sweetalert/sweetalert.service';
import { UserService } from '../user/user.service';
import { NavigationError, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {

  constructor(private loaderService: LoaderService,
    private alert: SweetalertService,
    private http: HttpClient,
    private router: Router) {
    // console.log('Loader Interceptor Service Constructor Loaded');
    this.checkInternet();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoader();
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.onEnd();
      }
    },
      (err: any) => {
        // console.log('Error from HttpInterceptor', err);
        this.alert.showHttpError(err);
        this.onEnd();
      }));

  }
  // Method to listen for internet status and show alerts on status change
  checkInternet(): void {
    // Handle route-level errors, particularly those that don't involve HTTP requests
    this.router.events.subscribe(event => {
      if (event instanceof NavigationError) {
        if (event.error && event.error.name === 'ChunkLoadError') {
          // Handle the chunk load error and display appropriate message
          this.alert.showError("Failed to load the page. Please check your network connection.");
        }
      }
    });

    // Detect when the device goes offline
    window.addEventListener('offline', () => {
      this.alert.showError("You are offline. Please check your network connection.");
    });

    // Detect when the device goes online and verify internet connectivity
    window.addEventListener('online', () => {
      this.checkInternetConnection().subscribe(isConnected => {
        if (isConnected) {
          this.alert.showSuccess('Internet connection restored. Reloading...');
          setTimeout(() => {
            window.location.reload();  // Optional: Reload page once internet is back
          }, 1000);
        } else {
          this.alert.showError('No internet connection, even though you are connected to Wi-Fi.');
        }
      });
    });
  }
  // Direct method to check for actual internet access
  checkInternetConnection(): Observable<boolean> {
    const url = 'https://jsonplaceholder.typicode.com/posts/1'; // No CORS issues with this endpoint
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(() => true),  // Successful response (e.g., 204) means internet is available
      catchError(() => of(false))  // On error, return false
    );
  }


  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }
}
