export class Detalle{
    idServicioDetalle : number;
    cantidad: number;
    idPresentacionProducto: {
        idPresentacionProducto: number, 
        nombre: string,
        idProducto: {
            idProducto: number,
            idTipoProducto: {
                idTipoProducto: number,
                descripcion: string,
                idCategoria: {
                    idCategoria: number,
                    descripcion: string,
                }
            }
        }
    }
}