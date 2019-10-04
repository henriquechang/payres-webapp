import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { GerarConsumoComponent } from '../gerar-consumo/gerar-consumo.component';
import { ConsumoService } from '../consumo.service';
import { itensPedidos } from '../consumo.service';
import { Mesa } from '../consumo.service';

@Component({
  selector: 'app-lista-mesas',
  templateUrl: './lista-mesas.component.html',
  styleUrls: ['./lista-mesas.component.css']
})
export class ListaMesasComponent implements OnInit {

  mesaSelecionada: Mesa;
  mesas: Mesa[];
  error: any;
  listaItensPedidos: itensPedidos[];
  @Output() listaMesaSelecionadaAtualizada = new EventEmitter();
  @Output() listaItensPedidosAtualizada = new EventEmitter();

  constructor(public dialog: MatDialog, private consumoService: ConsumoService) { 
  }

  abrirModalProdutos(mesaSelecionada): void {
    if(mesaSelecionada){
      const dialogRef = this.dialog.open(GerarConsumoComponent, {
        width: '600px',
        data: {mesaSelecionada: mesaSelecionada}
      });
      dialogRef.afterClosed().subscribe(result => {
        this.consumoService.getListaItensPedidos(this.mesaSelecionada.id).subscribe(
          (listaItensPedidos: itensPedidos[]) =>  {
            this.listaItensPedidos  =  listaItensPedidos,
            this.listaItensPedidosAtualizada.emit(this.listaItensPedidos);
          },
          (error: any) => this.error = error
        );
        console.log("closeModal")
      });
    }
  }

  ngOnInit() {
    this.consumoService.getListaMesas().subscribe(
      (mesas: Mesa[]) => this.mesas = mesas,
      (error: any) => this.error = error
    );
  }
  
  onChange(){
    this.consumoService.setMesaSelecionada(this.mesaSelecionada);
    this.listaMesaSelecionadaAtualizada.emit(this.mesaSelecionada);
  }

}
