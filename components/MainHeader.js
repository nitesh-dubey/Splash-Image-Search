import React, { useState, useRef } from 'react';
import {
    Box,
    Center,
    Flex,
    Heading,
    Link,
    Icon,
    Text,
    Button,
    useToast,
    useBreakpointValue,
    Input,
    InputGroup,
    InputRightElement,
    chakra
} from '@chakra-ui/react';
import {
    CloseIcon,
    HamburgerIcon as MenuIcon,
    SearchIcon
} from '@chakra-ui/icons'
import { MdPhotoCamera as Logo } from "react-icons/md";
import NextLink from 'next/link';
import { useWindowSize } from '../hooks/useWindowSize';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
const AutocompleteSearch = chakra(ReactSearchAutocomplete);

const MenuItem = ({children, isLast, to, isButton ,...rest}) => {
    return (
        <Text
            mb={{base : isLast ? 0 : 8, sm : 0}}
            mr={{base : 0, sm : isLast ? 0 : 8}}
            display="block"
            fontWeight="bold"
            color="teal.500"
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


const MainHeader = (props) => {
    const [ showMenu, setShowMenu ] = useState(false);
    const toggleMenu = () => setShowMenu(prev => !prev);
    const toast = useToast();
    // const isMobileView = useBreakpointValue({base : true, md : false});
    // const showDesktopSearchBar = useBreakpointValue({base : false, lg : true});
    //const isMobileView = useBreakpointValue([true, true, false, false]);
    const showDesktopSearchBar = useBreakpointValue([false, false, true, true]);
    const showLogo = useBreakpointValue([false, false, false, true]);
    const showHomeButton = useBreakpointValue([true, true, false, true]);
    const windowSize = useWindowSize();



    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            bg={["white", "white", "white", "white"]}
            color={["white", "white", "teal.500", "teal.500"]}
            wrap="wrap"
            p={[3,3,4,4]}
            mb={[3,3,5,5]}
            borderBottomRadius="md"
            shadow="sm"
            position="relative"
            {...props}
        >
            <Flex align="center">
                <Icon as={Logo} h={8} w={8} color={["black", "black", "teal", "teal"]} />
                {
                    showLogo &&
                    <Heading as="h1" size="lg" mx={4} fontSize="lg">
                        Splash
                    </Heading>
                }
            </Flex>

            {showDesktopSearchBar &&
                <Box mx={2} width="41%">
                    <AutocompleteSearch
                        placeholder="Search Images..." 
                        items={[
                            {id : 0, name : "Nature"},
                            {id : 1, name : "Dog"},
                            {id : 2, name : "sunset"}
                        ]}
                        onSearch={(string, res) => {}}
                        onHover={(res) => {}}
                        onSelect={() => {}}
                        formatResult={(item)=> <p>{item}</p>}
                        autoFocus
                    />
                </Box>
            }
            {!showDesktopSearchBar &&
                <Box mx={2} w="72%">
                    <AutocompleteSearch
                        placeholder="Search Images..." 
                        items={[
                            {id : 0, name : "Nature"},
                            {id : 1, name : "Dog"},
                            {id : 2, name : "sunset"}
                        ]}
                        onSearch={(string, res) => {}}
                        onHover={(res) => {}}
                        onSelect={() => {}}
                        formatResult={(item)=> <p>{item}</p>}
                        autoFocus
                    />
                </Box>
            }

            <Box
                display={{base : "block", md : "none"}}
                onClick={toggleMenu}
                _hover={{
                    cursor : "pointer"
                }}

            >
                {showMenu ? <CloseIcon h={6} w={6} color="black"/> : <MenuIcon h={7} w={7} color = "black"/>}

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
                    {showHomeButton && <MenuItem to="/">Home</MenuItem>}
                    <MenuItem to="/">My&nbsp;Photos</MenuItem>
                    <MenuItem to="/">Upload&nbsp;New</MenuItem>
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
    );
}

export default MainHeader