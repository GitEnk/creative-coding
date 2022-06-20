const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    let r = 115;
    let g = 169;
    let b = 194;
    let step = width*0.01;
    let depth = 9;
    let colorStep = 0.5;
    let color = `rgb(${r},${g},${b})`;
    let rows = 7;
    let cols = 7;
    let marginw = width*0.8;
    let marginh = height*0.8;
    let squareWidth = width / cols;
    let squareHeight = height / rows;
    
    context.fillStyle = color;
    context.fillRect(0, 0, width, height);
    // TODO: Animate depth
    // TODO: Randomize colours
    // TODO: Dynamic patterns based on some rule
    // TODO: Loop inner square positions
    dir = -1;
    for (n = 0; n < rows; n++){
      dir*=-1;
      drawHole(context, width/2-squareWidth/2, n*squareHeight, dir);
    }
    for (n = 0; n < rows; n++){
      dir*=-1;
      drawHole(context, n*squareWidth, height/2-squareHeight/2, dir);
    }
    for (n = 0; n < rows; n++){
      dir*=-1;
      drawHole(context, n*squareWidth, n*squareHeight, dir)
      drawHole(context, n*squareWidth, height-squareHeight - n*squareHeight, dir)
    }

    function drawHole(context, x, y, direction) {
      context.save();
      context.translate(x, y);
      
      for (i = 1; i < depth; i++){
        context.save();
        context.translate(i*step, i*step);
        let innerSquareWidth = squareWidth - i*step*2; 
        let innerSquareHeight = squareHeight -i*step*2;
        let tr = r+step*i*direction*colorStep;
        let tg = g+step*i*direction*colorStep;
        let tb = b+step*i*direction*colorStep;
        let tcolor = `rgb(${tr},${tg},${tb})`;
        context.fillStyle = tcolor;
        context.fillRect(0, 0, innerSquareWidth, innerSquareHeight);
        context.restore();
      }
      context.restore();
    }
  };
};


canvasSketch(sketch, settings);
