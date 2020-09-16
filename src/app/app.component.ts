import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {NgbDateStruct, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import { ITransaccion } from 'src/app/models/ITransaccion';
import { TransaccionService } from './services/transaccion.service';

import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  itemFecha: NgbDateStruct;  
  isError = false;
  isSaved = false;
  accionEditar = false;
  objetoFormulario: ITransaccion;  
  fileName= 'Excel.xlsx'; 

  constructor(
    public servicio: TransaccionService, 
    public calendar: NgbCalendar,
    private parserFormatter: NgbDateParserFormatter) { 
    this.inicializarFormulario();
  } 

  inicializarFormulario(){
    this.objetoFormulario = {
      cliente: '',
      fecha: '',
      estado : 'PENDIENTE',
      archivo : '',
      id : 0
    };
    this.accionEditar = false;
    this.itemFecha = this.calendar.getToday();
  }


  onSave(form: NgForm) {
   
    if (form.valid) {

      this.ValidarObjetoGuardar();
      if(!this.accionEditar) {
        this.servicio.Guardar(this.objetoFormulario);
        
      }else{
        this.servicio.Editar(this.objetoFormulario);
        
      }

      this.inicializarFormulario();      
    }
  }

  ValidarObjetoGuardar(){
    this.objetoFormulario.fecha = this.parserFormatter.format(this.itemFecha);
    
  }

  onUpdate(item: ITransaccion) {   
    this.objetoFormulario = Object.assign({}, item);
    this.itemFecha = this.parserFormatter.parse(item.fecha);
    this.accionEditar = true;   
  }

  onDelete(item: ITransaccion) {   
     this.servicio.Eliminar(item);   
  }

  onIsError(): void {
    this.isError = true;
    this.isSaved = false;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  onReset(){
    this.inicializarFormulario();
  }

  exportexcel(): void 
    {
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       XLSX.writeFile(wb, this.fileName);			
    }

}
