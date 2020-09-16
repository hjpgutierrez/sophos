import { Injectable } from '@angular/core';
import { ITransaccion } from 'src/app/models/ITransaccion';

const TransaccionaesSemilla: ITransaccion[] = [
    {
      id: 1,
      cliente: 'Henry Paez',
      intentos: 2,
      estado: 'RECHAZADO',
      fecha: '1992-11-17',
      archivo : ''
    },
    {
        id: 2,
        cliente: 'Anyelis Parra',
        intentos: 4,
        estado: 'APROBADO',
        fecha: '1990-10-12',
        archivo : ''
    },
    {
        id: 3,
        cliente: 'Rosa Gutierrez',
        intentos: 1,
        estado: 'PENDIENTE',
        fecha: '1964-09-12',
        archivo : ''
    },
    {
        id: 4,
        cliente: 'Rosymar Martinez',
        intentos: 6,
        estado: 'RECHAZADO',
        fecha: '2015-01-15',
        archivo : 'log.png'
    }
  ];

  const nombreTablaTransacciones :string = 'lista_transacciones';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  lista: ITransaccion[] = [];

  constructor() { 

      if(!this.ValidarLista()){
        this.AgregarRegistrosSemilla();
      }
      
  }

  ValidarLista() : boolean {
    var jsonTransacciones = localStorage.getItem(nombreTablaTransacciones);
    if(jsonTransacciones){
        this.lista = JSON.parse(jsonTransacciones);
        return this.lista.length > 0;
    }
   
    return false;
  }
 

  AgregarRegistrosSemilla() {
        this.lista = TransaccionaesSemilla;
        this.PersistirArray();
  }

  Guardar(itemGuardar: ITransaccion) {
    itemGuardar.id = this.lista.length + 1;
    this.lista.push(itemGuardar);
    this.PersistirArray();      
  }

  Editar(itemGuardar: ITransaccion) {    
      this.Eliminar(itemGuardar);
      this.lista.push(itemGuardar);
      this.PersistirArray();      
    }

    Eliminar(item: ITransaccion) {

      const index = this.lista.findIndex(x => x.id === item.id);
      if (index > -1) {
        this.lista.splice(index, 1);
      }
      this.PersistirArray(); 
    }

  PersistirArray(){
    localStorage.setItem(nombreTablaTransacciones, JSON.stringify(this.lista))
  }

 

}
