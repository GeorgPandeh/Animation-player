export default class Animation {
  constructor(frames) {
    this.frames = frames;
    this.count = 0;
    this.fps = 1;
    this.isAnimationOn = false;
    this.domFrameMatcher = [
      [['.el1']],
      [['.el2']],
    ];
  }

  toggleFullScreen() {
    const canvas = document.getElementsByTagName('canvas')[0];
    if (!canvas.fullscreenElement) {
      canvas.requestFullscreen();
    } else if (canvas.exitFullscreen) {
      canvas.exitFullscreen();
    }
  }

  drawAnimationFrame(frame) {
    console.log(frame);
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      frame.forEach((row, i) => {
        row.forEach((column) => {
          ctx.fillStyle = column;
          ctx.fillRect(0, i * 75, 150, (i + 1) * 75);
        });
      });
    }
  }

  getTransformedFrames(domFrames) {
    const transformedFrames = [];
    domFrames.forEach(domFrame => {
      const frame = this.domFrameMatcher.map(row => row.map(column => column.map((pixelSelector) => {
        const domPixel = domFrame.querySelector(pixelSelector);
        return getComputedStyle(domPixel).backgroundColor;
      })));
      transformedFrames.push(frame);
    });

    return transformedFrames;
  }

  displayNewFpsValue() {
    const frameRate = document.getElementById('frame-rate');
    frameRate.innerHTML = `fps: ${this.fps}`;
  }

  time(transformedFrames) {
    if (this.isAnimationOn) {
      if (this.count >= this.frames.length) {
        this.count = 0;
      }
      const frame = transformedFrames[this.count];
      if (frame) {
        this.drawAnimationFrame(frame);
        this.count += 1;
        setTimeout(this.time.bind(this, transformedFrames), 1000 / this.fps);
      }
    }
  }

  startAnimation() {
    const transformedFrames = this.getTransformedFrames(this.frames);
    this.time(transformedFrames);
  }

  addListeners() {
    document.getElementById('fps').addEventListener('input', (e) => {
      this.fps = e.target.value;
      this.displayNewFpsValue();
    });

    document.getElementById('draw').addEventListener('click', () => {
      if (!this.isAnimationOn) {
        this.isAnimationOn = true;
        this.startAnimation();
      }
    });

    document.getElementById('stop').addEventListener('click', () => {
      this.isAnimationOn = false;
    });

    document.getElementById('full-screen').addEventListener('click', this.toggleFullScreen, false);
  }

  initialize() {
    this.addListeners();
  }
}
