import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyDzkWWE-ALxkcAu9P8DKgPaHyylPiTIwi4';

  userToken: string;

  // Crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Sign In
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient) {
    this.leerToken();
   }

  logOut() {

  }

login(usuario: UsuarioModel) {
  const authData = {
    ...usuario,
    returnSecureToken: true
    };

  return this.http.post(
      `${this.url}signInWithPassword?key=${ this.apikey }`,
      authData
    ).pipe(
    map( resp => {
      this.guardarToken( resp['idToken'] );
    } )
    );
  }

  logout() {
    localStorage.removeItem( 'token' );
  }

  registrarUsuario(usuario: UsuarioModel) {

  }

  nuevoUsuario( usuario: UsuarioModel) {
     const authData = {
        ...usuario,
        returnSecureToken: true
       };

     return this.http.post(
         `${this.url}signUp?key=${ this.apikey }`,
         authData
       ).pipe(
         map( resp => {
           this.guardarToken( resp['idToken'] );
         } )
       );
  }

  private guardarToken( idToken: string ) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado( ): boolean {
    console.log( this.userToken );
    return this.userToken.length > 2;
  }
}
