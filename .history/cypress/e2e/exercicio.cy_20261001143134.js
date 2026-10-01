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
               expect(response.body.message).to.equal('"title" is not allowed to be empty')
               expect(response.body.field).to.equal('title')

          })

     })

     it('PUT - Deve atualizar um livro previamente cadastrado', () => {

          const livro = {
               title: "Livro para atualizar",
               author: "Autor Teste",
               description: "Descrição inicial",
               category: "Literatura Brasileira",
               isbn: `${Date.now()}`,
               editor: "Editora Teste",
               language: "Português",
               publication_year: 2020,
               pages: 200,
               format: "Físico",
               total_copies: 4,
               available_copies: 4
          }

          cy.cadastrarLivro(token, livro).then((response) => {

               const idLivro = response.body.book.id

               const livroAtualizado = {
                    ...livro,
                    title: "Livro Atualizado",
                    description: "Descrição atualizada"
               }

               cy.atualizarLivro(token, idLivro, livroAtualizado)
                    .then((response) => {

                         expect(response.status).to.equal(200)

                    })

          })

     })


     it('DELETE - Deve deletar um livro previamente cadastrado', () => {

          const livro = {
               title: "Livro para deletar",
               author: "Autor Teste",
               description: "Livro criado para teste de exclusão",
               category: "Literatura Brasileira",
               isbn: `${Date.now()}`,
               editor: "Editora Teste",
               language: "Português",
               publication_year: 2020,
               pages: 200,
               format: "Físico",
               total_copies: 4,
               available_copies: 4
          }

          cy.cadastrarLivro(token, livro).then((response) => {

               const idLivro = response.body.book.id

               cy.deletarLivro(token, idLivro).then((response) => {

                    expect(response.status).to.equal(200)

               })

          })

     })

})
