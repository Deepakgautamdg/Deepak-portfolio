import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

  ngOnInit(): void {
  }

  // Get all elements with the #pageSection template reference variable
  @ViewChildren('pageSection') sections!: QueryList<ElementRef>;
  // Get all elements with the #dot template reference variable
  @ViewChildren('dot') dots!: QueryList<ElementRef>;

  private observer!: IntersectionObserver;

  // Renderer2 is a safe way to interact with the DOM in Angular
  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    // Ensure the view is initialized before setting up the observer
    this.setupIntersectionObserver();
    this.observeSections();
  }

  /**
   * Sets up the IntersectionObserver to watch for when sections become visible.
   */
  private setupIntersectionObserver(): void {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.5 // Trigger when 50% of the section is visible
    };

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        const pageId = entry.target.id;
        
        if (entry.isIntersecting) {
          // When a section is intersecting, update the active dot
          this.updateActiveDot(pageId);
          // Add a class to the section for content animations
          this.renderer.addClass(entry.target, 'is-visible');
        } else {
          // Optional: remove animation class when not visible to re-trigger on scroll up
          this.renderer.removeClass(entry.target, 'is-visible');
        }
      });
    }, options);
  }

  /**
   * Attaches the observer to each section.
   */
  private observeSections(): void {
    this.sections.forEach(section => {
      this.observer.observe(section.nativeElement);
    });
  }

  /**
   * Updates which progress dot is marked as 'active'.
   * @param activePageId The ID of the currently visible page section.
   */
  private updateActiveDot(activePageId: string): void {
    this.dots.forEach(dot => {
      const dotPageId = dot.nativeElement.getAttribute('data-page');
      if (dotPageId === activePageId) {
        this.renderer.addClass(dot.nativeElement, 'active');
      } else {
        this.renderer.removeClass(dot.nativeElement, 'active');
      }
    });
  }

  /**
   * Scrolls to the clicked section smoothly.
   * @param pageId The ID of the section to scroll to.
   */
  scrollToPage(pageId: string): void {
    const element = document.getElementById(pageId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
