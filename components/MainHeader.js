import React, { useState, useRef, useEffect } from 'react';
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
import { useRouter } from 'next/router';
import { useWindowSize } from '../hooks/useWindowSize';
// import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import SearchBar from '../components/SearchBar';
import getAutoCompleteTags from '../utils/getAutocompleteTags';


// const AutocompleteSearch = chakra(ReactSearchAutocomplete);

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
    //const windowSize = useWindowSize();

    const [autocompleteItems, setAutocompleteItems] = useState([]);
    const router = useRouter();


    const handleOnSearch = async (query) => {
        try{
            let tagObjs = await getAutoCompleteTags(query);
            // console.log("tagObjs : \n", tagObjs);
            let tags = [], ind = 0, queryPresent = false;

            for(let tag of tagObjs) {
                if(tag.word === query) queryPresent = true;
                tags.push({
                    key : ind++,
                    value : tag.word
                })
            }
            if(query && !queryPresent) tags.unshift({
                key : ind,
                value : query,
            });
            setAutocompleteItems(tags);
        } catch(err) {
            console.log(err);
        }
    }

    const handelOnSelect = (query) => router.push(`/photos/${query}`);


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
            position="sticky"
            top="0"
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


            {
                <Box mx={2} width={["72%", "72%", "41%", "41%"]}>
                    <SearchBar
                        placeholder="Search Images..." 
                        inputDebounce={400}
                        items={autocompleteItems}
                        onSearch={handleOnSearch}
                        onSelect={handelOnSelect}
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