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

it('POST - Deve adicionar um novo livro ao catálogo', () => {
     cy.api({
          method: 'POST',
          url: 'books',
          headers: {
               Authorization: token
          },
          body: {
               title: "O Cortiço",
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
     }).then((response) => {

          expect(response.status).to.equal(201)
          expect(response.body.message).to.equal('Livro criado com sucesso.')
     })
     
     it('POST - Deve cadastrar um novo livro com sucesso', () => {
          //TODO: 
     });

     // Objetivo: Garantir que dados inválidos são rejeitados ao adicionar um livro
     // Validar mensagens de erro apropriadas para dados faltantes ou incorretos
     it('POST -  Deve rejeitar livro com dados inválidos', () => {
          //TODO: 
     });

     // Objetivo: Validar que um livro pode ser atualizado com sucesso
     // Verificar que apenas admin pode atualizar livros (validação de permissão)
     it('PUT - Deve atualizar um livro previamente cadastrado', () => {
          //TODO: 
     });

     // Objetivo: Validar que um livro pode ser removido do catálogo
     // Verificar que apenas admin pode deletar livros (validação de permissão)
     it('DELETE - Deve deletar um livro previamente cadastrado', () => {
          //TODO: 
     });
});
