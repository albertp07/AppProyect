import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('title', { read: ElementRef, static: true }) title!: ElementRef;

  message: string = "Inicio de Sesión";
  username!: string;
  password!: string;

  constructor(
    private toastController: ToastController,
    private router: Router,
    private animationCtrl: AnimationController,
    private authService: AuthService
  ) {   }

  ngOnInit() {
    console.log('ngOnInit se ejecuta una vez');
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  async validateLogin(){
    const isAuthenticated = this.authService.login(this.username, this.password);

    if(isAuthenticated){
      this.showToastMessage('Bienvenido', 'success')
      const extras: NavigationExtras = {
        state: {
          username: this.username
        }
      }

      this.router.navigate(['/home'], extras)
    }else{
      this.showToastMessage('Credenciales Incorrectas', 'danger')
    }
  }

  async showToastMessage(message: string, color: string){
    const toast = await this.toastController.create({
      duration: 3000,
      message: message,
      position: 'top',
      color: color
    });
    toast.present();
  }

  goToHome(){
    this.router.navigate(['/home'])
  }

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

}
