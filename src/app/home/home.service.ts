import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { produto } from '../models/produto';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url = 'http://localhost:3000/produtos'
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor( public http: HttpClient) {

    
   }

  getProdutos(): Observable<produto[]> {
    return this.http.get<produto[]>(this.url);
  }
  postProduto(produto: any){
    
    this.http.post(this.url, produto, { headers: this.headers }).subscribe(Response=> console.log("criado"))
    return this.http.get<produto[]>(this.url);

  }
  editarProduto(id: string, produto: any){
    let urlEditar = this.url+ '/' +id 
    return this.http.put(urlEditar, produto)

  }
  deleteProduto(id: string){
    let urlDelete = this.url+ '/' +id 
    return this.http.delete(urlDelete)
  }
}