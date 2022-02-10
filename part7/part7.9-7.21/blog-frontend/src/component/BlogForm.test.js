import React from'react'
import{render,fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('test <BlogForm/>  calls the event handler it received as props with the right details when a new blog is created', () =>{
    const handleCreateBlog = jest.fn()

    const component = render(
        <BlogForm handleCreateBlog ={handleCreateBlog}/>
    )
    const title = component.container.querySelector('#blogFormTitle')
    const author = component.container.querySelector('#blogFormAuthor')
    const url = component.container.querySelector('#blogFormUrl')
    const form = component.container.querySelector('.form')
    fireEvent.change(title, {
        target:{ value: 'creating blog with test'}
    })
    fireEvent.change(author,{
        target:{value : 'jamiu'}
    })
    fireEvent.change(url,{
        target:{value: 'http://localhost:3001'}
    })
    fireEvent.submit(form)
    expect(handleCreateBlog.mock.calls).toHaveLength(1)
    expect(handleCreateBlog.mock.calls[0][0]).toStrictEqual({
        title: 'creating blog with test',
        author: 'jamiu',
        url: 'http://localhost:3001'
      })

    
})