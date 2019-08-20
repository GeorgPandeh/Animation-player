import Animation from './components/Animation';
import Frames from './components/Frames';

class Application {
  initialize() {
    const frames = new Frames();
    frames.initialize();
    const animation = new Animation(frames.getFrames());
    animation.initialize();
  }
}

window.onload = () => {
  const main = new Application();
  main.initialize();
};
