import React, { useState } from 'react'

const PostsList = () => {

    const {posts, updatePost, deletePost} = usePosts();
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({title:"", body: ""});

    const startEdit = (post) =>{
        setEditId(post.id);
        setForm({title: post.title, body: post.body});
    };

    const saveEdit=(id)=>{
        updatePost(id, form);
        setEditId(null);
    };

  return (
    <div>
        {posts.map(post => (
            <div key = {post.id}>
                {editId === post.id ? (
                    <>
                    <input value={form.title}
                    onChange={e => setForm({...form, title: e.target.value})}/>
                    <textarea value={form.body}
                    onChange={e => setForm({...form, body: e.target.value})}/>
                    
                    </>
                )}
            </div>
        ) )}
    </div>
  )
}

export default PostsList