import { Component, OnInit, Input } from '@angular/core';
import { ConsumoService, Mesa } from '../consumo.service';
import { valorPagoMesa } from '../consumo.service';

@Component({
  selector: 'app-menu-consumo',
  templateUrl: './menu-consumo.component.html',
  styleUrls: ['./menu-consumo.component.css']
})
export class MenuConsumoComponent implements OnInit {

  @Input() listaItensPedidos: []; 
  @Input() mesaSelecionada: Mesa;
  @Input() valorTotal: number;
  @Input() listaValoresPagosMesa: valorPagoMesa[] = [];
  @Input() valorRestante;
  valor: number = 0;
  error: any;

  constructor( private consumoService: ConsumoService) { }

  ngOnInit() {
  }

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
    this.consumoService.removeListaItensPedidosMesa(this.mesaSelecionada);
    this.consumoService.zeraValorMesa(this.mesaSelecionada);
    this.listaItensPedidos = [];
    this.valorTotal = 0;
  }
}
