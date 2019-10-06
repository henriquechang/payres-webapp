import { Component, Input } from '@angular/core';
import { ConsumoService, Mesa } from '../consumo.service';
import { valorPagoMesa } from '../consumo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu-consumo',
  templateUrl: './menu-consumo.component.html',
  styleUrls: ['./menu-consumo.component.css']
})
export class MenuConsumoComponent{

  @Input() listaItensPedidos: []; 
  @Input() mesaSelecionada: Mesa;
  @Input() valorTotal: number;
  @Input() listaValoresPagosMesa: valorPagoMesa[] = [];
  @Input() valorRestante;
  valor: number = 0;
  error: any;
  snackBarMessage: string;

  constructor(
    private consumoService: ConsumoService, 
    private _snackBar: MatSnackBar) {}

  ngOnChanges(){
    this.valor = 0;
  }

  lancarValor(valor){
    this.valorTotal = Math.round(this.valorTotal * 100) / 100;
    this.valorRestante = this.consumoService.calcularValorRestante(this.listaValoresPagosMesa, this.valorTotal);
    valor = parseFloat(valor);
    if(valor > 0 && valor <= this.valorRestante){
      this.consumoService.setValoresPagosMesa(this.mesaSelecionada.id, valor).subscribe((result)=> {
          this.buscarValores();
        },
        (error: any) => this.error = error
      );
    }
    else{
      if(valor == 0){
        this.snackBarMessage = "Favor inserir um valor maior que 0."
      }
      else{
        this.snackBarMessage = "O valor inserido é maior que o valor restante a ser pago."
      }
      this.openSnackBar(this.snackBarMessage);
    }
  }

  buscarValores(){
    this.consumoService.getValoresPagosMesa(this.mesaSelecionada.id).subscribe(
      (listaValoresPagosMesa: valorPagoMesa[]) => {
        this.listaValoresPagosMesa = listaValoresPagosMesa;
        this.valorRestante = this.consumoService.calcularValorRestante(this.listaValoresPagosMesa, this.valorTotal);
        this.valor = 0;
      },
      (error: any) => this.error = error
    );
  }

  finalizarConta(){
    this.consumoService.fechaPagamentoMesa(this.mesaSelecionada.id).subscribe(
      (result) => {
        this.listaItensPedidos = [];
        this.buscarValores();
        this.snackBarMessage = "Conta fechada."
        this.openSnackBar(this.snackBarMessage);
      },
      (error: any) => this.error = error
    );
  }

  openSnackBar(snackBarMessage): void {
    this._snackBar.open(snackBarMessage, 'Fechar', {
      duration: 5000,
    });
  }
}
