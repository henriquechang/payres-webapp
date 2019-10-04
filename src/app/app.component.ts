import { Component, OnInit } from '@angular/core';
import {itensPedidos, Mesa} from './consumo.service';
import {ConsumoService} from './consumo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/ngx-toastr/toastr.css']
})
export class AppComponent implements OnInit {

  title = 'payres-webapp';
  mesaSelecionada: Mesa;
  listaItensPedidos: itensPedidos[] = [];
  valorTotal: number;
  valorPago: number;
  error: any;

  constructor(private consumoService: ConsumoService) { }

  ngOnInit() {
  }

  setMesaInicial(event){
    this.mesaSelecionada = event;
  }

  atualizaMesaSelecionada(event){
    this.mesaSelecionada = event;
    this.consumoService.getListaItensPedidos(this.mesaSelecionada.id).subscribe(
      (listaItensPedidos: itensPedidos[]) => {
        this.listaItensPedidos  =  listaItensPedidos;
        this.valorTotal = this.gerarValorTotal( this.listaItensPedidos);
        this.valorPago = this.consumoService.getValoresPagosMesa(this.mesaSelecionada);
      },
      (error: any) => this.error = error
    );
  }

  atualizaItensPedidosMesa(event){
    this.consumoService.getListaItensPedidos(this.mesaSelecionada.id).subscribe(
      (listaItensPedidos: itensPedidos[]) => {
        this.listaItensPedidos  =  listaItensPedidos;
        this.valorTotal = this.gerarValorTotal( this.listaItensPedidos);
      },
      (error: any) => this.error = error
    );
  }


  gerarValorTotal(listaItensPedidos){
    let count = 0;
    listaItensPedidos.forEach(element => {
      count += Number(element.produto__preco)*element.quantidade;
    });
    return count;
  }

}