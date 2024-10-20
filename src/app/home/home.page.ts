import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('title', { read: ElementRef, static: true }) title!: ElementRef;
  usuario: string = 'Albert';

  constructor(
    private animationCtrl: AnimationController, 
    private toastController: ToastController, 
    private router: Router
  ) {}

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

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Hasta pronto!',
      duration: 3000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

  async goToLogin() {
    await this.presentToast();
    this.router.navigate(['/login']);
  }

  goToLista(){
    this.router.navigate(['/lista'])
  }
}
