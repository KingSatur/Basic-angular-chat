import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  public texto: string = '';
  mensajesSuscription: Subscription;
  public mensajes: any[] = [];
  elemento: HTMLElement;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.elemento = document.getElementById('chat-mensajes');
    this.mensajesSuscription = this.chatService
      .escucharMensaje()
      .subscribe((payload) => {
        console.log(payload);
        this.mensajes.push(payload);
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 50);
      });
  }

  onSubmit() {
    console.log(this.texto);
    if (this.texto != '') {
      this.chatService.sendMessage(this.texto);
    }
    this.texto = '';
  }

  ngOnDestroy() {
    this.mensajesSuscription.unsubscribe();
  }
}
