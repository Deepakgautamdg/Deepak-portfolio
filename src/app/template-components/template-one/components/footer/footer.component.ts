import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLoggedIn: boolean = false; // Track if the user is logged in

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  
  }
}
