// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (email, fullname) => {
    cy.visit('/sign-in')
    cy.viewport(1440, 768)
    cy.get('[data-qa=email]')
      .type(email)
    cy.get('[data-qa=password]')
      .type(Cypress.env('password'))
    cy.get('[data-qa=sign-in-button]').click()
    cy.get('[data-qa=sign-out]',{timeout: 100000 })
    cy.get('[data-qa=sidebar-fullname]').should('contain', fullname)  
})

Cypress.Commands.add('logout', () => { 
 cy.get('[data-qa=sign-out]').click()
 cy.url().should('include', '/sign-in')
})

/**
 * Converts Cypress fixtures, including JSON, to a Blob. All file types are
 * converted to base64 then converted to a Blob using Cypress
 * expect application/json. Json files are just stringified then converted to
 * a blob (prevents issues with invalid string decoding).
 * @param {String} fileUrl - The file url to upload
 * @param {String} type - content type of the uploaded file
 * @return {Promise} Resolves with blob containing fixture contents
 */
function getFixtureBlob(fileUrl, type) {
  return type === 'application/json'
    ? cy
        .fixture(fileUrl)
        .then(JSON.stringify)
        .then(jsonStr => new Blob([jsonStr], { type: 'application/json' }))
    : cy.fixture(fileUrl, 'base64').then(Cypress.Blob.base64StringToBlob)
}

/**
 * Uploads a file to an input
 * @memberOf Cypress.Chainable#
 * @name uploadFile
 * @function
 * @param {String} selector - element to target
 * @param {String} fileUrl - The file url to upload
 * @param {String} type - content type of the uploaded file
 */
Cypress.Commands.add('uploadFile', (selector, fileUrl, type = '') => {
  return cy.get(selector).then(subject => {
    return getFixtureBlob(fileUrl, type).then(blob => {
      return cy.window().then(win => {
        const el = subject[0]
        const nameSegments = fileUrl.split('/')
        const name = nameSegments[nameSegments.length - 1]
        const testFile = new win.File([blob], name, { type })
        const dataTransfer = new win.DataTransfer()
        dataTransfer.items.add(testFile)
        el.files = dataTransfer.files
        return subject
      })
    })
  })
})

Cypress.Commands.add('downloadFileAndCompare', (back_end_url, fileUrl, fileName) => {
  cy.request('https://'+back_end_url+'/attachments/pods/' + fileUrl).then((response) => {
    cy.readFile('/cypress/fixtures/' + fileName).should('eq', response.body)
  })
})
