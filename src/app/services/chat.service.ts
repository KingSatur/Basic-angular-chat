import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(public wsService: WebsocketService) {}

  sendMessage(mensaje: string) {
    const payload = {
      de: 'Juanda',
      mensaje,
    };

    this.wsService.emit('mensaje', payload);
  }

  escucharMensaje() {
    return this.wsService.listen('mensaje-nuevo');
  }
}
