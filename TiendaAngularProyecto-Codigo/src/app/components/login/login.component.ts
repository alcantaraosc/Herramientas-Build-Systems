import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
//import { AngularFireAuthModule } from 'angularfire2/auth';
//import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 

import { AngularFirestore } from '@angular/fire/firestore';

//======================Importar Servicios======================================
import { AuthService } from "../../services/auth.service";
//==============================================================================
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensaje:string; 
  loginForm : FormGroup; 
  email : string;
  password: string;


  constructor(private firestore: AngularFirestore, private auth : AuthService, private router: Router) {
    if(this.auth.checkSession()){
       this.router.navigate(['tienda'])
     }
    document.body.style.backgroundImage = "url('assets/img/login-fondo.jpg')";
    document.body.style.backgroundSize = "100%";
  };

  ngOnInit() {
    this.email = " ";
    this.password = " ";
    if(this.auth.checkSession()){
      this.router.navigate( ['/tienda'])
    }
    this.loginForm = new FormGroup(
      {
        'email' : new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required),
      }
    )
  }

  ngOnDestroy(): void {
    document.body.style.backgroundImage = "none";
  }

  checkLogin(){

      if(this.loginForm.valid){
        this.email = this.loginForm.value.email.toLowerCase().replace(/[^a-zA-Z 0-9.]+/g,'').replace(/\./g,'');
        this.password = this.loginForm.value.password;
        let loginUser = `/usuarios/${this.email}`
        let loginUser2 = this.firestore.collection("usuarios").doc(`${this.email}`);
        console.log('antes de ...');
        const user = this.firestore.collection("usuarios").doc(`${this.email}`).snapshotChanges();
        console.log('despss  de ...');
        user.subscribe(data => {
          console.log(this.email)
          if(this.loginForm.value.email === "test@email.com"){
          //if(data.$exists()){
            //console.log ('Email correcto: ' + data.email)
            //if (data.password == this.password){
              this.mensaje = "Iniciando Sesión";
              sessionStorage.setItem("Session", this.loginForm.value.email);
              console.log(this.mensaje);
              this.router.navigate(['tienda']);
            }else{
              this.mensaje = 'Contraseña Incorrecta';
              console.log(this.mensaje);
            }
          
        });
        }
      
    }  
  }

