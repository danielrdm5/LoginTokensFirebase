import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recordarusr = false;
  usuario: UsuarioModel = new UsuarioModel();

  constructor( private auth: AuthService ) { }

  ngOnInit() {
    
    if( localStorage.getItem('email' ) ) {
      this.usuario.email = localStorage.getItem( 'email' );
      this.recordarusr = true;
    }
  }

  login(form: NgForm) {
    if ( form.invalid ) {
      return;
    } else {

      Swal.fire({
        allowOutsideClick: false,
        text: 'Espere p   orfa',
        icon: 'info'
      });
      Swal.showLoading();

      this.auth.login( this.usuario )
      .subscribe( resp => {
         Swal.close();

          if( this.recordarusr ) {
            localStorage.setItem('email', this.usuario.email);
          }


        }, (errorObs) => {
         
          Swal.fire({
            text: 'ERROR ERROR my robot balls:' + errorObs.error.error.message,
            icon: 'error'
          });

          });
        }
    }


}
