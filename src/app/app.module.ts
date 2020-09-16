import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

// Servicios
import {TransaccionService} from './services/transaccion.service';


@NgModule({  
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    NgbAlertModule
  ],
  providers: [TransaccionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
