const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const color = require('canvas-sketch-util/color');
const settings = {
  dimensions: [ 1080, 1080 ]
};


const sketch = () => {
  return ({ context: c, width, height }) => {
    c.fillStyle = 'white';
    c.fillRect(0, 0, width, height);

    c.fillStyle = "black";

    const cx = width *   0.5;
    const cy = height *  0.5;
    const w = width *   0.01;
    const h = height *  0.1;
    let x, y;
    const num = 30;
    const radius = width * 0.2;

    for (let i = 0; i < num; i++){
      const slice = math.degToRad(360/num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      // hands of the clock
      c.save();
      c.fillStyle = "#fa2bca";
      c.translate(x, y); // move the pen
      c.rotate(-angle);
      c.scale(random.range(0.1,1), random.range(0.2,4));
      c.beginPath();
      c.rect(-w*0.5,random.range(0,-h*0.5), w, h);
      c.fill();
      c.restore();

      // arcs
      c.save();
      c.strokeStyle = "#fa2bca";
      c.translate(cx,cy);
      c.rotate(-angle);
      c.lineWidth = random.range(5,20);
      c.beginPath();
      c.arc(0,
            0,
            radius*random.range(0.3, 1.3),
            slice*random.range(1,-8),
            slice*random.range(1,5));
      c.stroke();
      c.restore();
    }
  };
};

canvasSketch(sketch, settings);
