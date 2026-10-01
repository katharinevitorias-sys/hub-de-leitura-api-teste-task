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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('geraToken', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            email: email,
            password: senha
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.token
    })
})

Cypress.Commands.add('cadastrarUsuario', (nome, email, senha) => {
    cy.api({
        method: 'POST',
        url: 'users',
        body: {
            "name": nome,
            "email": email,
            "password": senha
        }
    }).then(response => {
        expect(response.status).to.equal(201)
        return response.body.user.id
    })
})

Cypress.Commands.add('listarLivrosComFiltros',
    ({ category, author, limit, offset }) => {

        cy.api({
            method: 'GET',
            url: 'books',
            qs: {
                category: category,
                author: author,
                limit: limit,
                offset: offset
            }

        }).then(response => {

            expect(response.status).to.equal(200)

            return response

        })

    }
)
Cypress.Commands.add('buscarLivroPorId', (id) => {

    cy.api({
        method: 'GET',
        url: `books/${id}`

    }).then(response => {

        expect(response.status).to.equal(200)

        return response

    })

})
Cypress.Commands.add('cadastrarLivro', (token, titulo, autor, categoria) => {

    cy.api({
        method: 'POST',
        url: 'books',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: {
            "title": titulo,
            "author": autor,
            "category": categoria
        }

    }).then(response => {

        return response

    })

})