import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(public wsService: WebsocketService) {}

  sendMessage(mensaje: string) {
    const payload = {
      de: JSON.parse(localStorage.getItem('usuario'))['nombre'],
      mensaje,
    };

    this.wsService.emit('mensaje', payload);
  }

  escucharMensaje() {
    return this.wsService.listen('mensaje-nuevo');
  }

  escucharMensajePrivado() {
    return this.wsService.listen('mensaje-privado');
  }
}
