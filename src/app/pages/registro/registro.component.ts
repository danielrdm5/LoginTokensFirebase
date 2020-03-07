import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( private auth: AuthService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
   }

   onSubmit( form: NgForm ) {
     if ( form.invalid ) {
      return;
     } else {
      this.auth.nuevoUsuario( this.usuario )
        .subscribe( resp => {
          console.log(resp);
        }, (errorObs) => {
          console.log(errorObs.error.error.message);
        });
     }
   }

}
