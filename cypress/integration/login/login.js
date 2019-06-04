let time_out = 20000
describe('Login/Logout', () => {

  it('C7 Verify Carrier user can login with valid username and valid password(English)', () => {
    cy.login(Cypress.env('english_carrier_email'),Cypress.env('english_carrier_fullname'))
      .get('[data-qa=sign-out]').click()
      .url().should('include', '/sign-in')
  })

  it('C1043 Verify Carrier user can login with valid username and valid password(German)', () => {
    cy.login(Cypress.env('german_carrier_email'),Cypress.env('german_carrier_fullname'))
      .get('[data-qa=sign-out]').click()
      .url().should('include', '/sign-in')
  })

  it('C14 Verify Driver user can login with valid username and valid password(English)', () => {
    cy.login(Cypress.env('english_driver_email'),Cypress.env('english_driver_fullname'))
      .get('[data-qa=sign-out]').click()
      .url().should('include', '/sign-in')
  })

  it('C1044 Verify Driver user can login with valid username and valid password(German)', () => {
    cy.login(Cypress.env('german_driver_email'),Cypress.env('german_driver_fullname'))
      .get('[data-qa=sign-out]').click()
      .url().should('include', '/sign-in')
  })

  it('C8 Verify user can not login with invalid username and valid password', () => {
    cy.visit('/sign-in')
      .viewport(1440, 768)
      .get('[data-qa=email]').type(Cypress.env('wrong_email'))
      .get('[data-qa=password]').type(Cypress.env('password'))
      .get('[data-qa=sign-in-button]').click()
      .get('div',{ timeout: time_out }).should('have.class', 'alert alert--error')
  })

    it('C9 Verify user can not login with valid username and invalid password', () => {
    cy.visit('/sign-in')
      .viewport(1440, 768)
      .get('[data-qa=email]').type(Cypress.env('english_carrier_email'))
      .get('[data-qa=password]').type(Cypress.env('wrong_password'))
      .get('[data-qa=sign-in-button]').click()
      .get('div',{ timeout: time_out }).should('have.class', 'alert alert--error')
  })

    it('C10 Verify user can not login with invalid username and invalid password', () => {
    cy.visit('/sign-in')
      .viewport(1440, 768)
      .get('[data-qa=email]').type(Cypress.env('wrong_email'))
      .get('[data-qa=password]').type(Cypress.env('wrong_password'))
      .get('[data-qa=sign-in-button]').click()
      .get('div',{ timeout: time_out }).should('have.class', 'alert alert--error')
  })

    it('C11 Verify user can not login with empty username and epmty password', () => {
    cy.visit('/sign-in')
      .viewport(1440, 768)
      .get('[data-qa=sign-in-button]').click()
      .get('div',{ timeout: time_out }).should('have.class', 'alert alert--error')
  })

    it('C12 Verify user can not login with valid username and empty password', () => {
    cy.visit('/sign-in')
      .viewport(1440, 768)
      .get('[data-qa=email]').type(Cypress.env('english_carrier_email'))
      .get('[data-qa=sign-in-button]').click()
      .get('div',{ timeout: time_out }).should('have.class', 'alert alert--error')
  })

    it('C16 Verify unauthorized user does not have access via direct links', () => {
    cy.visit('/sign-in')
      .viewport(1440, 768)
      .visit('/tours')
      .location('pathname', {timeout: time_out}).should('include', '/sign-in');
  })

})
