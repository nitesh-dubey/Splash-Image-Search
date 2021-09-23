import React from 'react';
import { Flex } from '@chakra-ui/layout';
import LandingHeader from './LandingHeader';
import Head from 'next/head';
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';

const LandingLayout = ({children, ...restProps}) => {
    return (
        <Flex direction="column" maxW={{xl : "1400px"}} m="0 auto" {...restProps}>
            <Head>
                <title>Splash | Landing</title>
                <meta name="description" content="An Image Search Engine, where user can search for images based on it's tags" />
                <link rel="icon" href="/static/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest"></link>
            </Head>

            <LandingHeader />

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
                            <Image src="/images/github.png" alt="Github Logo" width={16} height={16} />
                        </span>
                    </Box>
                </a>
            </footer>
            
        </Flex>
    )
}

export default LandingLayout;