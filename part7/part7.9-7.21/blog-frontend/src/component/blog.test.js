import React from 'react'
import {render,fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './blog'

describe('<Blog/>',() => {
    let blog
    let component
    let updateLikes 
    beforeEach(() =>{
        blog ={
            title: "rendering blog with test library",
            author: "jamiu",
            url:"http://test_libray.com",
            likes: 10,
            user: {
                name:'jamiu'
            }
        }
        updateLikes = jest.fn()
        component = render(
            <Blog blog ={blog} updateLikes ={updateLikes}/>
        )

    })
    test('test blog is rendered', () =>{
        expect(component.container).toHaveTextContent(
            'rendering blog with test library'
        )
    })
    test('test blog url,likes etc are hidden by default ', () =>{
        const div = component.container.querySelector('.blogDetails')
        expect(div).toHaveStyle('display : none')
    })
    test('test the blog url,likes etc. will show after clicking the view button',()=>{
        const button = component.getByText('view')
        fireEvent.click(button)
        const div = component.container.querySelector('.blogDetails')
        expect(div).not.toHaveStyle('display : none')
    })
    test('test if the like button is clicked twice, the component received by the event handler is called twice',()=>{
       const like = component.container.querySelector('.like')
       fireEvent.click(like)
       fireEvent.click(like)
       expect(updateLikes.mock.calls).toHaveLength(2)
    })
})
