import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Box, Paper,Typography } from '@material-ui/core';

import { useState } from "react";
import Post from "./Post";
import { useParams } from "react-router";
import DimensionContext from "../../contexts/DimensionContext";

const UserPosts = () => {

    const {userId} = useParams();
    const width = useContext(DimensionContext);

    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');
    
    useEffect(() => {
        console.log(userId);
        axios.get(process.env.REACT_APP_BACKEND_URL + 'posts/postByUser/' + userId)
        .then((response) => {
            setPosts(response.data.posts);
            setUsername(response.data.username);
            console.log(response);
        });
    },[]);

    return (

        <div>
            <Box width={ width < 1023 ? "100%" : "60%" }
            padding={ width < 1023 ? "16px" : "0" }
            marginX="auto" marginTop="30px">
            <Paper elevation={3}>
                <Box padding="16px" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" component="div">
                        {username.charAt(0).toUpperCase() + username.slice(1)}
                    </Typography>
                    <Typography variant="h5" component="div" color="textSecondary">
                        Number of posts: {posts.length}
                    </Typography>
                </Box>
            </Paper>
            </Box>
            {posts.map((p) => (
                <Post post={p} key={p._id}/> 
            ))}
        </div>
     
    );
  };
export default UserPosts;