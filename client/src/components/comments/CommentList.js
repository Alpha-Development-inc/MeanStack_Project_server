import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Box, Button, CircularProgress, Divider, List, ListItem, ListItemText, TextField} from '@material-ui/core';

import { useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import Comment from "./Comment";
import { Alert, AlertTitle } from "@material-ui/lab";

const CommentList = (props) => {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [mode, setMode] = useState('create');
    const [editComment, setEditComment] = useState({});
    const [error, setError] = useState(null);
    const [serverError, setServerError] = useState(null);
    const auth = useContext(AuthContext);

    useEffect(() => {
        setComments(props.comments);
    },[]);

    const handleChange = (e) => {
        if (mode === 'create'){
            setNewComment(e.target.value); 
        }
        else{
            setEditComment({...editComment, comment: e.target.value});
        }
        
    };

    const validateInput = async () => {
        let inputError = null;

        if (mode ==='create' && newComment == '') {
            inputError = 'Please leave some comment';
        }

        if (mode ==='edit' && editComment.comment == '') {
            inputError = 'Please leave some comment';
        }

        if (inputError){
            setError(inputError);
            return false;
        }

        setError(null);
        return true;

    }

    const handleAddComment = async(e) => {
        e.preventDefault();

        const formValid = await validateInput();

        if (!formValid){
            return;
        }

        let config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
        };

        let data = {
            postID: props.postID,
            comment: newComment
        };

        try {
            const response = await axios.post(
                process.env.REACT_APP_BACKEND_URL + 'comments',
                data,
                config
            );

            if (response.status === 201){
                setServerError(null);
                
                setComments([...comments, {
                    comment: newComment,
                    userId: localStorage.getItem('userId'),
                    username: localStorage.getItem('username'),
                    date: new Date()
                }]);
    
                setNewComment('');
                console.log(response);
            }

           

        } catch (err) {
            setServerError(err.response.data.msg);
        }
    }

    const handleDelete = (componentindex) => {
        let refreshedComments = [...comments];
        refreshedComments.splice(componentindex,1);
        setComments(refreshedComments);
    }

    const switchToEdit = (comment, index) => {
        setMode('edit');
        setEditComment({
            comment: comment,
            commentindex: index
        })
    }

    const handleEditComment = async(e) => {
        e.preventDefault();

        const formValid = await validateInput();

        if (!formValid){
            return;
        }

        let config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
        };

        let data = {
            postID: props.postID,
            comment: editComment.comment,
            commentindex: editComment.commentindex
        };

        try {
            const response = await axios.put(
                process.env.REACT_APP_BACKEND_URL + 'comments',
                data,
                config
            );

            if (response.status === 200){
                setServerError(null);

                let refreshedComments = [...comments];
                refreshedComments[editComment.commentindex].comment = editComment.comment;
                
                setComments(refreshedComments);

                setMode('create');    
                setNewComment('');
                console.log(response);
            }

           

        } catch (err) {
            setServerError(err.response.data.msg);
        }
    }

    return (

        <List>
            <Divider />
            {comments.map((c,index) => (
                <Comment comment={c} postOwner={props.postOwner} handleDelete={handleDelete}
                postID={props.postID} key={index} index={index} switchToEdit={switchToEdit}/> 
            ))}
            
            {auth.isLoggedIn && 
            <Box display="flex" flexDirection="column" width="100%" padding="16px">
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                    <Box display="block" width="100%">
                        <TextField
                        error={error ? true : false}
                        helperText={error ? error : null} 
                        variant="outlined"
                        label={mode === 'edit' ? "Edit Comment" : "New Comment"}
                        multiline
                        rows={4}
                        fullWidth
                        name="comment"
                        onChange={handleChange}
                        value={mode === 'edit' ? editComment.comment : newComment}/>
                    </Box>
                </Box>
                {serverError && 
                    <Box width="100%" marginTop="10px">
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                                {serverError}
                        </Alert>
                    </Box>
                    }
                <Box display="flex" justifyContent="center" marginTop="16px">
                    <Button variant="contained" color="primary"
                    onClick={mode === 'edit' ? handleEditComment : handleAddComment}>
                        {mode === 'edit' ? 'Edit comment' : 'Add comment'}
                    </Button>
                </Box>
            </Box>
            }

        </List>
     
    );
  };
export default CommentList;