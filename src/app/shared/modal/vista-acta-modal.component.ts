import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EgresoService } from 'src/app/core/service';


/**
 * Componente que muestra el contenido del modal
 */
@Component({
  selector: 'vista-acta-modal-content',
  template: `
    <div class="modal-header d-flex justify-content-between" *ngIf="(datos !== undefined)">
      <div><strong>N°: {{datos.nro_remito}}</strong></div>
      <div><strong>R</strong></div>
      <div><strong>{{datos.fecha_emision | date: 'dd/MM/yyyy'}}</strong></div>
    </div>
    <div class="modal-body" *ngIf="(datos !== undefined)">
      <!-- <shared-lista-producto [stock]="datos.lista_producto" [submitted]="false" [borrar]="false" [vista]="true" [idComprobante]="idComprobante" ></shared-lista-producto> -->
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="pt-1" >Observación:</div>
          <div>
            <button class="btn btn-sm btn-outline-secondary" placement="top" ngbTooltip="Editar" ><i class="fas fa-edit"></i></button>
          </div>
        </div>
        <!-- <div *ngIf="(datos.descripcion != '')" class="card-body">
          <p>{{datos.descripcion}}<p>
        </div> -->
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="confirmar(true)"><i class="fas fa-times"></i> Cerrar</button>
    </div>
  `,
  styleUrls: ['./vista-comprobante-modal.component.scss']
})
export class VistaActaModalContent implements OnInit {
  @Input("idActa") public idActa: any;
  public datos: any;

  constructor( private _ativeModal: NgbActiveModal, private _egresoService: EgresoService, private _mensaje: AlertService ) { }

  ngOnInit() {
    // this.buscarActa(this.idActa);
  }

  cerrarModal() {
    this._ativeModal.close('close');
  }

  confirmar(confirmacion:boolean) {
    //this.listado.splice(this.id, 1);
    this._ativeModal.close('close');
  }

  /* buscarActa(id:number) {
    this._egresoService.buscarPorId(id).subscribe(
      respuesta => {
        console.log(respuesta);
        this.datos = respuesta;
      }, error => { this._mensaje.cancelado(error.message); })
  } */
}

@Component({
  selector: 'abrir-vista-acta-modal',
  templateUrl: './vista-acta-modal.component.html',
  styleUrls: ['./vista-acta-modal.component.scss']
})
export class VistaActaModalComponent {
  @Input("idActa") public idActa: any;

  constructor( private _modalService: NgbModal ) { }

  open() {
    const modalRef = this._modalService.open(VistaActaModalContent, { size: 'lg' });
    modalRef.componentInstance.idActa = this.idActa;
  }
}
