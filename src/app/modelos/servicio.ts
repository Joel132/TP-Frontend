import { FichaClinica } from 'src/app/modelos/ficha-clinica'

export class Servicio{
    idServicio : number;
    fechaHora: string;
    observacion: string;
    presupuesto: number;
    idFichaClinica : FichaClinica;
    fechaHoraCadena: string;
    fechaDesdeCadena: string;
    fechaHastaCadena: string;
}