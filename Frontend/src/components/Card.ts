export class Card {
  state: object;
  elements: {
    parentEl: HTMLElement;
  };
  constructor(parentEl: HTMLElement) {
    this.state = {};
    this.elements = {
      parentEl,
    };
  }

  initialSetup = () => {};

  setupEventListener = () => {};

  render = () => {};
}
