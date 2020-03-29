import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  time: number;
  filter: string ;
  canvas: any;
  texture: any;
  draw: any;
  placeholder: any;
  startedGame: boolean;
  wonGame: boolean;
  endedGame: boolean;
  timer: any;

  constructor() {
    this.filter = "default";
    this.startedGame = false;
    this.endedGame = false;
  }

  ngOnInit(): void {
    this.placeholder = document.getElementById('canvas');
    this.canvas = (<any>window).fx.canvas();
    var img = new Image;
    var $this = this;
    img.onload = function(){
      $this.texture = $this.canvas.texture(img);
      $this.draw = $this.canvas.draw($this.texture, 313, 418);
      $this.draw.update().replace($this.placeholder);
    };
    img.src = window.localStorage.getItem('image');
  }

  startGame() {
    this.startedGame = true;
    if (this.filter == "default") {
      alert('Please select a filter!')
    } else if (this.time == null || this.time == 0) {
      alert('Please inform for how long do you want to play!')
    } else {
      var game;
      if (this.filter == 'swirl') {
        var current = 326;
        this.setTime(this.time, current, this.swirl, this);
      } else if (this.filter == 'contrast') {
        var current = 1;
        this.setTime(this.time, current, this.contrast, this);
      } else if (this.filter == 'blur') {
        var current = 0.40;
        this.setTime(this.time, current, this.blur, this);
      }
    }
  }

  swirl(context, current) {
    if (current >= 0) {
      context.draw.swirl(160, 208, current, 3.7).update();
    }
  }

  contrast(context, current) {
    context.canvas.draw(context.texture).brightnessContrast(0, current).update();
  }

  blur(context, current) {
    context.draw.zoomBlur(160, 208, current).update();
  }

  add_minutes(dt, minutes) {
    return new Date(dt.getTime() + minutes*60000);
  }

  setTime(minutesTime, currentFilterLevel, game, context) {
    var countDownDate = this.add_minutes(new Date(),minutesTime).getTime();
    game(context, currentFilterLevel);
    var change = currentFilterLevel/(minutesTime*60);
    //Timer
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countDown").innerHTML = minutes + "m " + seconds + "s left!";
    this.timer = setInterval(() => {

      // Get today's date and time
      now = new Date().getTime();

      // Find the distance between now and the count down date
      distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      document.getElementById("countDown").innerHTML = minutes + "m " + seconds + "s left!";
      currentFilterLevel = currentFilterLevel - change;
      this.draw = this.canvas.draw(this.texture, 313, 418);
      game(context, currentFilterLevel);
      console.log(currentFilterLevel)

      // If the count down is over, write some text
      if (minutes <= 0 && seconds <= 0) {
        clearInterval(this.timer);
        this.draw = this.canvas.draw(this.texture, 313, 418).update();
        this.wonGame = false;
        this.endedGame = true;
      }
    }, 1000);
  }

  found() {
    clearInterval(this.timer);
    this.draw = this.canvas.draw(this.texture, 313, 418).update();
    this.wonGame = true;
    this.endedGame = true;
  }
}
