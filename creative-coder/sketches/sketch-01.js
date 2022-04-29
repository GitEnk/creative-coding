const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle ="black";
    context.fillRect(0,0,width, height)
    context.lineWidth = width * 0.005
    context.strokeStyle = "white"
    const w = width * 0.10;
    const h = height * 0.10;
    const gap = width * 0.056;
    const off = 16
    let x, y;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j<6; j++) {
            x = 100 + (w+gap)*i;
            y = 100 + (h+gap)*j;

            context.beginPath();
            context.rect(x, y, w,h);
            context.stroke();
            
            if (Math.random() > 0.5) {
                context.beginPath();
                context.rect(x+off, y+off, w-16, h-16);
                context.stroke();
            }
        }
    }
  };
};

canvasSketch(sketch, settings);
