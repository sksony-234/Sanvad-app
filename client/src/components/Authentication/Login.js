import React from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"
import axios from 'axios';

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    // const handelClick = () => (setShow(!show));
    const submitHandler = async () => {
        setLoading(true);
        if (!password || !email) {
            toast({
                title: "Please fill all feilds",
                status: "warning",
                deration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );

            // console.log(JSON.stringify(data));
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/chats");
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };
    // useEffect(() => {

    // }, [navigate])

    return (
        <VStack spacing={"5px"}>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Your Email id'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder='Enter Your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width={"4.5re"}>
                        <Button height={"1.75rem"} size={"sm"} onClick={() => (setShow(!show))}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme={"blue"}
                width="100%"
                style={{ marginTop: "35px" }}
                onClick={submitHandler}
                isLoading={loading}
            >Sign Up</Button>
            <Button
                variant="solid"
                colorScheme={"red"}
                width="100%"
                style={{ marginTop: "10px" }}
                onClick={() => {
                    setEmail("guest@user.com");
                    setPassword("12345678");
                }}
            >Login as Guest User</Button>
        </VStack>
    )
}

export default Login