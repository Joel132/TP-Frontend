import { Doctor } from './doctor';

export class Horario{
    idPersonaHorarioAgenda: number;
    dia: number;
    horaApertura: string;
    horaCierre: string;
    intervaloMinutos: number;
    horaAperturaCadena: string;
    horaCierreCadena: string;
    diaCadena: string;
    idEmpleado: Doctor;
}

export class HorarioExcepcion{
    idHorarioExcepcion: number;
    fecha: string;
    horaApertura: string;
    horaCierre: string;
    flagEsHabilitar: string;
    idEmpleado: Doctor;
    intervaloMinutos: number;
    horaAperturaCadena: string;
    horaCierreCadena: string;
    fechaCadena: string;
}