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
  @Input() valorPago: number = 0;
  listaValoresPagosMesa: valorPagoMesa[] = [];
  valor: number = 0;

  constructor( private consumoService: ConsumoService) { }

  ngOnInit() {
  }

  lancarValor(valor){
    valor = parseFloat(valor);
    this.valorTotal = Math.round(this.valorTotal * 100) / 100;
    this.valorPago = Math.round(this.valorPago * 100) / 100;
    if(Math.round((this.valorTotal - this.valorPago) * 100) / 100 >= valor){
      this.valorPago += valor;
    }
    this.consumoService.setValoresPagosMesa(this.mesaSelecionada, this.valorPago);
  }

  finalizarConta(){
    this.consumoService.removeListaItensPedidosMesa(this.mesaSelecionada);
    this.consumoService.zeraValorMesa(this.mesaSelecionada);
    this.listaItensPedidos = [];
    this.valorTotal = 0;
    this.valorPago = 0;
  }
}
