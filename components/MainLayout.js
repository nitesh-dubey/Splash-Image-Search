import React from 'react';
import {
    Flex,
    Link,
    Box
} from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import NextImage from 'next/image';
import styles from '../styles/Home.module.css'


import MainHeader from './MainHeader';

const MainLayout = ({children, ...restProps}) => {
    return (
        <Flex direction="column" minH="100vh" maxW={{xl : "1400px"}} margin="0 auto" {...restProps}>
            <Head>
                <title>Splash | Main</title>
                <meta name="description" content="An Image Search Engine, where user can search for images based on it's tags" />
                <link rel="icon" href="/static/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest"></link>
            </Head>

            <MainHeader />

            <main>
                {children}
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://github.com/nitesh-dubey"
                    target="_blank"
                    rel="noopener noreferrer"
                    passhref="true"
                >
                    <Box d="flex" alignItems="baseline">
                        Visit My Github{' '}
                        <span className={styles.logo}>
                            <NextImage src="/images/github.png" alt="Github Logo" width={16} height={16} />
                        </span>
                    </Box>
                </a>
            </footer>

        </Flex>
    );
}

export default MainLayout;