import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8085';
  private apikey = ' AIzaSyBFFT0_Hv4EBqbQ7yiC7irr6fma3spvrJQ';

  userToken: string; // Si existe el idToken se guardara aca

  // Crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Ingresar con usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient ) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      // o tambien ...usuario
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}:signInWithPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map(resp => {
        console.log('Entro al map');
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const datosUsuario = {
      name: usuario.name,
      username: usuario.username,
      email: usuario.email,
      password: usuario.password,
      // o tambien ...usuario
      returnSecureToken: true
    };

    return this.http.post(`${this.url}/users`, datosUsuario).pipe(
			map((resp) => {
				console.log('Entro al map');
				//this.guardarToken( resp['idToken'] );
				return resp;
			})
		);
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken() {
    if(localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {

    if (this.userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraEn = new Date();
    expiraEn.setTime(expira);

    if ( expiraEn > new Date() ) {
      return true;
    } else {
      return false;
    }

  }
}
