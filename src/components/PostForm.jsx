import {useState, useEffect} from "react";
import {createPost, updatePost} from "../services/postService.js";

const PostForm = ({posts, setPosts, editingPost, setEditingPost}) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        if (editingPost) {
            setTitle(editingPost.title)
            setBody(editingPost.body)
        } else {
            clearForm();
        }
    }, [editingPost]) //Whenever editing post is changed reload this component.

    function clearForm() {
        setTitle('')
        setBody('')
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        //Assume creation API is called
        //Placeholder for API call
        if (editingPost) {
            editPost();
        } else {
            addPost();
        }
        //Clearing out the form
        clearForm();
        setEditingPost(null); //Request has completed, rest editing state if was present.
    }

    const addPost = () => {
        createPost({title, body})
            .then((result) => {
                setPosts((prevPosts) => [...prevPosts, result.data]);
            }).catch((error) => {
                console.error(error);
            })
    }

    const editPost = () => {
        let updatedPost = {title, body}
        updatePost(editingPost.id, updatedPost)
            .then((result) => {
                setPosts((prevPosts) => prevPosts
                    .map(post =>
                        editingPost.id === post.id ? result.data : post));
            }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>Title</div>
            <input type="text"
                   placeholder="Title"
                   onChange={(e) => setTitle(e.target.value)}
                   value={title}/>

            <div>Body</div>
            <textarea
                placeholder="Body"
                onChange={(e) => setBody(e.target.value)}
                value={body}/>
            <div>
                <button type='submit'>{editingPost ? "Edit Post": "Add Post"}</button>
            </div>
        </form>
    )
}

export default PostForm