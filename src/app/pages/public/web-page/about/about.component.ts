// import { Component, OnInit, HostListener } from '@angular/core';

// @Component({
//   selector: 'app-about',
//   templateUrl: './about.component.html',
//   styleUrls: ['./about.component.css']
// })
// export class AboutComponent implements OnInit {
  // words: string[] = [
  //   'Java', 'Node JS', 'Angular JS', 'Express JS', 'Javascript', 'C++', 'HTML', 'CSS',
  //   'MongoDB', 'Elasticsearch', 'SuitCRM', 'Kibana', 'NMAP', 'Git', 'Gitlab', 'Jenkins'
  // ];

  // wordStyles: { 
  //   word: string; 
  //   x: number; 
  //   y: number; 
  //   z: number; 
  //   opacity: number; 
  //   scale: number; 
  //   color: string;
  // }[] = [];

  // baseAngleX = 0.01;
  // baseAngleY = 0.01;
  // slowAngleX = 0.002; // Slower speed when hovered
  // slowAngleY = 0.002;
  // angleX = this.baseAngleX; 
  // angleY = this.baseAngleY;
  // radius = 110;
  // rotationActive = true;
  // hoveredIndex: number | null = null; 

  // constructor() {}

  // ngOnInit(): void {
    // this.initializeWords();
    // this.startRotation();
  // }

  // initializeWords(): void {
  //   let len = this.words.length;
  //   this.wordStyles = this.words.map((word, index) => {
  //     const theta = Math.acos(-1 + (2 * index) / len);
  //     const phi = Math.sqrt(len * Math.PI) * theta;

  //     let z = this.radius * Math.cos(theta);
  //     let scale = (z + this.radius) / (2 * this.radius) + 0.5;
  //     let brightness = Math.floor(50 + (scale * 50));
  //     let color = `rgb(${brightness}%, ${brightness}%, ${brightness}%)`;

  //     return {
  //       word,
  //       x: this.radius * Math.sin(theta) * Math.cos(phi),
  //       y: this.radius * Math.sin(theta) * Math.sin(phi),
  //       z,
  //       opacity: 1,
  //       scale,
  //       color
  //     };
  //   });
  // }

  // startRotation(): void {
  //   const rotate = () => {
  //     if (this.rotationActive) {
  //       this.rotateWords();
  //       requestAnimationFrame(rotate);
  //     }
  //   };
  //   requestAnimationFrame(rotate);
  // }

  // rotateWords(): void {
  //   this.wordStyles = this.wordStyles.map((style) => {
  //     let { x, y, z } = style;
  //     let cosX = Math.cos(-this.angleX), sinX = Math.sin(-this.angleX);
  //     let cosY = Math.cos(-this.angleY), sinY = Math.sin(-this.angleY);
  
  //     let y1 = y * cosX - z * sinX;
  //     let z1 = y * sinX + z * cosX;
  //     let x1 = x * cosY + z1 * sinY;
  //     let z2 = -x * sinY + z1 * cosY;
  
  //     let scale = (z2 + this.radius) / (2 * this.radius) + 0.5;
  
  //     // Smooth opacity transition
  //     let opacity = Math.max(0, Math.min(1, scale)); // Keeps opacity in range [0,1]
  
  //     // Reduce opacity gradually as word moves back
  //     if (z2 < -this.radius * 0.1) {
  //       opacity = Math.max(0, 1 - Math.abs(z2 / this.radius)); // Gradually fades from 100% to 0%
  //     }
  
  //     // Dynamic brightness for a fading effect
  //     let brightness = Math.floor(30 + (scale * 70)); // Ensures a better darkening effect
  //     let color = `rgb(${brightness}%, ${brightness}%, ${brightness}%)`;
  
  //     return { ...style, x: x1, y: y1, z: z2, opacity, scale, color };
  //   });
  // }
  

  // pauseRotation(index: number): void {
  //   this.rotationActive = false;
  //   this.hoveredIndex = index;
  // }

  // resumeRotation(): void {
  //   this.rotationActive = true;
  //   this.hoveredIndex = null;
  //   this.startRotation();
  // }

  // @HostListener('mouseenter', ['$event'])
  // slowDownRotation(): void {
  //   this.angleX = this.slowAngleX;
  //   this.angleY = this.slowAngleY;
  // }

  // @HostListener('mouseleave', ['$event'])
  // restoreRotationSpeed(): void {
  //   this.angleX = this.baseAngleX;
  //   this.angleY = this.baseAngleY;
  // }
// }

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
      this.animateCount('leetcodeCount', 100, 1500);
    });

    this.observeElement(this.hackerblocksBlock.nativeElement, () => {
      this.animateCount('hackerblocksCount', 400, 1500);
    });
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
        observer.unobserve(element); // run only once
      }
    });

    observer.observe(element);
  }
}
