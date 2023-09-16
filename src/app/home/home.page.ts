import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { NgModule } from '@angular/core';
import { produto } from '../models/produto';
import { format } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [HomeService],
})
export class HomePage {
  produtos: produto[] = [];
  idEditar: number = 0;
  editar: boolean = false;
  novo: boolean = true;
  nome: string ='';
  categoria: string ='';
  quantidade: number = 0 ;
  urlImagem: string ='';
  data: Date = new Date;
  
  
  
  constructor( public homeService: HomeService) {
    homeService.getProdutos().subscribe(Response=> this.produtos = Response)
  }
  getAll(){
    this.homeService.getProdutos().subscribe(Response=> this.produtos = Response)
  }
  mostraForm(){
    this.editar = true;
    this.novo = true
  }
  mostraEditar(produto: produto){
    this.editar = true;
    this.novo = false
    this.idEditar = produto.id
    this.nome = produto.nome
    this.quantidade = produto.quantidade
    this.categoria = produto.categoria
    this.urlImagem = produto.urlImagem
    

  }
  async onEdit(){
    let produto ={
      nome: this.nome,
      descricao : this.categoria,
      quantidade:  this.quantidade,
      urlImagem: this.urlImagem,
      data: format(this.data, 'dd-mm-yyyy'),
    }
    await this.homeService.editarProduto(this.idEditar.toString(), produto).subscribe(Response => {alert("editado");this.getAll()} )
    
    await this.homeService.getProdutos().subscribe(Response=> this.produtos = Response)
    this.limpaCampos();
    this.editar = false;
    this.novo = true

  }
  onSave(){
    let produto = {
      id:  this.produtos.length+1,
      nome: this.nome,
      categoria : this.categoria,
      quantidade:  this.quantidade,
      urlImagem: this.urlImagem,
      data: format(this.data, 'dd-mm-yyyy'),


    }
    
    
    this.homeService.postProduto(produto).subscribe(Response=> alert("Criado"));
    this.homeService.getProdutos().subscribe(Response=> this.produtos = Response)
    this.editar = false;
    this.limpaCampos();
  }
  onDelete(id: number){
    this.homeService.deleteProduto(id.toString()).subscribe(Response=> alert("Deletado"))
    alert("Produto deletado")
    this.homeService.getProdutos().subscribe(Response=> this.produtos = Response)
  }
  limpaCampos(){
    this.nome = ''
    
    this.categoria = '';
    this.quantidade =  0 ;
    this.urlImagem = '';
    this.idEditar = 0
    
  }
  

  

}