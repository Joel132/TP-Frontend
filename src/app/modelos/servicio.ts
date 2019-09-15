import { FichaClinica } from 'src/app/modelos/ficha-clinica'
import { Presentacion } from './presentacion';

export class Servicio{
    idServicio : number;
    fechaHora: string;
    observacion: string;
    presupuesto: number;
    idFichaClinica : FichaClinica;
    fechaHoraCadena: string;
    fechaDesdeCadena: string;
    fechaHastaCadena: string;
    estado: string;
    flagEstado: string;
}

export class DetalleServicio{
    idServicioDetalle: number;
    cantidad: number;
    idPresentacionProducto: Presentacion;
    idServicio:Servicio;
    precio: number;
}