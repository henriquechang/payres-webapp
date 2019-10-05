import { Component, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {itensPedidosEnvio, Mesa} from '../consumo.service';
import {ConsumoService} from '../consumo.service';
import {Produto} from '../consumo.service';

export interface DialogData {
  mesaSelecionada: Mesa;
}

@Component({
  selector: 'app-gerar-consumo',
  templateUrl: './gerar-consumo.component.html',
  styleUrls: ['./gerar-consumo.component.css']
})
export class GerarConsumoComponent implements OnInit {
  
  produtos: Produto[];
  listaItensParaEnvio: itensPedidosEnvio[] = [];
  produtoSelecionado: Produto;
  quantidadeSelecionada: number;
  error: any;

  constructor(
    public dialogRef: MatDialogRef<GerarConsumoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snackBar: MatSnackBar, 
    private consumoService: ConsumoService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.consumoService.getListaProdutos().subscribe(
      (produtos: Produto[]) => this.produtos = produtos,
      (error: any) => this.error = error
    );
  }

  lancarProduto(): void{
    if(!this.produtoSelecionado || !this.quantidadeSelecionada || this.quantidadeSelecionada < 0 || this.quantidadeSelecionada > 999){
      this.openSnackBar();
    }
    else{
      this.listaItensParaEnvio.push({produto: this.produtoSelecionado, quantidade: this.quantidadeSelecionada, mesa: this.data.mesaSelecionada, pagamentoAberto: true});
    }
  }

  openSnackBar(): void {
    this._snackBar.openFromComponent(GerarConsumoSnackbarComponent, {
      duration: 5000,
    });
  }

  onChange(){
  }

  finalizarPedido(){
    this.consumoService.setListaItensParaEnvio(this.listaItensParaEnvio).subscribe((result) => {
        this.onNoClick();
      },
      (error: any) => this.error = error
    );
  }
}

@Component({
  selector: 'app-gerar-consumo-snackbar',
  templateUrl: './gerar-consumo-snackbar.component.html'
})
export class GerarConsumoSnackbarComponent {}
