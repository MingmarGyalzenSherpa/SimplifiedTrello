export class Workspace {
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
