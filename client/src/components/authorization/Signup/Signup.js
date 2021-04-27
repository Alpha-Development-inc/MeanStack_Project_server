import { Box, Button, CircularProgress, Container, TextField } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { HowToReg } from '@material-ui/icons';
import React, { useState } from 'react';

const Signup = () => {

    const history = useHistory();
    const [signupData, setSignupData] = useState({
        email: '',
        username: '',
        password: '',
        password2: ''
    });
    const [errors, setErrors] = useState({});
    const [resultError, setResultError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    }

    const validateInput = async () => {
        let emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let inputErrors = {};

        if (signupData.email == '') {
            inputErrors.email = 'Please provide email';
        } else if (!signupData.email.match(emailPattern)) {
            inputErrors.email = 'Please provide valid email';
        }

        if (signupData.username == '') {
            inputErrors.username = 'Please provide username';
        }

        if (signupData.password == '') {
            inputErrors.password = 'Please provide password';
        }
        else if (signupData.password.length < 8){
            inputErrors.password = 'Password should be at least 8 symbols';
        }

        if (signupData.password2 !== signupData.password) {
            inputErrors.password2 = 'Passwords don\'t match';
        }

        if (inputErrors.email || inputErrors.username || inputErrors.password || inputErrors.password2){
            setErrors(inputErrors);
            return false;
        }

        setErrors({});
        return true;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formValid = await validateInput();

        if (!formValid){
            console.log('form is not valid');
            return;
        }

        console.log('form is valid');
    
        let config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        let data = {
            email: signupData.email,
            username: signupData.username,
            password: signupData.password,
        };
        try {
            setLoading(true);
            const response = await axios.post(
                process.env.REACT_APP_BACKEND_URL + 'auth/signup',
                data,
                config
            );

            if (response.status === 201) {
                history.push('/');
            }

        } catch (err) {
            setResultError(err.response.data.msg);
            setLoading(false);
        }
      };


    if (loading) return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100%">
        <CircularProgress size={80}/>
    </Box>
    )

    return (
        <Container component="main" maxWidth="xs">
            <div className="headContainer">
                <h1>SignUp friends!</h1>
                <form className="formLogin">
                    <TextField
                        error={errors.email ? true : false}
                        helperText={errors.email ? errors.email : null}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={signupData.email}
                        onChange={handleChange}
                        autoFocus
                    />

                    <TextField
                        error={errors.username ? true : false}
                        helperText={errors.username ? errors.username : null}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        value={signupData.username}
                        onChange={handleChange}
                    />

                    <TextField
                        error={errors.password ? true : false}
                        helperText={errors.password ? errors.password : null}
                        variant="outlined"
                        type="password"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        autoComplete="password"
                        value={signupData.password}
                        onChange={handleChange}
                    />

                    <TextField
                        error={errors.password2 ? true : false}
                        helperText={errors.password2 ? errors.password2 : null}
                        variant="outlined"
                        type="password"
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm Password"
                        name="password2"
                        autoComplete="password"
                        value={signupData.password2}
                        onChange={handleChange}
                    />

                    {resultError && 
                        <Box width="100%" marginTop="10px">
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                    {resultError}
                            </Alert>
                        </Box>
                    }

                    <Box display="flex" justifyContent="center" marginTop="20px">
                        <Button
                        size="large"
                        type="Submit"
                        variant="contained"
                        color="secondary"
                        endIcon={<HowToReg/>}
                        onClick={handleSubmit}
                        >Sign Up </Button>
                    </Box>

                </form>
            </div>
        </Container>
    );
};

export default Signup;

