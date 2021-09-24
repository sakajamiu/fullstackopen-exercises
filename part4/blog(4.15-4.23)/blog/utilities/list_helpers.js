const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let totalNoOfLikes = blogs.reduce((totalLikes,blog) =>{
        return totalLikes + blog.likes
    }, 0)
    return totalNoOfLikes
}

const favoriteBlog = (blogs) => {

    const highestLikes = blogs.reduce(function(highest,blog) {
        return Math.max(highest, blog.likes)

    },0)
    
    const mostLike = blogs.filter(blog => blog.likes === highestLikes )
    const favorite = mostLike.map(blog => {
        delete blog._id,
        delete blog.__v,
        delete blog.url 
        
        return blog    
    })
    const destructure = favorite[0]
   return destructure
    
}
const authorWithMostBlogs = (blogs) => {
    const blogAuthors = blogs.reduce(function(previousValue,currentValue){
        return [...previousValue, currentValue.author]
    },[])
    const countAuthorBlog = blogAuthors.reduce( function (allNames, name){
        if(name in allNames){
            allNames[name]++
        }else{
            allNames[name] = 1
        }
        return allNames
    },{})
    const numberOfEachAuthorBlogs = Object.values(countAuthorBlog)
    const getNumberOFMaximumBlogs = numberOfEachAuthorBlogs.reduce(function(highest,author){
        return Math.max(highest,author)
    },0)
    const getAuthorWithTheHighestBlog = (object,value) =>Object.keys(object).find(key => object[key]===value)
    let authorWithMostblog = getAuthorWithTheHighestBlog(countAuthorBlog,getNumberOFMaximumBlogs)
    let result = {
        author : authorWithMostblog,
        blogs: getNumberOFMaximumBlogs
    }
    return result


}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    authorWithMostBlogs

}