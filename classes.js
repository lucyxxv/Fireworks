/*  Firework class	  */
class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.color = color;
    //hard coded speed and time to live
    this.speed = 2;
    this.timeToLive = 100;
}

  draw() {
    pen.beginPath();
    pen.fillStyle = this.color;
    pen.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    pen.fill();
    pen.closePath();
}

  launch() {
    this.draw();
    this.timeToLive -= 1;
    if(this.timeToLive === 0){
      //hard coded 50 to spawn exaclty 50 particles
      for(var i = 0; i < 50; i++){
        //radians is used to make a circle shape once it explodes
        const radians = Math.random() * 50;
        particles.push(new Particle(this.x + Math.cos(radians) * 50, this.y + Math.sin(radians) * 50, this.color));
      }
      //if time to live is 0 then set the radius to 0
      this.radius = 0;
    }
    //subtracting from the y to make it "launch"
    this.y -= this.speed;
  }
}

/*	Particle class  */
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = 1;
    this.color = color;
    this.timeToLive = 200;
}

  draw() {
    pen.beginPath();
    pen.fillStyle = this.color;
    pen.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    pen.fill();
    pen.closePath();
}

  fall() {
    this.draw();
    this.y += Math.random() * 1;
    this.timeToLive --;
    //if time to live is 0 change the radius to 0
    if(this.timeToLive === 0) this.radius = 0;
  }
}
