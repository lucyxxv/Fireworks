//basic canvas setup
const canvas = document.querySelector('canvas');
const pen = canvas.getContext('2d');
var width = (canvas.width = window.innerWidth - 50);
var height = (canvas.height = window.innerHeight - 50);
canvas.style.backgroundColor = 'black';

//when the window is resized. resize the canvas
window.addEventListener('resize', () => {
  width = (canvas.width = window.innerWidth - 50);
  height = (canvas.height = window.innerHeight - 50);
});

//Empty fireworks array to keep track of the fireworks
const fireworks = [];
//function expression used to spawn fireworks
const fireworkSpawner = () => {
  //20 is hard coded so that it only spawns 10 fireworks at a time
  for(var i = 0; i < 20; i++){
    //color array to choose from
    const colors = ['maroon', 'cyan', 'yellow', 'orange', 'green', 'blue', 'purple'];
    //select a random color from the color array
    const color = colors[Math.floor(Math.random() * colors.length)];
    //random x and y postition
    const x = Math.random() * (width + 10 - 10) + 10;
    const y = Math.random() * (height / 2 - height) + height;
    //the firework class is coming from the classes.js file
    fireworks.push(new Firework(x, y, color));
  }
}

fireworkSpawner();
//Empty particles array to keep track of the particles
const particles = [];
//world function expression
const world = () => {
  //alternative for settime out or setinterval
  requestAnimationFrame(world);
  //fill with white and an aplha of 0.05
  //gives that "smoke" effect
  pen.fillStyle = 'rgba(0, 0, 0, 0.05)';
  //fill the whole canvas
  pen.fillRect(0, 0, canvas.width, canvas.height);

  //loop through the fireworks array
  fireworks.forEach( (firework, index) => {
    //launch each firework
    firework.launch();
    //if any firework has a radius of 0 remove it from the array
    if(firework.radius == 0) fireworks.splice(index, 1);
  });

//loop through the particle array
  particles.forEach( (particle, index) => {
    //drop each particle
    particle.fall();
    //if any particle has a radius of 0 remove it from the array
    if(particle.radius == 0) particles.splice(index, 1);
  });
/*if both the fireworks and particles array are empty
clear the canvas and spawn more fireworks*/
  if(particles.length == 0 && fireworks.length == 0){
    pen.clearRect(0, 0, width, height);
    fireworkSpawner();
  }
};
console.clear()
console.log('Resizing causes the browser to lag');
world();
