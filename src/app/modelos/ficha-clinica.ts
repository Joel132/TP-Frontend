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
    idTipoProducto: string;
    fechaHoraCadena: string;
    fechaDesdeCadena: string;
    fechaHastaCadena: string;
}