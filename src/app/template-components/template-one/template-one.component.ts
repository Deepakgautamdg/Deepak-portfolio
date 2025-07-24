import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.css']
})
export class TemplateOneComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;

  show: boolean = true;
  drawerMode: 'side' | 'over' = 'side';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) { }

  ngOnInit() {
    // Observe screen size changes
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.show = false; // Close the sidebar by default on small screens
          this.drawerMode = 'over'; // Set sidebar to 'over' mode on small screens
        } else {
          this.show = true;  // Keep the sidebar open on larger screens
          this.drawerMode = 'side'; // Set sidebar to 'side' mode on larger screens
        }
      });

    // Listen for route changes to close drawer after navigation on mobile view
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.drawerMode === 'over' && this.drawer.opened) {
        this.drawer.close();  // Close the drawer after navigation in 'over' mode
      }
    });
  }

  showSidebar(event: any) {
    this.show = event;
    this.drawer.toggle();
  }
}
