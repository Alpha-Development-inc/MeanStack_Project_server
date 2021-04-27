import React, { useContext, useState } from 'react';
import { Box, Button, CircularProgress, Container, TextField } from '@material-ui/core';
import { SendOutlined } from '@material-ui/icons';
import './Login.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../../contexts/AuthContext';
import { Alert, AlertTitle } from '@material-ui/lab';

const Login = () => {

    const history = useHistory();
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [resultError, setResultError] = useState(null);
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    const validateInput = async () => {
        let emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let inputErrors = {};

        if (loginData.email == '') {
            inputErrors.email = 'Please provide email';
        } else if (!loginData.email.match(emailPattern)) {
            inputErrors.email = 'Please provide valid email';
        }

        if (loginData.password == '') {
            inputErrors.password = 'Please provide password';
        }

        if (inputErrors.email || inputErrors.password){
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
            return;
        }
    
        let config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        let data = {
            email: loginData.email,
            password: loginData.password,
        };
        try {
            setLoading(true);
            const response = await axios.post(
                process.env.REACT_APP_BACKEND_URL + 'auth/login',
                data,
                config
            );

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('username', response.data.username);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('expiration', expirationDate.toISOString());
                auth.login();
                history.push('/posts');
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
                <h1>LogIn friends!</h1>
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
                        value={loginData.email}
                        onChange={handleChange}
                        autoFocus
                    />

                    <TextField
                        error={errors.password ? true : false}
                        helperText={errors.password ? errors.password : null}
                        variant="outlined"
                        type="password"
                        margin="normal"
                        required
                        fullWidth
                        id="loginPassword"
                        label="Password"
                        name="password"
                        autoComplete="password"
                        value={loginData.password}
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
                        endIcon={<SendOutlined/>}
                        onClick={handleSubmit}
                        >Log In </Button>
                    </Box>
                    
                    
                </form>
            </div>
        </Container>
    );
};


export default Login;

