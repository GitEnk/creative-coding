const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    // Generate a fibonnaci sequence
    // for each num in the fib_seq:
    //  turn a certain angle
    //  move a certain step
    //  and draw an arc
    
    const scale = 30;
    var fibonacci_series = function (n) {
      if (n===1) {
        return [0, 1];
      } else {
        var s = fibonacci_series(n - 1);
        s.push(s[s.length - 1] + s[s.length - 2]);
        return s;
      }
    };

    let fib = fibonacci_series(8);
    const x = width/2-1;
    const y = height/2-1;

    context.translate(x, y);
    // context.fillStyle = "white";
    // context.fillRect(-5,-5,10,10);
  
    context.rotate(0.25*Math.PI);
    context.lineWidth = 4;
    
    fib.forEach((element, index) => {
      // TODO: Between each element, fill each line with arcs for each int difference
      for(i = element; i<fib[index+1]; i++){
        context.beginPath();
        context.strokeStyle = "orange";
        context.arc(0+i*20, element*scale, element*scale, 0, 2*Math.PI);
        context.stroke();
      }
      context.beginPath();
      context.moveTo(0, 0);
      context.strokeStyle = "white"
      context.lineTo(element*scale, 0);
      context.stroke();
      
      context.translate(element*scale, 0); // move to end of the line
      context.rotate(-90*Math.PI/180); // rotate
    
    });
  };
};

canvasSketch(sketch, settings);
