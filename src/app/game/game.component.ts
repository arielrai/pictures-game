import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var placeholder = document.getElementById('canvas');
    var canvas = (<any>window).fx.canvas();
    var img = new Image;
    img.onload = function(){
      var texture = canvas.texture(img);
      var draw = canvas.draw(texture, 313, 418);
      draw.update().replace(placeholder);
      draw.swirl(160, 208, 326, 3.7).update();







      var add_minutes =  function (dt, minutes) {
        return new Date(dt.getTime() + minutes*60000);
      }
      var countDownDate = add_minutes(new Date(),2).getTime();

      var change = Math.ceil(326/120);
      var current = 326 -change ;
      // Update the count down every 1 second
      var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
        current = current - change;
        draw = canvas.draw(texture, 313, 418);
        draw.swirl(160, 208, current, 3.7).update().replace(placeholder);
        console.log(current)

        // If the count down is over, write some text
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("demo").innerHTML = "EXPIRED";
        }
      }, 1000);














    };
    img.src = window.localStorage.getItem('image');
  }



}
