import { Component, OnInit, Input } from '@angular/core';
import { ComprobanteService } from 'src/app/core/service/comprobante.service';
import { AlertService } from 'src/app/core/service';

@Component({
  selector: 'shared-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.scss']
})
export class ListaProductoComponent implements OnInit {
  @Input("stock") public stock:any;
  @Input("submitted") public submitted: boolean;
  @Input("borrar") public borrar: boolean;
  @Input("vista") public vista: boolean;
  @Input("idComprobante") public idComprobante:number;

  constructor(private _comprobanteService: ComprobanteService, private _mensaje: AlertService) { }

  ngOnInit(): void {
  }

  obtenerProductoFaltante(productoOrigen:any, indiceProductoOrigen:number, productoNuevo:any) {
    productoOrigen['cantidad'] = parseInt(productoOrigen['cantidad']) - parseInt(productoNuevo['cantidad']);

    if(this.vista) { // si esta en vista
      let producto: object = {
        cantidad: productoNuevo["cantidad"], productoid: productoNuevo["productoid"],
        fecha_vencimiento: productoNuevo["fecha_vencimiento"], falta: true
      };
      this.modificarProductoFaltante(this.idComprobante, producto);
    }else{ // Si no es vista
      // borro el producto origen si la cantidad es igual a cero
      if (productoOrigen['cantidad'] == 0){
        this.stock.splice(indiceProductoOrigen, 1);
      }

      this.stock.push(productoNuevo);
    }
  }

  info(falta: boolean) {
    return (falta) ? 'Falta' : '';
  }

  modificarProductoFaltante(idComprobante: number, params:object) {
    this._comprobanteService.actualizarProductoFaltante(this.idComprobante, params).subscribe(
      respuesta => {
        console.log(respuesta);
        this.refrescarStock(respuesta["comprobanteid"]);
      }, error => { this._mensaje.cancelado(error.message); }
    )
  }

  refrescarStock(idComprobante: number) {
      this._comprobanteService.buscarPorId(idComprobante).subscribe(
        respuesta => {
          this.stock = respuesta["lista_producto"];
        }, error => { this._mensaje.cancelado(error.message); })
  }

  registrarProductoDevuelto(productoOrigen:any, indiceProductoOrigen:number, productoNuevo:any) {

  }

}
