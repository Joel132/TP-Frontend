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