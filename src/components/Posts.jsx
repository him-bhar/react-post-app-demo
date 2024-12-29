import React, {useEffect, useState} from "react";
import {deletePost, getPosts, updatePost} from "../services/postService.js";
import PostForm from "./PostForm.jsx";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);

    useEffect(() => {
        getPosts().then((result) => {
            setPosts(result.data);
        }).catch((error) => {
            console.error(error);
        })
        console.log("Load posts")
    }, []); //No dependencies, only load once

    const handleDelete = (evt, id) => {
        console.log("Deleting post: ", id)
        evt.target.disabled = 'true'; //Double clicks not allowed, so disabled button after click
        deletePost(id).then((result) => {
            setPosts(posts.filter((post) => post.id !== id));
        }).catch((error) => {
            console.error(error);
        })
        evt.target.disabled = 'false'; // Enabling button after operation complete.
    }

    const startEditing = (evt, post) => {
        console.log("Editing post: ", post.id)
        setEditingPost(post);
    }

    return (
        <div>
            <h1>Posts</h1>
            <PostForm posts={posts} setPosts={setPosts} editingPost={editingPost} setEditingPost={setEditingPost} />
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <button onClick={(evt) => startEditing(evt, post)}>Edit</button>
                        <button onClick={(evt) => handleDelete(evt, post.id)}>Delete</button>
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default Posts;