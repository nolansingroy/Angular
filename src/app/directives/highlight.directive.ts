
import { Directive, ElementRef, Renderer2, HostListener  } from '@angular/core';
@Directive({
  selector: '[appHighlight]'
})

export class HighlightDirective {

  constructor(private el: ElementRef,
		private renderer: Renderer2
	) { }

@HostListener('mouseeneter') onMouseEnter(){
this.renderer.addClass(this.el.nativeElement,'highlight')
console.log('mouse has entered menu component!');
}

@HostListener('mouseleave') onMouseLeave(){
//when the mouse leaves remove the class
this.renderer.removeClass(this.el.nativeElement,'highlight');

}

}
