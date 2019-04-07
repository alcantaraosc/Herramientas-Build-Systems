import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //Inyectar los componentes de formularios
//import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { AngularFireModule } from 'angularfire2'; //Inyectar los componentes de angularfire2
import { HttpClient} from '@angular/common/http';


import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from 'angularfire2/firestore';

import { environment } from '../environments/environment';


import { AuthService} from "./services/auth.service";
import { TiendaService } from './services/tienda.service';
import { CarritoService } from './services/carrito.service'

import { AppComponent } from './app.component';
import { TiendaRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { DetalleProductoComponent } from './components/tienda/detalle-producto/detalle-producto.component';



export const environments = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyAIEmj4GhV5uj1iI9yM30DTQgXabiezy5w",
    authDomain: "tienda-angular2.firebaseapp.com",
    databaseURL: "https://tienda-angular2.firebaseio.com",
    projectId: "tienda-angular2",
    storageBucket: "tienda-angular2.appspot.com",
    messagingSenderId: "529996794003"
  }
} ;

@NgModule({
  declarations: [
    AppComponent,
    BarraSuperiorComponent,
    LoginComponent,
    TiendaComponent,
    CarritoComponent,
    DetalleProductoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    //HttpModule,
    AngularFireModule.initializeApp(environments.firebaseConfig),
    AngularFireDatabaseModule,

    ReactiveFormsModule,
    TiendaRoutingModule, 
    HttpClientModule
  ],
  providers: [AuthService, TiendaService, CarritoService, AngularFirestore ],
  bootstrap: [AppComponent]
})
export class AppModule { }