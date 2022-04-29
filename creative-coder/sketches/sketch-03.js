const canvasSketch = require('canvas-sketch');
const random = require("canvas-sketch-util/random")
const math = require("canvas-sketch-util/math")

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

// Dummy animation function
const animate = () => {
  console.log('domestika');
  requestAnimationFrame(animate);
}
//animate();

const sketch = ({ context, width, height }) => {
  const agents = [];
  for(let i = 0; i<100; i++){
    const x = random.range(0, width);
    const y = random.range(0, height);
    agents.push(new Agent(x, y, i))
  }
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    for (let i = 0; i < agents.length; i++){
      
      const agent = agents[i];
      
      for (let j = i+1; j < agents.length; j++){
        const other = agents[j];
        const dist = agent.pos.getDistance(other.pos);
        if (dist < 10) agent.bounceXY();
        if (dist > 200) continue;
        //radius = (agent.radius > other.radius) ? other.radius : agent.radius;
        radius = Math.min(agent.radius, other.radius);
        context.lineWidth = math.mapRange(dist, 0, 200, radius*2, 0.01);
        context.beginPath();
        context.strokeStyle = agent.color;
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }

    agents.forEach(agent => {
      agent.update();
      agent.draw(context)
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  getDistance(v){
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx*dx + dy*dy);
  }
}

class Agent{
  constructor(x,y, id){
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4,12);
    this.color = `rgb(
      ${random.range(20,204)},
      ${random.range(20,204)},
      ${random.range(20,204)})`;
    this.id = id
  }

  bounce(w, h){
    if (this.pos.x <= 5 || this.pos.x >= w) this.vel.x *= -1;
    if (this.pos.y <= 5 || this.pos.y >= h) this.vel.y *= -1;
  }

  bounceXY(){
    if (random.boolean) this.vel.x *= -1; this.vel.y *= -1;
  }

  update(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context){
    context.save();
    context.translate(this.pos.x, this.pos.y);
    
    context.lineWidth = 4;
    
    context.beginPath();
    context.strokeStyle = this.color;
    context.arc(0, 0, this.radius, 0, Math.PI*2);
    context.fill();
    context.stroke();

    //context.font = "40px sans-serif";
    //context.textAlign = "center";
    //context.strokeText(this.id, 0, 0);

    context.restore();
  }
}
