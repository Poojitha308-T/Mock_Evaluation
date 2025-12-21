import React, { useState } from 'react'

const PostsList = () => {

    const {posts, updatePost, deletePost} = usePosts();
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({title:"", body: ""});

    const startEdit = (post) =>{
        setEditId(post.id);
        setForm({title: post.title, body: post.body});
    };

    

  return (
    <div></div>
  )
}

export default PostsList