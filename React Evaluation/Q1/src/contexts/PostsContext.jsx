import React, { createContext, useContext, useEffect, useState } from 'react'

function PostsContext({children}){
const PostsContext = createContext();
const [posts, setPosts] = useState();
const usePosts =() => useContext(PostsContext);
    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response)=>response.json)
        .then((data)=>{
            setPosts(data.slice(0,20))
        })
    },[]);

    const updatePost = (id, updatedData) => {
        setPosts(prev =>
            prev.map(post =>
                post.id === id ? { ...post, ...updatedData} : post
            )
        );
    };

    const deletePost = (id) => {
        setPosts(prev => prev.filter(post=>post.id !==id));
    }

    return(
        <PostsContext.Provider value={{posts, updatePost, deletePost}}>
            {children}
        </PostsContext.Provider>
    )

}
export default PostsContext