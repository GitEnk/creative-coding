const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random')
const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#513B41"; //"#73563F" '#007E80'
    context.fillRect(0, 0, width, height);

    // Sinus lines with vibrations
    var y = 400
    var step = 200
    var colors = ["#E6956C","#E4D595", "#F8F2DD", "#D282A4", "#8762A6", "#8762F6", "#8743F6"]
   
    for(i = 0; i < 5; i++){
      context.save();
      y_line = y+i*step
      x_line = 0
      context.translate(x_line, y_line);
    
      context.lineWidth = 100;
      context.beginPath();
    
      var grd = context.createLinearGradient(0, 0, 0, 700);
      grd.addColorStop(0, colors[i]);
      grd.addColorStop(1, colors[(i+1)%colors.length]);
      context.fillStyle = grd;
      context.fillStyle = colors[i];
      amp = random.range(50, 100);
      freq = random.range(50, 100);
      while(x_line < width){
        y_line = (amp/1.6) * Math.sin(x_line/(freq));
        context.fillRect(x_line, y_line, 1, 350);
        x_line+=1;
      }
      context.stroke();
      context.restore();
    }
  };
};


canvasSketch(sketch, settings);


