import { Box, Container, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
            navigate('/chats')
        }
    }, [navigate]);

    return (
        <Container>
            <Box
                d="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                p={2}
                bg={"white"}
                w={"100%"}
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
                text="black"
            >
                <Text fontSize={"4xl"} fontWeight="bold">Sanvad App</Text>
            </Box>
            <Box bg={"white"} w={"100%"} borderRadius="lg" borderWidth="1px">
                <Tabs variant='soft-rounded'>
                    <TabList m={"1em"}>
                        <Tab width={"50%"}>Login</Tab>
                        <Tab width={"50%"}>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Home