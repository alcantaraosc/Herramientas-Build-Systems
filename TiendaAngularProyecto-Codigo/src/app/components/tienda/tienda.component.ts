import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'; //Importar los componentes ForModule, FormControl y Validator para manejar y validar los formularios
import { CurrencyPipe } from '@angular/common'
import { OnChanges } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
//======================Importar Servicios======================================
import { AuthService } from "../../services/auth.service";
import { CarritoService} from '../../services/carrito.service';
import { TiendaService} from '../../services/tienda.service';
//======================Importar Modelos========================================
import { ProductoCarrito } from '../../models/ProductoCarrito';
import { Producto } from '../../models/Producto';
//=====================Importar Pipes===========================================
@Component({
  selector: 'tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],

})
export class TiendaComponent implements OnInit {

  public formulario : FormGroup; 
  public listaProductos : Producto[]; 
  public productoCarrito : ProductoCarrito; 
  public titulo : string;
  public session : string;

  constructor(private detectChanges:ChangeDetectorRef, 
              private router : Router,
              private tiendaService : TiendaService, 
              private auth : AuthService, 
              public carritoService : CarritoService 
              

            ) { this.titulo = 'Catálogo de Productos' 
            document.body.style.backgroundImage = "url('assets/img/main-fondo.jpg')";
            document.body.style.backgroundSize = "100%";
          }

  ngOnInit() {
    if (!this.auth.checkSession()){ 
      this.router.navigate(['/login']) 
    }else{
    this.session = sessionStorage.getItem("Carrito") 
      this.formulario = new FormGroup( 
        {
          'descripcion' : new FormControl(),
          'imagen': new FormControl(),
          'precio': new FormControl(),
          'cantidad': new FormControl(),
        }
      )
      this.mostrarProductos() 
    }
  }

//Cargar Productos
  mostrarProductos(){
    if(!this.tiendaService.productosCatalogo){ 
      this.tiendaService.getProductos().subscribe( 
        ()=>{
          this.listaProductos = this.tiendaService.catalogo; 
          console.log(this.listaProductos);
          this.checkCarrito(); 
        }
      )
    }else{
          this.listaProductos = this.tiendaService.productosCatalogo; 
    }
  }
//Agregar Productos
  agregarProducto(id:number, value:number){
    for (let item of this.tiendaService.productosCatalogo){ 
      if(item.id == id){ 
        if(item.disponible < value){
          window.alert('Máxima existencia es: '+ item.disponible); 
        }else{
          let cantidadActual = item.disponible; 
         
          this.productoCarrito = {
            "id": item.id,
            "descripcion": item.descripcion,
            "imagen": item.imagen,
            "precio": item.precio,
            "cantidad": value 
          }
          this.carritoService.verificarCarrito(this.productoCarrito); 
          item.disponible = cantidadActual - value; 
        }
      }
    }
  }
    filtrarCatalogo(filtro:string){
      this.listaProductos = this.tiendaService.filtrarProducto(filtro); 
    }
  //Actualizar Disponibles
    checkCarrito(){
      for(let itemCarrito of this.carritoService.listaCarrito){ 
        this.tiendaService.actualizarDisponible(itemCarrito.id, itemCarrito.cantidad) 
      }
    }

  obtenerCantidad(id:number){
    for(let item of this.carritoService.listaCarrito){ 
      if(item.id == id){ 
        return item.cantidad 
      }
    }
    return null 
  }
}
