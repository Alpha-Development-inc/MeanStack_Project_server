import React, { useContext, useEffect, useState } from "react";
import { Badge, Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@material-ui/core';
import { Bookmark, ChatBubble, Delete, Edit, Favorite, MoreVert } from "@material-ui/icons";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import MapDialog from "../maps/MapDialog";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import { useHistory } from "react-router";
import CommentList from "../comments/CommentList";
import { Link } from "react-router-dom";
import DimensionContext from "../../contexts/DimensionContext";

const Post = (props) => {

  const auth = useContext(AuthContext);
  const width = useContext(DimensionContext);
  const history = useHistory();

  const [openMap, setOpenMap] = useState(false);
  const [likedByUser, setLikedByUser] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);


  useEffect(() => {
    setNumOfLikes(props.post.likes.length);
  },[props]);

  useEffect(() => {
    const like = props.post.likes.find(l => l.userId == auth.currentUser.userId);
    if(like){
      setLikedByUser(true);
    }

  },[]);

  const handleOpenMap = () => {
    setOpenMap(true);
  }

  const handleCloseMap = () => {
    setOpenMap(false);
  }

  const handleShowComments = () => {
    setShowComments(!showComments);
    store.addNotification({
      title: 'Favourite !',
      message: 'Someone Favourited your post',
      type: 'success',                         // 'default', 'success', 'info', 'warning'
      container: 'bottom-left',                // where to position the notifications
      animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
      dismiss: {
        duration: 3000
      }
    })
  }

  const handleDelete = async () => {


    let headers = {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token')
    };

    let data = {
        id: props.post._id
    };

    try {
      const response = await axios.delete(
        process.env.REACT_APP_BACKEND_URL + 'posts',
        {
            headers,
            data
        }
      );

      if (response.status === 204){
        props.handleDelete(props.post._id);
      }
      console.log(response);

    } catch (err) {
        console.log(err.response.data);
    }
  }


  const handleLike = async () => {

    if (!auth.isLoggedIn){
      history.push('/');
      return;
    }

    setLikedByUser(!likedByUser);
    if (!likedByUser) {
      setNumOfLikes(numOfLikes + 1);
    }
    else{
      setNumOfLikes(numOfLikes - 1);
    }
    let config = {
      headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
      },
    };

    let data = {
        postID: props.post._id
    };

    try {
        const response = await axios.post(
            process.env.REACT_APP_BACKEND_URL + 'posts/likePost',
            data,
            config
        );

        console.log(response);

    } catch (err) {
        console.log(err.response.data);
    }

    store.addNotification({
      title: 'Liked !',
      message: 'Someone Like your post',
      type: 'default',                         // 'default', 'success', 'info', 'warning'
      container: 'bottom-left',                // where to position the notifications
      animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
      dismiss: {
        duration: 3000
      }
    })
  }

    return (
      <Box width="100%">
        <MapDialog open={openMap} close={handleCloseMap}
        location={{lat: props.post.lat, lng: props.post.lng}}/>
        <Box width={width < 1023 ? "100%" : "40%"}
        padding={ width < 1023 ? "16px" : "0"}
        marginTop="20px" marginX="auto">
          
            <Card>
                <CardHeader
                  action={
                    <Box>
                      {auth.currentUser.userId === props.post.userId &&
                        <Box>
                          <IconButton aria-label="edit post" href={"/createPost/" + props.post._id}>
                              <Edit />
                          </IconButton>
                          <IconButton aria-label="settings" onClick={handleDelete}>
                            <Delete />
                          </IconButton>
                        </Box>
                      }
                    </Box>
                  }
                  title={props.post.title}
                  subheader={
                    <Box className="post-subheader" onClick={handleOpenMap}>
                      {props.post.place}, {props.post.country}
                    </Box>
                  }
                />
                {(props.post.image != null) &&
                  <Box width="100%">
                    <img src={props.post.image.url} alt="content" className="responsive-image"/>
                  </Box>
                }
                
                <CardContent className="no-bottom-padding">
                    <Typography variant="h6" component="div" gutterBottom>{props.post.category}</Typography>
                    <Typography>
                        {props.post.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="like" 
                    color={likedByUser ? "secondary" : "default"}
                    onClick={handleLike}>
                      <Badge badgeContent={numOfLikes} color="default">
                        <Favorite/>
                      </Badge>
                    </IconButton>
                    <IconButton aria-label="comment post"
                    onClick={handleShowComments}>
                        <ChatBubble/>
                    </IconButton>
                    <span className="spacer"/>
                    <Typography variant="body1" component="div" color="textSecondary">
                      {new Date(props.post.publicDate).toDateString()},
                      by <Link className="user-link" to={"/user/" + props.post.userId}>{props.post.username}</Link>
                    </Typography>
                </CardActions>
                {showComments &&
                <CommentList postOwner={props.post.userId} postID={props.post._id}
                comments={props.post.comments}/>
                }
            </Card>
        </Box>
        </Box>
        
     
    );
  };
export default Post;