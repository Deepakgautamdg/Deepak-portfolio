import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend/backend.service';
import { SweetalertService } from 'src/app/services/sweetalert/sweetalert.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLoggedIn: boolean = false; // Track if the user is logged in

  constructor(
    private userService: UserService,
    private alert: SweetalertService,
    private backend: BackendService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check logged-in status using UserService
    console.log("login status before", this.isLoggedIn )
    this.isLoggedIn = this.userService.isLoggedIn();
    console.log("login status after", this.isLoggedIn )

    // Listen to changes in current user data
    this.userService.fetchCurrentUser().subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  signOut(): void {
    this.alert.warnCallback('Are you sure you want to Sign Out?').then((ok) => {
      if (ok) {
        this.alert.wait();
        this.backend.logout().subscribe({
          next: () => {
            this.userService.unsetItems(); // Clear user-related data
            this.router.navigate(['/']); // Redirect to home or login page
            this.alert.showSuccess('Logged out successfully');
          },
          error: (error: any) => {
            this.alert.showError(error); // Display error on logout failure
          }
        });
      }
    });
  }
}
