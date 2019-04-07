import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
//import 'rxjs/Rx';
import { map } from 'rxjs/operators'

//======================Importar Modelos========================================
import { Producto } from '../models/Producto'
//==============================================================================

@Injectable()
export class TiendaService {
  public catalogo : any; //Crear arreglo de productos
  public productosCatalogo : Producto[]; //Crear arreglo de productos

  constructor(private http: HttpClient, private router : Router) { }
  //================Obtener Productos===========================================
  public getProductos(){
  return this.http.get('https://tienda-angular2.firebaseio.com/productos/.json').pipe(map(
    (response: any) => {
      
      
          
      console.log(response);
        //response.forEach( ( x ) => {
         //   this.catalogo.push( x );
        //});

       /* Array.from(response).forEach(child => {
          console.log(child)
          this*/

      this.catalogo =  response; 
      //response = Array.from(response);
      //this.catalogo = Array.of(this.catalogo)
      //console.log(this.catalogo);
      //this.productosCatalogo = this.catalogo
      let evilResponseProps = Object.keys(response);
      // Step 2. Create an empty array.
      let goodResponse = [];
      // Step 3. Iterate throw all keys.
      for (let prop of evilResponseProps) { 
          goodResponse.push(response[prop]);

      } 
      //console.log(goodResponse);
      this.catalogo = goodResponse;
      this.productosCatalogo = this.catalogo;
      console.log(this.catalogo);
    }))
  }
  public getDetalleProductos(idProduct:number) : Producto {
    for(let item of this.productosCatalogo) {
      if(item.id == idProduct) {
        return item;
      }
    }
    return null;
  }
  cargarCatalogo(){
    return this.productosCatalogo
  }
  public filtrarProducto(filtro:string){
  this.productosCatalogo = this.catalogo; 
  //console.log(filtro);
  //var product: any = this.productosCatalogo[0]; 
  //console.log(product);
  filtro.toLowerCase();
  let itemMatch : Producto[] = [];
  for(let item of this.productosCatalogo){
    //console.log(item);
    if(item.nombre != undefined){
      let nombre = item.nombre.toLowerCase(); 
      //console.log(nombre);
      if(nombre.includes(filtro)){ 
        itemMatch.push(item)} 
      }
      
    }
    return itemMatch;
    
  }

  actualizarDisponible(id:number, value:number, devolver:boolean = false){
    let catalogo = this.catalogo; 
    for(let itemCatalogo of catalogo){ 
      if (itemCatalogo.id == id){
        if(devolver == false){
          itemCatalogo.disponible = (Number(itemCatalogo.disponible) - value); 
        }else{
          itemCatalogo.disponible = (Number(itemCatalogo.disponible) + value);
      }
        this.productosCatalogo = this.catalogo;
      }
    }
  }
}
