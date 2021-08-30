import React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import MainLayout from '../../components/MainLayout';

const Main = () => {
    return (
        <MainLayout>
            <Flex minH="70vh" direction="column" align="center" justify="center">
                <Heading as="h1">Hello World</Heading>
            </Flex>
        </MainLayout>
    );
}

export default Main;