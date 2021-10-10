describe('Blog App',function (){
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user ={
            username: 'jamiu',
            name:'jamiu',
            password:'pass1234'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.visit('http://localhost:3000')
    })
    it('Login form is shown', function(){
        cy.contains('Username')
        cy.contains('Password')
        cy.contains('Log In')
    })
    describe('login', function(){
        it('succeeds with right credentials', function(){
            cy.get('#loginUsername').type('jamiu')
            cy.get('#loginPassword').type('pass1234')
            cy.get('#loggin-button').click()
            cy.contains('create new blog')
            cy.contains('jamiu')
        })
        it('failed with wrong credentials', function(){
            cy.get('#loginUsername').type('wrong')
            cy.get('#loginPassword').type('wrong')
            cy.get('#loggin-button').click()
            cy.contains('wrong username or password')
        })
    })
    describe('when logged in', function(){
        beforeEach(function(){
            cy.login({username: 'jamiu', password: 'pass1234'})
        })
        it('A blog can be created', function(){
            cy.contains('create new blog').click()
            cy.get('#blogFormTitle').type('blog created with cypress')
            cy.get('#blogFormAuthor').type('cypress')
            cy.get('#blogFormUrl').type('http://localhost:3000')
            cy.get('#blogFormCreate').click()
            cy.contains('blog created with cypress')
              .contains('cypress')
            cy.contains('view')
        })
        it('a blog can be liked', function(){
            cy.contains('create new blog').click()
            cy.get('#blogFormTitle').type('blog created with cypress')
            cy.get('#blogFormAuthor').type('cypress')
            cy.get('#blogFormUrl').type('http://localhost:3000')
            cy.get('#blogFormCreate').click()
            cy.contains('view').click()
            cy.get('#like').click()
            cy.contains(1)

        })
        it('user who created a blog can delete it', function(){
            cy.contains('create new blog').click()
            cy.get('#blogFormTitle').type('blog created with cypress')
            cy.get('#blogFormAuthor').type('cypress')
            cy.get('#blogFormUrl').type('http://localhost:3000')
            cy.get('#blogFormCreate').click()
            cy.contains('view').click()
            cy.contains('remove').click()
            cy.get('.dashboard')
              .should('not.contain', 'blog created with cypress')
        })
        describe('several blogs exist', function(){
            beforeEach(function(){
                cy.createBlog({title :'first blog', author: 'cypress', url:'http://locahost:3001/api/blogs', likes:5})
                cy.createBlog({title :'second blog', author: 'cypress', url:'http://locahost:3001/api/blogs', likes:0})
                cy.createBlog({title :'third blog', author: 'cypress', url:'http://locahost:3001/api/blogs', likes:22})
                cy.createBlog({title :'fourth blog', author: 'cypress', url:'http://locahost:3001/api/blogs', likes:1})
            })
            it('blogs are arrange according to number of likes', function(){
                cy.get('.dashboard').parent().find('.blog').first()
                  .should('contain', 'third blog')
                cy.get('.dashboard').parent().find('.blog').first().next()
                   .should('contain', 'first blog')  
                cy.get('.dashboard').parent().find('.blog').last() 
                  .should('contain', 'second blog')
 
            } )
 
        })
        
    })
    
})