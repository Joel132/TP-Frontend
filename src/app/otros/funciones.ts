import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formatear una fecha en el formato YYYY-MM-DD
 * @param date la fecha a formatear
 */
export function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export function noSeleccionadoValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      let asignado;
      asignado=control.value&&control.value.idPersona;
      console.log(control.value);
      return asignado ? null:{'noSeleccionado': {message: 'No seleccionado'}};
    };
  
    
  }

  @Pipe({name: 'formatoFecha'})
  export class formatoFecha implements PipeTransform {
    transform(value: string): string {
      return value.slice(0,2)+':'+value.slice(2,4);   
    }
  }
  