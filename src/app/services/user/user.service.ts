
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of, share } from 'rxjs';
import { SweetalertService } from 'src/app/services/sweetalert/sweetalert.service';
import { BackendService } from 'src/app/services/backend/backend.service'
import { DateTimeService } from 'src/app/services/dateTime/date-time.service';
import { AppabilityService } from '../casl/appability.service';


@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  
  permissions: any = {};
  loggedInUser = new BehaviorSubject<any>(null);
  loggedIn = new BehaviorSubject<boolean>(false);
  counter = 0;
  ability: any;

  constructor(
    private alert: SweetalertService,
    private backend: BackendService,
    private dateTimeService: DateTimeService,
    private abilityService: AppabilityService,
    private _router: Router,
    ) {
    // this.getCurrentUser();
  }
  
  async getCurrentUser() {
    try {
      const userData = await this.backend.getCurrentUser().toPromise();
      this.abilityService.updateAbility(userData);
      this.ability = this.abilityService.getAbility();
      this.loggedInUser.next(userData);  // Notify subscribers of updated data
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return userData;
    } catch (error) {
      if (error) {
        this.alert.showHttpError(error);
        localStorage.removeItem('currentUser');
      }
    }
  }
  
  unsetItems() {
    this.loggedInUser.next(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem("modifyTime");
  }

  fetchCurrentUser(): Observable<any> {
    return this.loggedInUser.asObservable().pipe(share());
  }
  get items() {
    return this.loggedInUser.value;
  }

  // Check Access
  isUser(roleName: string) {
    let userType = '';
    this.fetchCurrentUser().subscribe(data => {
      if (data) {
        userType = data.type;
      }
    });
    if (roleName == "admin" && userType == "1") {
      return true;
    }
    else {
      return false;
    }
  }
  // Check if the Current User is Admin
  isAdmin() {
    let localCurrentLoggedInData = JSON.parse(this.getUserFromStorage());
    return localCurrentLoggedInData["type"] == 1 ? true : false;
  }


  getUserFromStorage(): any {
    return (localStorage.getItem('currentUser')) || false;
  }

  isLoggedIn(): boolean {
    const user = this.loggedInUser.value || localStorage.getItem('currentUser');
    return !!user; // Returns true if user exists, false otherwise
  }

  updateLoginStatus(isLoggedIn: boolean) {
    this.loggedIn.next(isLoggedIn);
  }
  
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(async (resolve) => {
      let userData = this.loggedInUser.value;
  
      // If user data is not loaded, attempt to fetch it
      if (userData == null) {
        try {
          await this.getCurrentUser();
          userData = this.loggedInUser.value;
        } catch (error) {
          // If fetching user data fails, allow access to public routes
          if (route.routeConfig?.path === '') { // Adjust to match your public route path
            resolve(true);
            return;
          }
          this._router.navigate(['/']); // Redirect if route is protected
          resolve(false);
          return;
        }
      }
  
      // If the user is not an admin and permissions are required
      if (!this.isAdmin()) {
        if (state.url !== '/dashboard') {
          this.permissions = route.firstChild?.data?.['userAccess']?.permissions || 
                             route.data?.['userAccess']?.permissions;
          if (this.permissions && !this.ability.can(this.permissions[0].action, this.permissions[0].resource)) {
            this.alert.showError("Sorry you currently don't have permission to access this service");
            resolve(false);
            return;
          }
        }
      }
  
      resolve(true);
    });
  }
  

}