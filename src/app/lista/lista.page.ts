import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, IonContent, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { JsonplaceholderService } from '../services/jsonplaceholder.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage  {
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  people: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  paginatedPeople: any[] = [];
  totalPages: number = 0;
  targetPage: number = 1;

  @ViewChild('title', { read: ElementRef, static: true }) title!: ElementRef;

  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private jsonPlaceholderService: JsonplaceholderService,
    private toastController: ToastController
  ) { }

  goToHome() {
    this.router.navigate(['/home']);
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

  ngOnInit() {
    this.jsonPlaceholderService.getPosts().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.people = data.map((item: any) => ({
          id: item.id,
          firstName: `Nombre ${item.id}`,
          lastName: `Apellido ${item.id}`,
          country: 'País Simulado',
          age: Math.floor(Math.random() * (50 - 20 + 1)) + 20
        }));
        this.totalPages = Math.ceil(this.people.length / this.itemsPerPage);
        this.updatePage();
      },
      (error) => {
        console.error('Error al obtener las publicaciones', error);
      }
    );
  }

  updatePage() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPeople = this.people.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
      this.content.scrollToTop(300);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
      this.content.scrollToTop(300);
    }
  }

  async goToPage() {
    if (this.targetPage >= 1 && this.targetPage <= this.totalPages) {
      this.currentPage = this.targetPage;
      this.updatePage();
      this.content.scrollToTop(300);
    } else {
      this.showOutOfRangeToast();
    }
  }

  async showOutOfRangeToast() {
    const toast = await this.toastController.create({
      message: 'Número de página fuera de rango',
      duration: 2000,
      color: 'warning',
      position: 'top'
    });
    toast.present();
  }
}
