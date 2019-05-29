import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inversor',
  template: `
    <div class="contenedor">
      <h2>Consigue una alta rentabilidad por tu dinero</h2>
      <mat-divider></mat-divider>
      <p>Somos una plataforma peruana de préstamos participativos donde las personas que tengan
      un capital podran invertir directamente en aquellas solicitudes de credito que consideres
      viables y con posibilidades de retorno.</p>
      <img src="assets/images/inversores.jpg">
      <br><br>
      <button mat-raised-button color="warn" class="botonbanner">Abre tu cuenta</button>
    <div>
    `,
    styles: [`
    .contenedor {
      padding-left: 20px;
      padding-right: 20px;
    }
    .botonbanner {
      width: 180px;
    }
    `]
})
export class InversorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
