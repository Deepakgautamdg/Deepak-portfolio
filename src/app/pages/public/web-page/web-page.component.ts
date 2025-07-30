

import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-web-page',
  templateUrl: './web-page.component.html',
  styleUrls: ['./web-page.component.css']
})
export class WebPageComponent implements OnInit {
  dynamicText: string = ''; 
  words: string[] = ['Developer', 'Programmer', 'Technophile', 'Web Developer', 'Software Engineer', 'Tech Enthusiast'];
  currentWordIndex: number = 0;
  typingSpeed: number = 170;
  erasingSpeed: number = 100;
  pauseTime: number = 1000;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.typeEffect();
    this.addHoverEffect();
  }

  typeEffect(): void {
    const currentWord = this.words[this.currentWordIndex];
    let charIndex = 0;

    const type = () => {
      if (charIndex < currentWord.length) {
        this.dynamicText += currentWord.charAt(charIndex);
        charIndex++;
        setTimeout(type, this.typingSpeed);
      } else {
        setTimeout(erase, this.pauseTime);
      }
    };

    const erase = () => {
      if (this.dynamicText.length > 0) {
        this.dynamicText = this.dynamicText.slice(0, -1);
        setTimeout(erase, this.erasingSpeed);
      } else {
        this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
        setTimeout(() => this.typeEffect(), this.typingSpeed);
      }
    };

    type();
  }

  addHoverEffect(): void {
    const imageElement = this.el.nativeElement.querySelector('.image');
    const heartContainer = this.el.nativeElement.querySelector('.heart-bubbles');

    this.renderer.listen(imageElement, 'mouseover', () => {
      this.createHeartEffect(heartContainer);
    });
  }

  createHeartEffect(container: HTMLElement): void {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const heart = this.renderer.createElement('i');
        this.renderer.addClass(heart, 'fa');
        this.renderer.addClass(heart, 'fa-heart');

        const size = Math.random() * 20 + 10; 
        this.renderer.setStyle(heart, 'fontSize', `${size}px`);

        const xPos = Math.random() * 100; 
        this.renderer.setStyle(heart, 'left', `${xPos}%`);
        this.renderer.setStyle(heart, 'bottom', '0');
        this.renderer.setStyle(heart, 'position', 'absolute');

        container.appendChild(heart);

        setTimeout(() => {
          container.removeChild(heart);
        }, 1000);
      }, i * 200);
    }
  }
}
