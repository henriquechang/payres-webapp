import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface itensPedidosListagem {
  produto__nome: string;
  quantidade: number;
  mesaSelecionada: string;
  produto__preco: number;
}

export interface itensPedidosEnvio {
  produto: Produto;
  quantidade: number;
  mesa: Mesa;
  pagamentoAberto: boolean;
}

export interface valorPagoMesa {
  mesa: string;
  valorPago: number;
}

export interface Mesa {
  id: number;
  valorPago: number;
}

export interface Produto {
  id: number;
  nome: string;
  preco: number;
}

@Injectable({
  providedIn: 'root'
})

export class ConsumoService {

  mesaSelecionada: string;
  listaItensPedidos: itensPedidosListagem[] = [];
  listaValoresPagosMesa: valorPagoMesa[] = [];

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getListaMesas(){
    return this.http.get(this.baseUrl.concat('mesa/'));
  }

  public getListaProdutos(){
    return this.http.get(this.baseUrl.concat('produto/'));
  }

  public setMesaSelecionada(mesaSelecionada){
    this.mesaSelecionada = mesaSelecionada;
  }

  public getMesaSelecionada(){
    return this.mesaSelecionada;
  }

  public setListaItensParaEnvio(listaItensPedidos){
    let listaItensPedidosSimples = [];
    listaItensPedidos.forEach(element => {
      listaItensPedidosSimples.push({
        produto: element.produto.id,
        mesa: element.mesa.id,
        quantidade: Number(element.quantidade),
        pagamentoAberto: element.pagamentoAberto
      })
    });
    return this.http.post(this.baseUrl.concat('produto_consumido_mesa/'), listaItensPedidosSimples);
  }

  public getListaItensPedidos(idMesa){
    return this.http.get(this.baseUrl.concat('produto_valor_mesa/'),
    {
      params: {
        mesa: idMesa,
      }
    });
  }

  public removeListaItensPedidosMesa(mesaSelecionada){
    this.listaItensPedidos.splice(this.listaItensPedidos.findIndex(e => e.mesaSelecionada === mesaSelecionada),1);
  }

  public zeraValorMesa(mesa){
    this.listaValoresPagosMesa.find(element => element.mesa === mesa).valorPago = 0;
  }

  public setValoresPagosMesaInit(mesaInicial){
    this.listaValoresPagosMesa.push({mesa: mesaInicial, valorPago: 0});
  }

  public setValoresPagosMesa(mesa, valor){
    this.listaValoresPagosMesa.find(element => element.mesa === mesa).valorPago = valor;
  }

  public getValoresPagosMesa(mesa){
    return this.listaValoresPagosMesa.find(element => element.mesa === mesa).valorPago;
  }
}
