import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.scss'],
})
export class ListUsuarioComponent implements OnInit {
  public usuarios: Observable<any>;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.usuarios = this.chatService.getUsuariosActivos();
    this.chatService.emitirUsuariosActivos();
  }
}
