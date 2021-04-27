import { Box, Button, Card, CardContent, CardHeader, FormGroup, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React, { useState } from 'react';

const ContactForm = (props) => {


    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [serverResponse, setServerResponse] = useState(null);

    const handleChange = (e) => {
        setMessage( {...message, [e.target.name] : e.target.value} );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log(message);

        let config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
        };

        try {
            setLoading(true);
            const response = await axios.post(
                process.env.REACT_APP_BACKEND_URL + 'messages',
                message,
                config
            );
            setLoading(false);

            console.log(response);

            if (response.status === 201){
                setServerResponse('success');
            }

        } catch (err) {
            console.log(err.response.data);
            setServerResponse('error');
        }
    }

    return (
        <Box width="60%" marginX="auto" marginTop="40px">
        <Card>
            <CardContent>
                <form>
                    <h2>Contact Us</h2>
                    {serverResponse === "success" && 
                        <Alert severity="success">Message was successfully created</Alert>
                    }
                    {serverResponse === 'error' && 
                        <Alert severity="error">Something is wrong with creating message</Alert>
                    }
                    <hr/>
                    <Box display="flex" flexDirection="row" alignItems="center"
                     width="80%" marginTop="20px">
                        <Typography variant="h6">Name:</Typography>
                        <Box marginLeft="10px">
                            <TextField required variant="outlined" label="Name" size="small"
                                name="name" onChange={handleChange} value={message.name}/>
                        </Box>
                    </Box>

                    <Box display="flex" flexDirection="row" alignItems="center"
                     width="80%" marginTop="20px">
                        <Typography variant="h6">Email:</Typography>
                        <Box marginLeft="10px">
                            <TextField required type= "email" variant="outlined" label="Email" size="small"
                                name="email" onChange={handleChange} value={message.email}/>
                        </Box>
                    </Box>

                    <Box display="flex" flexDirection="column" alignItems="flex-start" marginTop="30px">
                        <Typography variant="h6">Message:</Typography>
                        <Box display="block" marginTop="10px" width="100%">
                            <TextField variant="outlined" label="Message" multiline rows={4} fullWidth
                                name="message" onChange={handleChange} value={message.message}/>
                        </Box>
                    </Box>

                    <Box display="flex" justifyContent="center" marginTop="40px">
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Send</Button>
                    </Box>

                </form>
                

            </CardContent>
        </Card>
        </Box>
    );

}

export default ContactForm;