import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from './services/audio.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private audioService: AudioService) {}
  title = 'router-app';

  async ngOnInit() {
    await this.audioService.loadSound('shoot', 'assets/audio/shoot.wav');
    await this.audioService.loadSound('pop', 'assets/audio/pop.wav');
    await this.audioService.loadSound('music', 'assets/audio/background.mp3');
  }

  goToContact() {
    this.router.navigate(['contact']);
  }
  
  goToProducts() {
    this.router.navigate(['products']);
  }

  goToGame() {
    this.router.navigate(['BallonGame']);
  }


}
