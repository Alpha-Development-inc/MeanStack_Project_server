import {palette, FormLabel,Box, Button, Card, CardContent, CircularProgress, FormControl, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React, {  useContext,useEffect, useRef, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const CreateCategory = (props) => {

    const [category, setCategory] = useState({
        header: '',
        description: '',
        image: '',
    });
    const history = useHistory();
    const [image, setImage] = useState(null);
    const fileInputRef = useRef();
    const [focus, setFocus] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setCategory( {...category, [e.target.name] : e.target.value} );
    };
    const auth = useContext(AuthContext);
    const validateInput = async () => {
        let inputErrors = {};
        if (!category.image){
            inputErrors.image = 'Please put image ';
        }
        if (!auth.isLoggedIn){
            inputErrors.login = 'Please Log in ';
        }
        if (category.header == '') {
            inputErrors.header = 'Please provide header';
        } 

        if (category.description.length < 10) {
            inputErrors.description = 'Please provide description longer than 10 characters';
        }

        if (inputErrors.header || inputErrors.password || inputErrors.login){
            
            setErrors(inputErrors);
            return false;
        }

        setErrors({});
        return true;

    }

    const readFileAsync = (file) => {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.readAsDataURL(file)
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
        })
    }

    useEffect(() => {
        //Converting image to base64 string
        const imageToBase64 = async() => {
            if (image){
                const imageString = await readFileAsync(image);
                setCategory( {...category, image : imageString} );
            }
        }
        imageToBase64();

    }, [image]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formValid = await validateInput();
        if (!formValid){
            return;
        }
        console.log(category);
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
        };
        try {
            setLoading(true);
            const response = await axios.post(
                process.env.REACT_APP_BACKEND_URL + 'categories',
                category,
                config
            );
            setLoading(false);
            if (response.status === 200) {
                //redirecting to categories page
                history.push('/categories');
            }
            console.log(response);

        } catch (err) {
            console.log(err.response.data);
        }

        
    }
    //functions for image
    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDragEnter = (e) => {
        e.preventDefault();
        setFocus(true);
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        setFocus(false);
    }

    const handleFileDrop = (e) => {
        e.preventDefault();
        setImage(e.dataTransfer.files[0]);
    }

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const fileSelected = () => {
        setImage(fileInputRef.current.files[0]);
    }

    if (loading) return (
        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
          <CircularProgress size={80}/>
        </Box>
    )

    return (
        <Box width="60%" marginX="auto" marginTop="40px">
        <Card>
            <CardContent>
                
                    <h2>Create New Category</h2>
                    <hr/>
                    {!auth.isLoggedIn &&
                        <Box color="secondary.main">
                        ** Please login first 
                        </Box>
                    }
                    <Box   display="flex" flexDirection="row" alignItems="center"
                     width="80%" marginTop="20px">
                        <Typography variant="h6">Category Header:</Typography>
                        <Box marginLeft="10px">
                            <TextField  error={errors.header ? true : false}
                        helperText={errors.header ? errors.header : null} required variant="outlined" label="Category" size="small"
                                name="header" onChange={handleChange} value={category.header}/>
                        </Box>
                    </Box>

                    <Box marginTop="20px">
                        <Typography variant="h6">Picture:</Typography>
                    
                        <Box width="100%" height="100px" marginTop="10px" display="flex" justifyContent="center" alignItems="center"
                        className={(focus) || (image) ? 'dropzone-focused' : 'dropzone'} onClick={fileInputClicked}
                        onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleFileDrop}
                        onDragOver={handleDragOver}>
                            {(image) &&
                                <div>{image.name}</div>
                            }
                            {(!image) && 
                                <div>Drop Image here or click to Upload</div>
                            }
                        </Box>
                        {errors.image &&
                            <Box color="secondary.main">
                                ** Please put image
                            </Box>
                        }
                        <Box display="none">
                            <input ref={fileInputRef} type="file" onChange={fileSelected}/>
                        </Box>
                    </Box>

                    <Box display="flex" flexDirection="column" alignItems="flex-start" marginTop="30px">
                        <Typography variant="h6">Description:</Typography>
                        <Box display="block" marginTop="10px" width="100%">
                            <TextField  error={errors.description ? true : false}
                        helperText={errors.description ? errors.description : null} variant="outlined" label="Description" multiline rows={4} fullWidth
                                name="description" onChange={handleChange} value={category.description}/>
                        </Box>
                    </Box>
                   
                    <Box display="flex" justifyContent="center" marginTop="40px">
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
                    </Box>

            </CardContent>
        </Card>
        </Box>
    );

}

export default CreateCategory;