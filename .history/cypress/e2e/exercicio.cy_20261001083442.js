/// <reference types="cypress" />

let token

beforeEach(() => {

     cy.geraToken('admin@biblioteca.com', 'admin123').then(tkn => {
          token = tkn
     })

})

describe('Testes da Funcionalidade Catálogo de Livros', () => {

     it('GET - Deve listar livros com filtros e paginação', () => {

          cy.listarLivrosComFiltros({
               category: "Literatura Brasileira",
               author: "Machado de Assis",
               limit: 20,
               offset: 0
          }).then((response) => {

               expect(response.status).to.equal(200)

          })

     })


     it('GET - Deve obter detalhes de um livro específico', () => {

          cy.buscarLivroPorId(5).then((response) => {

               expect(response.status).to.equal(200)
               expect(response.body.book).to.have.property('id')
               expect(response.body.book).to.have.property('title')
               expect(response.body.book).to.have.property('author')
               expect(response.body.book).to.have.property('category')

          })

     })

     // restante dos testes...
})