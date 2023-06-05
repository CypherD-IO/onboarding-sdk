/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getById(idAttribute: string): Chainable<JQuery<HTMLElement>>
    getByClass(classAttribute: string): Chainable<JQuery<HTMLElement>>
  }
}
