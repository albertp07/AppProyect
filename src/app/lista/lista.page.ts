import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { JsonplaceholderService } from '../services/jsonplaceholder.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage  {
  @ViewChild(IonContent, { static: false }) content!: IonContent; // Agrega una referencia a IonContent

  people: any[] = [];
  currentPage: number = 1; // Página actual
  itemsPerPage: number = 10; // Número de elementos por página
  paginatedPeople: any[] = []; // Array para almacenar los datos de la página actual


  @ViewChild('title', { read: ElementRef, static: true }) title!: ElementRef;

  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private jsonPlaceholderService: JsonplaceholderService
  ) { }

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

  ngOnInit() {
    // Llamar al método del servicio para obtener las publicaciones
    this.jsonPlaceholderService.getPosts().subscribe(
      (data) => {
        console.log('Datos recibidos:', data); // Agrega esta línea
        // Aquí transformamos los datos para simular las personas con los campos deseados
        this.people = data.map((item: any) => ({
          id: item.id,
          firstName: `Nombre ${item.id}`, // Simulamos el nombre
          lastName: `Apellido ${item.id}`, // Simulamos el apellido
          country: 'País Simulado', // Simulamos el país
          age: Math.floor(Math.random() * (50 - 20 + 1)) + 20 // Edad aleatoria entre 20 y 50
        }));
        this.updatePage(); // Actualizamos la vista de la primera página
      },
      (error) => {
        console.error('Error al obtener las publicaciones', error);
      }
    );
  }

  // Actualizar la lista visible según la página actual
  updatePage() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPeople = this.people.slice(startIndex, endIndex);
  }

  // Ir a la página siguiente
  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.people.length) {
      this.currentPage++;
      this.updatePage();
      this.content.scrollToTop(300);
    }
  }

  // Ir a la página anterior
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
      this.content.scrollToTop(300);
    }
  }

}
