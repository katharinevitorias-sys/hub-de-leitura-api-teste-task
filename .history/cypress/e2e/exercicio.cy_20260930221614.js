/// <reference types="cypress" />

describe('Testes da Funcionalidade Catálogo de Livros', () => {

     it('GET - Deve listar livros com filtros e paginação', () => {

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

// Objetivo: Validar que é possível obter detalhes de um livro específico pelo ID
// Verificar que todos os campos do livro são retornados corretamente
it.only('GET - Deve obter detalhes de um livro específico', () => {

     cy.buscarLivroPorId(5).then((response) => {

          expect(response.status).to.equal(200)

          expect(response.body.book).to.have.property('id')
          expect(response.body.book).to.have.property('title')
          expect(response.body.book).to.have.property('author')
          expect(response.body.book).to.have.property('category')

     })

})

// Objetivo: Validar que um novo livro é adicionado com sucesso ao catálogo
// Verificar que apenas admin pode adicionar novos livros (validação de permissão)
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

