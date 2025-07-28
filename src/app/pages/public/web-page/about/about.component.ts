import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {

  leetcodeCount: number = 0;
  hackerblocksCount: number = 0;

  @ViewChild('leetcodeBlock', { static: true }) leetcodeBlock!: ElementRef;
  @ViewChild('hackerblocksBlock', { static: true }) hackerblocksBlock!: ElementRef;

  ngAfterViewInit(): void {
    this.observeElement(this.leetcodeBlock.nativeElement, () => {
      this.resetAndAnimate('leetcodeCount', 100, 1500);
    });

    this.observeElement(this.hackerblocksBlock.nativeElement, () => {
      this.resetAndAnimate('hackerblocksCount', 400, 1500);
    });
  }

  resetAndAnimate(property: 'leetcodeCount' | 'hackerblocksCount', target: number, duration: number): void {
    this[property] = 0; // Reset to 0 first
    this.animateCount(property, target, duration);
  }

  animateCount(property: 'leetcodeCount' | 'hackerblocksCount', target: number, duration: number): void {
    let start = 0;
    const increment = target / (duration / 16);

    const animate = () => {
      start += increment;
      if (start < target) {
        this[property] = Math.floor(start);
        requestAnimationFrame(animate);
      } else {
        this[property] = target;
      }
    };

    animate();
  }

  observeElement(element: HTMLElement, callback: () => void): void {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
        // 👇 Don't unobserve — we want it to work every time it's visible
      }
    }, {
      threshold: 0.6 // Trigger when 60% visible (you can adjust)
    });

    observer.observe(element);
  }
}
