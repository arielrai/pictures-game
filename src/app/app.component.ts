import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jogo-das-fotos';
  promptEvent = null;
  constructor (){
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
  }
  installPwa(): void {
    alert('asd');
    this.promptEvent.prompt();
  }
}
