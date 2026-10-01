/// <reference types="cypress" />
let token

beforeEach(() => {

     cy.geraToken('admin@biblioteca.com', 'admin123').then(tkn => {
          token = tkn
     })

})

describe('Testes da Funcionalidade Catálogo de Livros', () => {

     it.only('GET - Deve listar livros com filtros e paginação', () => {

          cy.listarLivrosComFiltros({
               category: "Literatura Brasileira",
               author: "Machado de Assis",
               limit: 20,
               offset: 0
          }).then((response) => {

               expect(response.status).to.equal(200)

          });

     });

});

it.only('GET - Deve obter detalhes de um livro específico', () => {

     cy.buscarLivroPorId(5).then((response) => {

          expect(response.status).to.equal(200)

          expect(response.body.book).to.have.property('id')
          expect(response.body.book).to.have.property('title')
          expect(response.body.book).to.have.property('author')
          expect(response.body.book).to.have.property('category')

     })

})

it('POST - Deve rejeitar cadastro de livro com dados inválidos', () => {

     const livro = {
          author: "Aluísio Azevedo",
          description: "Romance naturalista",
          category: "Literatura Brasileira",
          isbn: `${Date.now()}`,
          editor: "Editora Ática",
          language: "Português",
          publication_year: 1890,
          pages: 312,
          format: "Físico",
          total_copies: 4,
          available_copies: 4
     }

     cy.api({
          method: 'POST',
          url: 'books',
          headers: {
               'Authorization': token
          },
          body: livro,
          failOnStatusCode: false

     }).then((response) => {

          expect(response.status).to.equal(400)

     })

})
it.only('POST - Deve rejeitar livro com dados inválidos', () => {

     const livro = {
          title: "",
          author: "Aluísio Azevedo",
          description: "Romance naturalista",
          category: "Literatura Brasileira",
          isbn: `${Date.now()}`,
          editor: "Editora Ática",
          language: "Português",
          publication_year: 1890,
          pages: 312,
          format: "Físico",
          total_copies: 4,
          available_copies: 4
     }

     cy.cadastrarLivro(token, livro).then((response) => {

          expect(response.status).to.equal(400)
          expect(response.body.message).to.exist

     })

})
it('PUT - Deve atualizar um livro previamente cadastrado', () => {
     //TODO: 
});

// Objetivo: Validar que um livro pode ser removido do catálogo
// Verificar que apenas admin pode deletar livros (validação de permissão)
it('DELETE - Deve deletar um livro previamente cadastrado', () => {
     //TODO: 
});

