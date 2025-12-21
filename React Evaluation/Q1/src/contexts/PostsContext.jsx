import React, { createContext, useEffect, useState } from 'react'

function PostsContext(){
const PostsContext = createContext();
const [posts, setPosts] = useState();
    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response)=>response.json)
        .then((data)=>{
            setPosts(data.slice(0,20))
        })
    },[]);
    

}
export default PostsContext