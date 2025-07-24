import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,) {}

  ngOnInit(): void {
  }
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
