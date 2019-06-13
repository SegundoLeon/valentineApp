import { Injectable } from '@angular/core';

@Injectable()
export class Utilitarios {
  public static crearURLSolicitud(host: string, prefijo: string = 'api') {
    return `${host}${prefijo}/`;
  }

  public static analizarJson(valor: string) {
    try {
      return JSON.parse(valor);
    } catch(e) {
      if (valor === 'undefined') {
        return void 0;
      }
    }
  }

}
