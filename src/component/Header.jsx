import { Avatar, Box, Container, Flex, Heading } from '@chakra-ui/react';
import React from 'react';

const Header = () => {
    return (
        <Box
            h={"80px"}
            w={"100%"}
            bg={"white"}
            borderBottom={"1px solid"}
            borderColor={"blackAlpha.200"}
        >
            <Container maxW={"container.xl"} h={"full"}>
                <Flex h={"full"} alignItems={"center"} justifyContent={"space-between"}>
                    <Heading size={"lg"}>To do Tasks</Heading>
                    <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                </Flex>
            </Container>
        </Box>
    );
};

export default Header;