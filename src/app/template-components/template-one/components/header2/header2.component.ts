// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-header2',
//   templateUrl: './header2.component.html',
//   styleUrls: ['./header2.component.css']
// })
// export class Header2Component implements OnInit {
//   showMobileMenu = false;

//   constructor(private router: Router) {}

//   ngOnInit(): void {}

//   navigateTo(sectionId: string) {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   }

//   toggleMobileMenu() {
//     this.showMobileMenu = !this.showMobileMenu;
//   }
// }



import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {
  showMobileMenu = false;
  isProjectRoute = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isProjectRoute = event.urlAfterRedirects.includes('/project');
      });
  }

  navigateTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(['/']); // fallback to home
    }
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }
}
