import { Directive, ElementRef, Renderer2, AfterViewInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true, // This makes the directive standalone
})
export class AnimateOnScrollDirective implements AfterViewInit, OnDestroy {
  @Input() animationClass: string = 'animate-fade-in-left';
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    console.log('Directive initialized');
  }

  ngAfterViewInit() {
    this.initObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initObserver() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log("C'est là");
          this.renderer.addClass(this.el.nativeElement, this.animationClass);
        } else {
          console.log("Pas là");
        }
      });
    }, {
      threshold: 0.1
    });

    this.observer.observe(this.el.nativeElement);
  }
}
