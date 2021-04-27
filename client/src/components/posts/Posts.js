import axios from "axios";
import React, { useEffect } from "react";
import { Box, FormControl, MenuItem, Select, Typography } from '@material-ui/core';

import { useState } from "react";
import Post from "./Post";

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');


    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + 'posts').then((response) => {
            setPosts(response.data);
        });
        axios.get(process.env.REACT_APP_BACKEND_URL + 'categories').then((response) => {
            setCategories(response.data);
        });
    },[]);

    const handleChange = (e) => {
        setCategory(e.target.value);
        
    };
    useEffect(() => {
        if (category !== ''){
        axios.get(process.env.REACT_APP_BACKEND_URL + 'filterPostByCategory/'+ category).then((response) => {
            setPosts(response.data);
            console.log(response);
        });
        }
    },[category]);

    const handleDelete = (postID) => {
        let refreshedPosts = [...posts];
        refreshedPosts = refreshedPosts.filter(p => p._id !== postID);
        setPosts(refreshedPosts);
    }

    return (

        <div>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center"
                     width="100%" marginTop="20px">
                        <Typography variant="h6">Category:</Typography>
                        <Box marginLeft="10px">
                            <FormControl variant="outlined" size="small" style={{width:'200px'}}>
                                <Select width="100px"
                                name="category"
                                value={category}
                                onChange={handleChange}>
                                    {categories.map((c) => (
                                        <MenuItem value={c.header} key={c._id}>{c.header}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                </Box>

            {posts.map((p) => (
                <Post post={p} key={p._id} handleDelete={handleDelete}/> 
            ))}
        </div>
     
    );
  };
export default Posts;