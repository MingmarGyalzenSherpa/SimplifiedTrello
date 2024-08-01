import { IComponent } from "../interfaces/IComponent";

export class NotFound implements IComponent {
  constructor(private container: HTMLElement) {
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    `;
  }
}
