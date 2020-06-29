import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  nombre = '';

  constructor(private webSocket: WebsocketService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.nombre);
    this.webSocket.loginWebSocket(this.nombre).then(() => {
      this.router.navigate(['mensajes']);
    });
    this.nombre = '';
  }
}
