import React, { useContext, useEffect } from "react";
import { Box, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Typography} from '@material-ui/core';
import { Delete, Edit, MoreVert } from "@material-ui/icons";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";

const Comment = (props) => {

    const auth = useContext(AuthContext);

    const handleDelete = async (e) =>{
        e.preventDefault();

        let headers = {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
        };

        let data = {
            postID: props.postID,
            commentindex: props.index
        };

        try {
            const response = await axios.delete(
                process.env.REACT_APP_BACKEND_URL + 'comments',
                {
                    headers,
                    data
                }
            );

            if (response.status === 200){
                props.handleDelete(props.index);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const handleSwitchToEdit = () => {
        props.switchToEdit(props.comment.comment, props.index);
    }

    return (
        <Box width="100%">
            <ListItem>
                <Box display="flex" flexDirection="column" width="100%">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <ListItemText primary={
                        <Typography variant="h6">{props.comment.username}</Typography>}
                        secondary={new Date(props.comment.date).toDateString()} />

                        {auth.currentUser.userId === props.comment.userId &&
                            <IconButton aria-label="edit post" onClick={handleSwitchToEdit}>
                                <Edit />
                            </IconButton>
                        }

                        {(auth.currentUser.userId === props.comment.userId 
                        || auth.currentUser.userId === props.postOwner) &&
                            <IconButton aria-label="settings" onClick={handleDelete}>
                                <Delete />
                            </IconButton>
                        }
                    </Box>
                
                <Typography variant="body1" component="p">{props.comment.comment}</Typography>
                </Box>
            </ListItem>
            <Divider component="li"/>
        </Box>        
    );
};
export default Comment;