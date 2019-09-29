import { Component, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {itensPedidos} from '../consumo.service';
import {ConsumoService} from '../consumo.service';

export interface DialogData {
  mesaSelecionada: string;
}

@Component({
  selector: 'app-gerar-consumo',
  templateUrl: './gerar-consumo.component.html',
  styleUrls: ['./gerar-consumo.component.css']
})
export class GerarConsumoComponent implements OnInit {
  
  produtos: string[] = ['Bolinho de Queijo', 'Batata Frita', 'Filé com fritas', 'Frango Grelhado', 'Peixe frito', 'Salada Caesar', 'Pudim de Leite', 'Sorvete de Chocolate','Água com gás', 'Coca-cola'];
  listaItensPedidos: itensPedidos[] = [];
  produtoSelecionado: string;
  quantidadeSelecionada: number;

  constructor(
    public dialogRef: MatDialogRef<GerarConsumoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snackBar: MatSnackBar, 
    private consumoService: ConsumoService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  lancarProduto(): void{
    if(!this.produtoSelecionado || !this.quantidadeSelecionada || this.quantidadeSelecionada < 0 || this.quantidadeSelecionada > 999){
      this.openSnackBar();
    }
    else{
      this.listaItensPedidos.push({nome: this.produtoSelecionado, quantidade: this.quantidadeSelecionada, mesaSelecionada: this.data.mesaSelecionada, valor: 20.30});
    }
  }

  openSnackBar(): void {
    this._snackBar.openFromComponent(GerarConsumoSnackbarComponent, {
      duration: 5000,
    });
  }

  onChange(){
    console.log(this.produtoSelecionado);
  }

  finalizarPedido(){
    this.consumoService.setListaItensPedidos(this.listaItensPedidos);
    this.onNoClick();
  }
}

@Component({
  selector: 'app-gerar-consumo-snackbar',
  templateUrl: './gerar-consumo-snackbar.component.html'
})
export class GerarConsumoSnackbarComponent {}
