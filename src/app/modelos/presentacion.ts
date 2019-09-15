import { Categoria } from './categoria';

export class Presentacion{
    idPresentacionProducto: number;
    descripcion: string;
    nombre: string;
    idProducto: {idProducto:number, idTipoProducto: {idTipoProducto:number,descripcion:string, idCategoria: Categoria}};
    codigo: string;
    flagServicio: string;

}