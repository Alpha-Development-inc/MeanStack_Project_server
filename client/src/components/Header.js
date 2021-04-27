import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import AuthContext from '../contexts/AuthContext';
import { useHistory } from 'react-router';
import { AccountCircle, Class, ContactMail, CreateNewFolder, Folder, Mms, PostAdd, Whatshot } from '@material-ui/icons';
import DimensionContext from '../contexts/DimensionContext';

const Header = (props) => {

    const auth = useContext(AuthContext);
    const widthFromContext = useContext(DimensionContext);
    const history = useHistory();

    const [openMenu, setOpenMenu] = useState(false);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(widthFromContext);
    },[widthFromContext])

    const handleLogOut = () => {
        auth.logout();
        history.push('/');
    }

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }

    const links = [
        {
            link: '/posts',
            text: 'Posts',
            image: <Mms/>
        },
        {
            link: '/createPost',
            text: 'Create Post',
            image: <PostAdd/>
        },
        {
            link: '/categories',
            text: 'Categories',
            image: <Folder/>
        },
        {
            link: '/contactUs',
            text: 'Contact Us',
            image: <ContactMail/>
        },
        {
            link: '/browse',
            text: 'Browse',
            image: <ContactMail/>
        },
        {
            link: '/trending',
            text: 'Trending',
            image: <Whatshot/>
        },
        {
            link: '/createCategory',
            text: 'Create Category',
            image: <CreateNewFolder/>
        },
    ];

    const authLinks = [
        {
            link: "/user/" + auth.currentUser.userId,
            text: auth.currentUser.username,
            icon: <AccountCircle/>,
            authRequired: true
        },
        {
            action: handleLogOut,
            text: 'Logout',
            authRequired: true
        },
        {
            link: "/",
            text: 'Login',
            authRequired: false
        },
        {
            link: "/signup",
            text: 'Signup',
            authRequired: false
        },
    ];

    return (
        <div>
            <AppBar position="static" className="header">
                <Toolbar>
                    {width < 1023 && 
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
                        <MenuIcon/>
                    </IconButton>
                    }
                    <Drawer anchor="left" open={openMenu} onClose={toggleMenu}>
                    <div
                    role="presentation"
                    onClick={toggleMenu}
                    onKeyDown={toggleMenu}
                    >
                        <List>
                        {links.map((l) => (
                            <ListItem button component="a" href={l.link} key={l.text}>
                            <ListItemIcon>{l.image}</ListItemIcon>
                            <ListItemText primary={l.text} />
                            </ListItem>
                        ))}
                        </List>
                        {/* <Divider />
                        <List>
                        {authLinks.map((al) => (
                            <div>
                            {auth.isLoggedIn === al.authRequired &&
                            <ListItem button key={al.text}>
                            {al.icon && <ListItemIcon>{al.icon}</ListItemIcon>}
                            <ListItemText primary={al.text} />
                            </ListItem>
                            }
                            </div>
                        ))}
                        </List> */}
                    </div>
                    </Drawer>
                    <Typography variant="h6" className="header">
                        FindUsThere
                    </Typography>

                    <span className="spacer"/>

                    {width >= 1023 &&
                    <Box>
                    {links.map((l,index) => (
                        <Button color="inherit" href={l.link} key={index}>{l.text}</Button>
                    ))}
                    </Box>
                    }
                    {/* <Button color="inherit" href="/posts">Posts</Button>
                    <Button color="inherit" href="/createPost">Create Post</Button>
                    <Button color="inherit" href="/categories">Categories</Button>
                    <Button color="inherit" href="/contactUs">Contact Us</Button>
                    <Button color="inherit" href="/browse">Browse</Button>
                    <Button color="inherit" href="/trending">Trending Posts</Button>
                    <Button color="inherit" href="/createCategory">Create Category</Button> */}

                    <span className="spacer"/>

                    {authLinks.map((al) => (
                        <div key={al.text}>
                            {auth.isLoggedIn === al.authRequired &&
                                <Button
                                    color="inherit"
                                    startIcon={al.icon ? <AccountCircle/> : null}
                                    href={al.link ? al.link : null}
                                    onClick={al.action ? al.action : null}
                                >
                                    {al.text}
                                </Button>
                            }
                        </div>
                    ))

                    }
                    {/* {auth.isLoggedIn &&
                        <Box>
                            <Button
                                color="inherit"
                                startIcon={<AccountCircle/>}
                                href={"/user/" + auth.currentUser.userId}
                            >
                                {auth.currentUser.username}
                            </Button>
                            <Button color="inherit" onClick={handleLogOut}>Logout</Button>
                        </Box>
                    }
                    {!auth.isLoggedIn &&
                        <Box>
                            <Button color="inherit" href="/">Login</Button>
                            <Button color="inherit" href="/signup">Signup</Button>
                        </Box>
                    } */}
                </Toolbar>
            </AppBar>
        </div>
    );

};

export default Header;