const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 2048, 2048 ]
};


const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = '#ffa69e';
    context.fillRect(0, 0, width, height);


    // 3 2 4 1 4
    let x = 0
    for (let col=0; col<200; col++){
      // for each column set a width and height
      let cellw = random.pick([1,2,3,4])*100;
      let cellh = random.pick([1,2,3,4])*50;
      let y = 0;
      for (let row=0; row<200; row++){
        // draw a square with random distance between them
        const ystep = random.pick([1.5,1.75, 2]);
        if (random.value() > 0.1) {
          context.fillStyle = "#fce5cd";
          context.fillRect(x, y, cellw, cellh);
          context.font = "48px serif"
        }
        y += cellh*ystep;
      }
      x += cellw; 
    }
    
  };
};

canvasSketch(sketch, settings);
