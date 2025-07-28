import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {

  }

  navigateTo(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}


  // Navigate to specified routes
  // navigateTo(route: string): void {
  //   this.router.navigate([route]);
  // }
}
