import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {
  userData: any; // Stores the user data
  isLoggedIn: boolean = false; // Tracks if the user is logged in
  username: string = ''; // Stores the username
  isAdmin: boolean = false; // Tracks if the user is an admin

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    // Subscribe to user data to check logged-in status and fetch user details
    this.userService.fetchCurrentUser().subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.userData = user;
        this.username = user.name; // Assuming 'name' is part of the user data
        this.isAdmin = this.userService.isAdmin(); // Check if the user is an admin
      } else {
        this.isLoggedIn = false;
      }
    });

    // Double-check logged-in status in case user data isn't immediately available
    this.isLoggedIn = this.userService.isLoggedIn();
    if (this.isLoggedIn && !this.userData) {
      const localUser = this.userService.getUserFromStorage();
      if (localUser) {
        this.userData = JSON.parse(localUser);
        this.username = this.userData.name;
        this.isAdmin = this.userData.type === 1; // Assuming 'type' indicates admin status
      }
    }
  }

  // Navigate to specified routes
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
