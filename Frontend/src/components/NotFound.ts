import { IComponent } from "../interfaces/IComponent";

/**
 * Not Found page component
 */

export class NotFound implements IComponent {
  constructor(private container: HTMLElement) {
    this.render();
  }

  /**
   * Render html
   */
  render() {
    this.container.innerHTML = `
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    `;
  }
}
