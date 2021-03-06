import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketStatus = false;
  public user: Usuario;

  constructor(private socket: Socket, private router: Router) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });
    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  emit(tipo: string, payload?: any, callback?: Function) {
    this.socket.emit(tipo, payload, callback);
  }

  logOut() {
    this.user = null;
    localStorage.removeItem('usuario');
    const payload = {
      nombre: 'Anonimo',
    };
    this.emit('configurar-usuario', payload, () => {});
    this.router.navigate(['']);
  }

  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWebSocket(nombre: string) {
    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, (resp) => {
        this.user = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      });
    });
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.user));
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.user = JSON.parse(localStorage.getItem('usuario'));
      this.loginWebSocket(this.user.nombre);
    } else {
      this.user = null;
    }
  }
}
