declare namespace Cypress {
  interface Chainable {
    mount: typeof mount;
    getBySel(
      dataTestAttribute: string,
      args?: any
    ): Chainable<JQuery<HTMLElement>>;

    // CUSTOM CURSOR
    shouldHaveCursorPosition(x: number, y: number): Chainable<void>;
    shouldHaveCursorEffect(effectClass: string): Chainable<void>;
    shouldNotHaveCursorEffect(effectClass: string): Chainable<void>;
  }
}
