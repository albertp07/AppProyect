import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AnimationController, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('title', { read: ElementRef, static: true }) title!: ElementRef;
  usuario: string = '';

  constructor(
    private animationCtrl: AnimationController, 
    private toastController: ToastController, 
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {

    const usuarioGuardado = await this.storageService.get('usuario');

    if(usuarioGuardado){
      this.usuario = usuarioGuardado
    }
  }

  async logout() {
    await this.storageService.clear();
    console.log('Datos limpiados y usuario deslogueado');
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

  async presentLogoutConfirm() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que deseas salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Salida cancelada');
          }
        },
        {
          text: 'Salir',
          handler: async () => {
            await this.authService.logout();
            this.goToLogin();
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  
}
