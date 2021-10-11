import React, { useState } from 'react';
import {
    Box,
    Button,
    Center,
    Flex,
    Text,
    useToast,
    Link,
    Icon,
    Heading
} from '@chakra-ui/react';
import {
    CloseIcon,
    HamburgerIcon as MenuIcon
} from '@chakra-ui/icons'
// import Image from 'next/image';
import NextLink from 'next/link';
import { MdPhotoCamera as Logo } from "react-icons/md";

const MenuItem = ({children, isLast, to, isButton, ...rest}) => {
    return (
        <Text
            mb={{base : isLast ? 0 : 8, sm : 0}}
            mr={{base : 0, sm : isLast ? 0 : 8}}
            display="block"
            fontWeight="bold"
            {...rest}
        >
            {
                isButton ?

                children :

                <NextLink href={to} passHref>
                    <Link target="_blank" _hover={{textDecoration : "none"}}>{children}</Link>
                </NextLink>

            }

        </Text>
    )
}


const LandingHeader = (props) => {

    const [ showMenu, setShowMenu ] = useState(false);
    const toggleMenu = () => setShowMenu(prev => !prev);

    //Mock Signin Toast
    const toast = useToast();

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            mb={[3, 3, 5, 5]}
            p={[3, 3, 5, 5]}
            bg={["teal.500", "teal.500", "transparent", "transparent"]}
            color={["white", "white", "teal.500", "teal.500"]}
            borderBottomRadius="md"
            shadow="sm"
            {...props}
        >
            <Center>
                {/* <Image 
                    src="/images/logo.png"
                    alt="Website Logo"
                    width={40}
                    height={40}
                    color={["white", "white", "gray.500", "gray.500"]}
                    backgroundColor={["white", "white", "gray.500", "gray.500"]}
                /> */}
                <Icon as={Logo} h={10} w={10} />
                <Heading as="h1" size="lg" mx={4}>
                    Splash
                </Heading>
            </Center>
            
            <Box
                display={{base : "block", md : "none"}}
                onClick={toggleMenu}
                _hover={{
                    cursor :"pointer"
                }}
            >
                {showMenu ? <CloseIcon h={8} w={8} /> : <MenuIcon h={7} w={7} /> }

            </Box>

            <Box
                display={{base : showMenu ? "block" : "none", md : "block"}}
                flexBasis={{base : "100%", md : "auto"}}
            >
                <Flex
                    direction={["column", "row", "row", "row"]}
                    align={["center", "center", "center", "center"]}
                    justify={["center", "space-between", "flex-end", "flex-end"]}
                    pt={[4, 4, 0, 0]}
                >
                    <MenuItem to="https://github.com/nitesh-dubey/Splash-Image-Search">Repository</MenuItem>
                    <MenuItem to="https://www.linkedin.com/in/niteshdubey300/">Linkedin</MenuItem>
                    <MenuItem to="https://nitesh-dubey.netlify.app/">My&nbsp;Portfolio</MenuItem>
                    <MenuItem isButton>
                        <Button
                            size="md"
                            rouded="md"
                            bg={["white", "white", "teal.500", "teal.500"]}
                            color={["teal.500", "teal.500", "white", "white"]}
                            _hover={{
                                bg : [
                                    "teal.100",
                                    "teal.100",
                                    "teal.600",
                                    "teal.600"
                                ]
                            }}
                            onClick={() => toast({
                                title : "Signed In",
                                description : "You have Signed in to the website and can perform protected Actions",
                                status : "success",
                                duration : 5000,
                                isClosable : true,
                            })}
                        >
                            Login
                        </Button>
                    </MenuItem>

                </Flex>

            </Box>
     
        </Flex>
    )
}

export default LandingHeader;