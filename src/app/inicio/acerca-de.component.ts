import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acerca-de',
  template: `
    <div class="contenedor">
      <h2>Acerca de Valentine</h2>
      <mat-divider></mat-divider>
      <p>Somos una plataforma peruana de préstamos participativos donde las personas que tengan
      un capital podran invertir directamente en aquellas solicitudes de credito que consideres
      viables y con posibilidades de retorno.</p>
      <img src="assets/images/acercade.jpg">
    <div>
    `,
    styles: [`
    .contenedor {
      padding-left: 20px;
      padding-right: 20px;
    }
    `]
})
export class AcercaDeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
