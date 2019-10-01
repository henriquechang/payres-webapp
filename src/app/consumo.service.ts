import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface itensPedidos {
  nome: string;
  quantidade: number;
  mesaSelecionada: string;
  valor: number;
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
  listaItensPedidos: itensPedidos[] = [];
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

  public setListaItensPedidos(listaItensPedidos){
    if(listaItensPedidos){
      listaItensPedidos.forEach(element => {
        this.listaItensPedidos.push(element);
      });
    }
  }

  public getListaItensPedidos(){
    return this.listaItensPedidos;
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
