export default class Frames {
  constructor() {
    this.counter = 0;
    this.frames = [];
  }

  colorUpperPart(e) {
    if (e.target.style.backgroundColor === 'black') {
      e.target.style.backgroundColor = 'red';
    } else e.target.style.backgroundColor = 'black';
  }

  colorLowerPart(e) {
    if (e.target.style.backgroundColor === 'pink') {
      e.target.style.backgroundColor = 'blue';
    } else e.target.style.backgroundColor = 'pink';
  }

  duplicateFrame(e) {
    this.counter += 1;
    const dublicateId = e.target.id.split('').splice(3, e.target.id.length).join('');
    const dublicateParentDiv = document.getElementById(`id${dublicateId}`);
    const dublicate = dublicateParentDiv.cloneNode(true);
    dublicate.id = `id${this.counter}`;
    dublicateParentDiv.parentNode.insertBefore(dublicate, dublicateParentDiv.nextSibling);
    const dublicButton = document.querySelector(`#id${this.counter} .dublicate-button`);
    const delButton = document.querySelector(`#id${this.counter} .delete-button`);
    dublicButton.id = `dub${this.counter}`;
    delButton.id = `del${this.counter}`;
    dublicButton.addEventListener('click', this.duplicateFrame);
    delButton.addEventListener('click', this.deleteFrame);
    const replaceColor = document.querySelectorAll(`#id${this.counter} div`);
    replaceColor.forEach((item, i) => {
      item.addEventListener('click', (event) => {
        if (i === 0) {
          this.colorUpperPart(event);
        } else this.colorLowerPart(event);
      });
    });
  }

  deleteFrame(e) {
    const delId = e.target.id.split('').splice(3, e.target.id.length).join('');
    const deleteElement = document.getElementById(`id${delId}`);
    deleteElement.parentNode.removeChild(deleteElement);
  }

  setFrames(parentDiv) {
    this.frames.push(parentDiv);
  }

  getFrames() {
    return this.frames;
  }

  newFrame() {
    this.counter += 1;
    const frameContainer = document.querySelector('.frame-container');
    const parentDiv = document.createElement('div');
    parentDiv.id = `id${this.counter}`;

    const deleteButton = document.createElement('button');
    deleteButton.id = `del${this.counter}`;
    deleteButton.innerHTML = 'delete';
    deleteButton.classList.add('delete-button');
    parentDiv.appendChild(deleteButton);
    deleteButton.addEventListener('click', this.deleteFrame);

    const dublicateButton = document.createElement('button');
    dublicateButton.innerHTML = 'dublicate';
    dublicateButton.classList.add('dublicate-button');
    dublicateButton.id = `dub${this.counter}`;
    parentDiv.appendChild(dublicateButton);
    dublicateButton.addEventListener('click', this.duplicateFrame.bind(this));

    const chiledDiv1 = document.createElement('div');
    const chiledDiv2 = document.createElement('div');
    parentDiv.classList.add('frames');
    chiledDiv1.classList.add('el1');
    chiledDiv1.addEventListener('click', this.colorUpperPart);
    chiledDiv2.addEventListener('click', this.colorLowerPart);
    chiledDiv1.setAttribute('value', 'el1');
    chiledDiv2.classList.add('el2');
    chiledDiv1.style.backgroundColor = 'black';
    chiledDiv2.style.backgroundColor = 'pink';
    frameContainer.appendChild(parentDiv);
    parentDiv.appendChild(chiledDiv1);
    parentDiv.appendChild(chiledDiv2);
    this.setFrames(parentDiv);
  }

  initialize() {
    document.getElementById('new-frame').addEventListener('click', this.newFrame.bind(this));
  }
}
