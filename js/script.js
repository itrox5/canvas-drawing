class CanvasDraw {
  constructor() {
    this.canvas = document.querySelector('#draw');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.strokeStyle = '#BADA55';
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 100;
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
    this.hue = 0;
    this.direction = true;
  }

  init() {
    this.canvas.addEventListener('mousedown', (e) => this.startDraw(e));
    this.canvas.addEventListener('mousemove', (e) => this.draw(e));
    this.canvas.addEventListener('mouseup', () => this.isDrawing = false);
    this.canvas.addEventListener('mouseout', () => this.isDrawing = false);
  }

  startDraw(e) {
    this.isDrawing = true;
    [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
  }

  draw(e) {
    if (!this.isDrawing) return;
    this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(e.offsetX, e.offsetY);
    this.ctx.stroke();
    [this.lastX, this.lastY] = [e.offsetX, e.offsetY];

    this.hue++;
    if (this.hue >= 360) {
      this.hue = 0;
    }
    if (this.ctx.lineWidth >= 100 || this.ctx.lineWidth <= 1) {
      this.direction = !this.direction;
    }

    if (this.direction) {
      this.ctx.lineWidth++;
    } else {
      this.ctx.lineWidth--;
    }
  }
}

const canvasDraw = new CanvasDraw();
canvasDraw.init();