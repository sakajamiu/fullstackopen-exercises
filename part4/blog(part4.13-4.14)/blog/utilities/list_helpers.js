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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,

}