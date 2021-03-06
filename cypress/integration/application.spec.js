// application.spec.js
describe('Site navigation and interaction...' , () => {
  before(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit('/')
  })

  // VISIT THE LANDING PAGE 
  it("user can visit landing page", () => {
    cy.visit("/");
  });

  // SELECT A DAY FROM THE AVAILIABLE LIST 
  it("User can select Tuesday", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });

  // CREATE A NEW APPOINTMENT 
  it('User can create an appointment' , () => {
    cy.get('[alt="Add"]')
      .first()
      .click();

    cy.get('[data-testid=student-name-input]')
      .type('Alex');

    cy.get('.interviewers__item-image')
      .first()
      .click()

    cy.get('.interviewers__item--selected').should('exist')

    cy.get('button')
      .contains("Save")
      .click()

    cy.get('.appointment__card--show').should('exist')
      .wait(250)
  })

  // EDIT AN EXISTING APPOINTMENT 
  it('User can edit an interview' , () => {
    cy.get('.appointment__card--show')
      .first()
      .get('.appointment__actions-button')
      .get('[alt="Edit"]')
      .first()
      .invoke('show')
      .click()

    cy.get('.appointment__card--create')
      .should('exist')
      .get('.appointment__create-input')
      .clear()
      .type('Peanut-Butter Falcon')
      .get('.interviewers__item-image')
      .first()
      .click()
      .get('button')
      .contains("Save")
      .click()

    cy.get('.appointment__card--status')
      .contains('Updating..')
      .should('exist')
      
    cy.get('.appointment__card--status')
    .contains('Updating..')
    .should('not.exist')

    cy.get('.appointment__card--show')
      .first()
      .get('.text--regular')
      .contains('Peanut-Butter Falcon')
      .wait(250)
  })

  // DELETE AN EXISITING APPOINTMENT 
  it('User can  delete an existing appointment', () => {
    cy.get('.appointment__card--show')
      .first()
      .get('.appointment__actions-button')
      .get('[alt="Delete"]')
      .invoke('show')
      .click()

    cy.get('.appointment__card--confirm')
      .first()
      .contains('Are you really bout dis')
      .should('exist')
      .get('.appointment__actions')
      .get('.button--danger')
      .contains('Confirm')
      .click()
  })
});





