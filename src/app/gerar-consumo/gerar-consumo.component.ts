import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { itensPedidosEnvio, Mesa } from '../consumo.service';
import { ConsumoService } from '../consumo.service';
import { Produto } from '../consumo.service';

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
  snackBarMessage: string;

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
    if(!this.produtoSelecionado || !this.quantidadeSelecionada || this.quantidadeSelecionada > 99){
      if(!this.produtoSelecionado){
        this.snackBarMessage = "Favor selecionar um pedido."
      }
      else if(!this.quantidadeSelecionada){
        this.snackBarMessage = "Favor selecionar a quantidade."
      }
      else {
        this.snackBarMessage = "A quantidade máxima por pedido é 99."
      }
      this.openSnackBar(this.snackBarMessage);
    }
    else{
      this.listaItensParaEnvio.push({produto: this.produtoSelecionado, quantidade: this.quantidadeSelecionada, mesa: this.data.mesaSelecionada, pagamentoAberto: true});
    }
  }

  openSnackBar(snackBarMessage): void {
    this._snackBar.open(snackBarMessage, 'Fechar', {
      duration: 5000,
    });
  }

  finalizarPedido(){
    this.consumoService.setListaItensParaEnvio(this.listaItensParaEnvio).subscribe((result) => {
        this.onNoClick();
      },
      (error: any) => this.error = error
    );
  }
}
