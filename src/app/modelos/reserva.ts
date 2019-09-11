import { Paciente } from './paciente';
import { Doctor } from './doctor';

export class Reserva{
    idReserva: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    fechaHoraCreacion: string;
    flagEstado: string;
    flagAsistio: string;
    observacion: string;
    idFichaClinica: string;
    idLocal: string;
    idCliente: Paciente;
    idEmpleado: Doctor;
    fechaCadena: string;
    fechaDesdeCadena: string;
    fechaHastaCadena: string;
    horaInicioCadena: string;
    horaFinCadena: string;
}