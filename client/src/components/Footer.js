import { Box, Typography } from '@material-ui/core';
import React from 'react';

const Footer = (props) => {

    return (
        <Box bgcolor="primary.main" color="primary.contrastText" display="flex"
        flexDirection="column" marginTop="20px">
            <Box display="flex" justifyContent="center" paddingTop="20px">
                <Box display="flex" flexDirection="column" color="inherit" paddingX="40px">
                    <Typography variant="subtitle1" color="inherit"
                    component="a" href="/posts">
                        Posts
                    </Typography>
                    <Typography variant="subtitle1" color="inherit"
                    component="a" href="/trending">
                        Trending
                    </Typography>
                    <Typography variant="subtitle1" color="inherit"
                    component="a" href="/createPost">
                        Create Post
                    </Typography>    
                </Box>
                <Box display="flex" flexDirection="column" color="inherit" paddingX="40px">
                    <Typography variant="subtitle1" color="inherit"
                    component="a" href="/categories">
                        Categories
                    </Typography>
                    <Typography variant="subtitle1" color="inherit"
                    component="a" href="/createCategory">
                        Create Category
                    </Typography>  
                </Box>
                <Box display="flex" flexDirection="column" color="inherit" 
                paddingX="40px">
                    <Typography variant="subtitle1" color="inherit"
                    component="a" href="/contactUs">
                        Contact Us
                    </Typography>
                </Box>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center" padding="10px">
                        <Typography variant="h6" align="center" gutterBottom>
                            FindUsThere
                        </Typography>
                        <Typography variant="subtitle1" align="center" color="inherit" component="p">
                            {'Copyright © Alpha Development Inc. 2021'}
                        </Typography> 
            </Box>
        </Box>
    );

};

export default Footer;