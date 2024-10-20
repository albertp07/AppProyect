import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage  {

  @ViewChild('title', { read: ElementRef, static: true }) title!: ElementRef;

  constructor(
    private router: Router,
    private animationCtrl: AnimationController
  ) { }

  ngAfterViewInit() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.title.nativeElement)
      .duration(3500)
      .iterations(Infinity)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'scale3d(1, 1, 1)', 'scale3d(1.5, 1.5, 1.5)');

    animation.play();
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

}
