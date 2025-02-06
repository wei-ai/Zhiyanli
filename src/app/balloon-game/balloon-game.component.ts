import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener, NgZone } from '@angular/core';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-balloon-game',
  templateUrl: './balloon-game.component.html',
  styleUrls: ['./balloon-game.component.css']
})
export class BalloonGameComponent implements OnInit, OnDestroy {
  @ViewChild('gameCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  
  // Game state
  score = 0;
  cannon = {
    x: 0,
    y: 0,
    width: 60,
    height: 20,
    speed: 7
  };
  
  projectiles: any[] = [];
  balloons: any[] = [];
  private animationFrameId!: number;
  private backgroundMusic!: HTMLAudioElement;
  
  // Game constants
  private readonly projectileSpeed = -10;
  private readonly balloonSpeed = 3;
  private readonly canvasWidth = 800;
  private readonly canvasHeight = 600;

  constructor(
    private ngZone: NgZone,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.initializeCanvas();
    this.startGameLoop();
    this.playBackgroundMusic();
  }

  private playBackgroundMusic(): void {
    this.backgroundMusic = new Audio('assets/audio/background.mp3');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.3;
    
    // Start music after user interaction
    document.addEventListener('click', () => {
      this.backgroundMusic.play();
    }, { once: true });
  }

  ngOnDestroy(): void {
    this.backgroundMusic.pause();
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  private initializeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    this.ctx = canvas.getContext('2d')!;
    
    this.cannon.x = canvas.width / 2 - this.cannon.width / 2;
    this.cannon.y = canvas.height - 50;
  }

  private startGameLoop(): void {
    // Run outside Angular's zone to prevent change detection overhead
    this.ngZone.runOutsideAngular(() => {
      const gameLoop = () => {
        this.update();
        this.draw();
        this.animationFrameId = requestAnimationFrame(gameLoop);
      };
      gameLoop();
    });

    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  private update(): void {
    // Move projectiles
    this.projectiles = this.projectiles.filter(p => {
      p.y += this.projectileSpeed;
      return p.y > 0;
    });

    // Move balloons
    this.balloons = this.balloons.filter(b => {
      b.y += this.balloonSpeed;
      return b.y < this.canvasHeight;
    });

    // Collision detection
    this.projectiles.forEach((p, pi) => {
      this.balloons.forEach((b, bi) => {
        if (p.x < b.x + b.width &&
            p.x + p.width > b.x &&
            p.y < b.y + b.height &&
            p.y + p.height > b.y) {
          this.audioService.playSound('pop', 1.5);
          this.score += 10;
          this.projectiles.splice(pi, 1);
          this.balloons.splice(bi, 1);
        }
      })
    });

    // Spawn new balloons
    if (Math.random() < 0.02) {
      this.balloons.push({
        x: Math.random() * (this.canvasWidth - 40),
        y: -40,
        width: 30,
        height: 40
      });
    }
  }

  private draw(): void {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Draw cannon
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(this.cannon.x, this.cannon.y, this.cannon.width, this.cannon.height);

    // Draw projectiles
    this.ctx.fillStyle = 'blue';
    this.projectiles.forEach(p => {
      this.ctx.beginPath();
      this.ctx.arc(p.x + p.width/2, p.y + p.height/2, p.width/2, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // Draw balloons
    this.ctx.fillStyle = 'red';
    this.balloons.forEach(b => {
      this.ctx.beginPath();
      this.ctx.ellipse(b.x + b.width/2, b.y + b.height/2, b.width/2, b.height/2, 0, 0, Math.PI * 2);
      this.ctx.fill();
      // Balloon string
      this.ctx.beginPath();
      this.ctx.moveTo(b.x + b.width/2, b.y + b.height);
      this.ctx.lineTo(b.x + b.width/2, b.y + b.height + 15);
      this.ctx.strokeStyle = 'black';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    });
  }

  @HostListener('window:keydown', ['$event'])
  private handleKeyDown(event: KeyboardEvent): void {
    switch(event.code) {
      case 'ArrowLeft':
        this.cannon.x = Math.max(0, this.cannon.x - this.cannon.speed);
        break;
      case 'ArrowRight':
        this.cannon.x = Math.min(this.canvasWidth - this.cannon.width, this.cannon.x + this.cannon.speed);
        break;
      case 'Space':
        this.audioService.playSound('shoot', 0.5);
        this.projectiles.push({
          x: this.cannon.x + this.cannon.width/2 - 5,
          y: this.cannon.y,
          width: 10,
          height: 10
        });
        break;
    }
  }

  


}
