import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pics, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    // const handelClick = () => (setShow(!show));
    // const postDetails = (pic) => {
    //     setLoading(true);
    //     if (pic === undefined) {
    //         toast({
    //             title: 'Account created.',
    //             description: "We've created your account for you.",
    //             status: 'warning',
    //             duration: 5000,
    //             isClosable: true,
    //         })
    //         return;
    //     }

    //     if (pic.type === "image/jpeg" || pic.type === "image/png") {
    //         const data = new FormData();
    //         data.append("file", pic);
    //         data.append("upload_preset", "chat-app");
    //         data.append("cloud_name", "sanvad-app");
    //         fetch("https://res.cloudinary.com/sanvad-app/image/upload", {
    //             method: "post",
    //             body: data,
    //         }).then((res) => res.json())
    //             .then((data) => {
    //                 setPic(data.url.toString());
    //                 setLoading(false);
    //             }).catch((err) => {
    //                 console.log(err);
    //                 setLoading(false);
    //             })
    //     } else {
    //         toast({
    //             title: 'Account created.',
    //             description: "We've created your account for you 2.",
    //             status: 'warning',
    //             duration: 5000,
    //             isClosable: true,
    //         });
    //         setLoading(false);
    //         return;
    //     }
    // }

    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "sid-spny");
            fetch("https://res.cloudinary.com/sid-sony/image/upload/", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    };
    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !confirmPassword) {
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
        if (password !== confirmPassword) {
            toast({
                title: "Password ans Confirm Password should be same",
                status: "warning",
                deration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post("api/user", { name, email, password, pics }, config);
            toast({
                title: "Registratoin Successfull",
                status: "success",
                deration: 5000,
                isClosable: true,
                position: "bottom",
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate('/chats');
        } catch (error) {
            toast({
                title: "Error Occured",
                description: error.response.data.message,
                status: "error",
                deration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    }
    return (
        <VStack spacing={"5px"}>
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter Your Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Your Email id'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder='Enter Your Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width={"4.5re"}>
                        <Button height={"1.75rem"} size={"sm"} onClick={() => (setShow(!show))}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="confirnPassword" isRequired>
                <FormLabel>Confirn Password</FormLabel>
                <InputGroup>
                    <Input
                        type={"password"}
                        placeholder='Confirm Your Password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width={"4.5re"}>
                        <Button height={"1.75rem"} size={"sm"} onClick={() => (setShow(!show))}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="pic">
                <FormLabel>Upload your pic</FormLabel>
                <Input
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>
            <Button
                colorScheme={"blue"}
                width="100%"
                style={{ marginTop: "35px" }}
                onClick={submitHandler}
                isLoading={loading}
            >Sign Up</Button>
        </VStack>
    )
}

export default Signup