import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(public wsService: WebsocketService) {}

  sendMessage(cuerpo: string) {
    const payload = {
      de: JSON.parse(localStorage.getItem('usuario'))['nombre'],
      cuerpo,
    };

    this.wsService.emit('mensaje', payload);
  }

  escucharMensaje() {
    return this.wsService.listen('mensaje-nuevo');
  }

  escucharMensajePrivado() {
    return this.wsService.listen('mensaje-privado');
  }

  getUsuariosActivos() {
    return this.wsService.listen('usuarios-activos');
  }

  emitirUsuariosActivos() {
    this.wsService.emit('obtener-usuarios');
  }
}
