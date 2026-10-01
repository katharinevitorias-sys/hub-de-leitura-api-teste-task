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

    cy.buscarLivroPorId(50).then((response) => {

        expect(response.status).to.equal(200)

        expect(response.body.book).to.have.property('id')
        expect(response.body.book).to.have.property('title')
        expect(response.body.book).to.have.property('author')
        expect(response.body.book).to.have.property('category')

    })

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
