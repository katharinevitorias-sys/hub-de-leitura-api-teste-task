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
Cypress.Commands.add('cadastrarLivro', (token, livro) => {

    cy.api({
        method: 'POST',
        url: 'books',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: {
            "title": livro.title,
            "author": livro.author,
            "description": livro.description,
            "category": livro.category,
            "isbn": livro.isbn,
            "editor": livro.editor,
            "language": livro.language,
            "publication_year": livro.publication_year,
            "pages": livro.pages,
            "format": livro.format,
            "total_copies": livro.total_copies,
            "available_copies": livro.available_copies
        }

    }).then(response => {

        return response

    })

})
Cypress.Commands.add('cadastrarLivro', (token, livro) => {

    cy.api({
        method: 'POST',
        url: 'books',
        headers: {
            'Authorization': token
        },
        body: livro,
        failOnStatusCode: false

    }).then((response) => {

        return response

    })

})
Cypress.Commands.add('atualizarLivro', (token, id, livro) => {

    cy.api({
        method: 'PUT',
        url: `books/${id}`,
        headers: {
            'Authorization': token
        },
        body: livro

    }).then((response) => {
        return response
    })

})
Cypress.Commands.add('deletarLivro', (token, id) => {

    cy.api({
        method: 'DELETE',
        url: `books/${id}`,
        headers: {
            'Authorization': token
        }

    }).then((response) => {
        return response
    })

})