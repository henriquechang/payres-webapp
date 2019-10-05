import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {NgxMaskModule, IConfig } from 'ngx-mask'
import { HttpClientModule } from '@angular/common/http'; 

import { ListaMesasComponent } from './lista-mesas/lista-mesas.component';
import { MenuConsumoComponent } from './menu-consumo/menu-consumo.component';
import { GerarConsumoComponent } from './gerar-consumo/gerar-consumo.component';
import { GerarConsumoSnackbarComponent } from './gerar-consumo/gerar-consumo.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    ListaMesasComponent,
    MenuConsumoComponent,
    GerarConsumoComponent,
    GerarConsumoSnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatDividerModule,
    MatChipsModule,
    NgxMaskModule.forRoot(options),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [GerarConsumoComponent, GerarConsumoSnackbarComponent]
})
 
export class AppModule { }
