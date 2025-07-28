import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, AfterViewInit {
  words: string[] = [
    'Java', 'Node JS', 'Angular JS', 'Express JS', 'Javascript', 'HTML', 'CSS', 'MongoDB', 'Elasticsearch', 
    'SuitCRM', 'Kibana', 'NMAP', 'Git', 'Gitlab', 'Jenkins', 'Puppeteer', 'logstash'
  ];

  wordStyles: { 
    word: string; 
    x: number; 
    y: number; 
    z: number; 
    opacity: number; 
    scale: number; 
    color: string;
  }[] = [];

  baseAngleX = 0.015;
  baseAngleY = 0.015;
  slowAngleX = 0.002;
  slowAngleY = 0.002;
  angleX = this.baseAngleX;
  angleY = this.baseAngleY;
  radius = 120;
  rotationActive = true;
  hoveredIndex: number | null = null;
  isInitialized = false;
  private resizeDebounce: any;

  constructor() {
    this.calculateInitialRadius();
  }

  ngOnInit(): void {
    this.initializeWords();
  }

  ngAfterViewInit(): void {
    this.startRotation();
    setTimeout(() => this.isInitialized = true, 0);
  }

  // private calculateInitialRadius(): void {
  //   if (typeof window !== 'undefined') {
  //     this.radius = Math.min(window.innerWidth, window.innerHeight) / 8;
  //   }
  // }

  private calculateInitialRadius(): void {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width <= 480) {
      this.radius = Math.min(width, height) / 3.5; // Increased radius for mobile
    } else if (width <= 768) {
      this.radius = Math.min(width, height) / 2.5; // Slightly larger radius for tablets
    } else {
      this.radius = Math.min(width, height) / 8; // Default for desktop
    }
  }
}


  initializeWords(): void {
    const len = this.words.length;
    this.wordStyles = this.words.map((word, index) => {
      const theta = Math.acos(-1 + (2 * index) / len);
      const phi = Math.sqrt(len * Math.PI) * theta;

      const z = this.radius * Math.cos(theta);
      const scale = (z + this.radius) / (2 * this.radius) + 0.5;
      const brightness = Math.floor(50 + (scale * 50));
      const color = `rgb(${brightness}%, ${brightness}%, ${brightness}%)`;

      return {
        word,
        x: this.radius * Math.sin(theta) * Math.cos(phi),
        y: this.radius * Math.sin(theta) * Math.sin(phi),
        z,
        opacity: 1,
        scale,
        color
      };
    });
  }

  startRotation(): void {
    const rotate = () => {
      if (this.rotationActive) {
        this.rotateWords();
        requestAnimationFrame(rotate);
      }
    };
    requestAnimationFrame(rotate);
  }

  rotateWords(): void {
    this.wordStyles = this.wordStyles.map((style) => {
      let { x, y, z } = style;
      const cosX = Math.cos(-this.angleX), sinX = Math.sin(-this.angleX);
      const cosY = Math.cos(-this.angleY), sinY = Math.sin(-this.angleY);
  
      const y1 = y * cosX - z * sinX;
      const z1 = y * sinX + z * cosX;
      const x1 = x * cosY + z1 * sinY;
      const z2 = -x * sinY + z1 * cosY;
  
      const scale = (z2 + this.radius) / (2 * this.radius) + 0.5;
      let opacity = Math.max(0, Math.min(1, scale));
  
      if (z2 < -this.radius * 0.1) {
        opacity = Math.max(0, 1 - Math.abs(z2 / this.radius));
      }
  
      const brightness = Math.floor(30 + (scale * 70));
      const color = `rgb(${brightness}%, ${brightness}%, ${brightness}%)`;
  
      return { ...style, x: x1, y: y1, z: z2, opacity, scale, color };
    });
  }

  pauseRotation(index: number): void {
    this.rotationActive = false;
    this.hoveredIndex = index;
  }

  resumeRotation(): void {
    this.rotationActive = true;
    this.hoveredIndex = null;
    this.startRotation();
  }

  slowDownRotation(): void {
    this.angleX = this.slowAngleX;
    this.angleY = this.slowAngleY;
  }

  restoreRotationSpeed(): void {
    this.angleX = this.baseAngleX;
    this.angleY = this.baseAngleY;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    clearTimeout(this.resizeDebounce);
    this.resizeDebounce = setTimeout(() => {
      this.calculateInitialRadius();
      this.initializeWords();
    }, 100);
  }
}