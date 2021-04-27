import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from "./posts/Post";

const Trending = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL+'top10').then((response) => {
        setPosts(response.data);
        console.log(posts);
        });
    }, []);

    return (
        <div>
            {posts.map((p) => (
                <Post post={p}/> 
            ))}
        </div>
      );
};
export default Trending;