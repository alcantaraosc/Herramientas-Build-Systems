import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor( private router : Router, private http: HttpClient ) { }

  logout(){
    sessionStorage.removeItem('Session'); 
    this.router.navigate(['login']) 
  }

  checkSession(){
    return sessionStorage.getItem("Session"); 
  }

}
