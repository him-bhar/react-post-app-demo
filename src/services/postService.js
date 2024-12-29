import axios from "axios";

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', //A service that provides mock api to integrate
});

//get lists of posts
const getPosts = () => api.get('/posts');

//delete a post by id
const deletePost = (id) => api.delete(`posts/${id}`);

const createPost = (post) => api.post('posts', post);

const updatePost = (id, post) => api.put(`posts/${id}`, post);


export { getPosts, deletePost, createPost, updatePost }; //Way to export a named function, not as a default