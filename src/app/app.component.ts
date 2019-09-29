import { Component, OnInit } from '@angular/core';
import {itensPedidos} from './consumo.service';
import {ConsumoService} from './consumo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/ngx-toastr/toastr.css']
})
export class AppComponent implements OnInit {

  title = 'payres-webapp';
  mesaSelecionada: string;
  listaItensPedidos: itensPedidos[] = [];
  valorTotal: number;
  valorPago: number;

  constructor(private consumoService: ConsumoService) { }

  ngOnInit() {
  }

  atualizaMesaSelecionada(event){
    this.mesaSelecionada = event;
    this.listaItensPedidos = this.filtrarPorMesa(this.mesaSelecionada, this.consumoService.getListaItensPedidos());
    this.valorTotal = this.gerarValorTotal( this.listaItensPedidos);
    this.valorPago = this.consumoService.getValoresPagosMesa(this.mesaSelecionada);
  }

  atualizaItensPedidosMesa(event){
    this.listaItensPedidos = this.filtrarPorMesa(this.mesaSelecionada, event);
    this.valorTotal = this.gerarValorTotal( this.listaItensPedidos);
  }

  filtrarPorMesa(mesaSelecionada, listaItensPedidos){
    return listaItensPedidos.filter(obj => obj.mesaSelecionada === mesaSelecionada);
  }

  gerarValorTotal(listaItensPedidos){
    let count = 0;
    listaItensPedidos.forEach(element => {
      count += element.valor*element.quantidade;
    });
    return count;
  }

}