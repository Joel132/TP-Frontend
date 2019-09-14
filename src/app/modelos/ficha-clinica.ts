import { Doctor } from './doctor';
import { Paciente } from './paciente';

export class FichaClinica{
    idFichaClinica: number;
    fechaHora: string;
    motivoConsulta: string;
    diagnostico: string;
    observacion: string;
    idEmpleado: Doctor;
    idCliente: Paciente;
    idTipoProducto: {idTipoProducto:number,descripcion:string,idCategoria:{idCategoria:number,descripcion:string}};//TODO: CAMBIAR A TIPO SUBCATEGORIA
    fechaHoraCadena: string;
    fechaDesdeCadena: string;
    fechaHastaCadena: string;
}