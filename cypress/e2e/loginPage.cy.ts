/// <reference types="cypress" />

describe('Accès page login de Chappy', () => {
  it('Login avec champ vide ', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('#email').type(' ')
    cy.get('#password').type(' ')
    cy.get('.m-auto > .align-middle').click()
    cy.get('.mt-5 > .flex-col > :nth-child(2)').should('contain.text', 'Votre E-mail est requis')
    cy.get('.mt-5 > .flex-col > :nth-child(4)').should('contain.text', 'Mot de passe avec 8 charactères minimum.')

  });

  it('Login avec le bon mail et mdp vide', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('#email').type('ashry.laetitia@gmail.com')
    cy.get('#password').type(' ')
    cy.get('.m-auto > .align-middle').click()
    cy.get('.flex-col > .text-brick-400').should('contain.text', 'Mot de passe avec 8 charactères minimum.')

  });

  it('Login avec mail erroné et bon mdp', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('#email').type(' ')
    cy.get('#password').type("c'estmagique")
    cy.get('.m-auto > .align-middle').click()
    cy.get('.flex-col > .text-brick-400').should('contain.text', 'Votre E-mail est requis')

  });

  it('Login avec le bon mail et mdp' +
            ' incorrect', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('#email').type('ashry.laetitia@gmail.com')
    cy.get('#password').type("C_123456789")
    cy.get('.m-auto > .align-middle').click()
    cy.get('div').should('contain.text', 'Identifiants incorrects')

  });

  it.only('Login correct', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('#email').type('ellaenys@gmail.com')
    cy.get('#password').type('Test12345test')
    cy.get('.m-auto > .align-middle').click()
    cy.get('.items-center.mb-5 > .block').should('contain.text','Bienvenue Laetitia Ashry')
  });
})

