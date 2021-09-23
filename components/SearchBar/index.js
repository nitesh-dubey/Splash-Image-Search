import React, { useState, useCallback, useEffect } from 'react';
import {
    Box,
    Flex,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Input,
    VStack
} from '@chakra-ui/react'
import {
    CloseIcon,
    HamburgerIcon as MenuIcon,
    SearchIcon,
} from '@chakra-ui/icons'
import SearchResults from './searchComponents/SearchResults';
import useDebounce from './searchHooks/useDebounce';

const SearchBar = ({placeholder, inputDebounce, items, onSearch, onSelect}) => {
    const [input, setInput] = useState('');
    const [ showSearchResult, setShowSearchResult ] = useState(false);
    
    const handleInputChange = (event) => setInput(event.target.value);
    const clearInput = () => setInput('');

    const searchFocussed = (event) => {
        if(!showSearchResult) setShowSearchResult(true);
    }
    const searchBlurred = (event) => {
        //If anything outside searchbar parent is clicked then hide search result
        if(!event.currentTarget.contains(event.relatedTarget)) {
            if(showSearchResult) setShowSearchResult(false);
        }
    }



    const onSelectCB = useCallback(onSelect, []);

    const onSearchDebounced = useCallback(useDebounce(onSearch, inputDebounce), []);
    
    useEffect(() => {
        if(showSearchResult) onSearchDebounced(input);
    }, [input, showSearchResult])


    /*
    const[ taglist, setTaglist ] = useState([
        {key : 0, value : 'Nature'},
        {key : 1, value : 'Environment'},
        {key : 2, value : 'Sea'},
        {key : 3, value : 'River'},
        {key : 4, value : 'Water'},
    ]);
    */

    return (
        <Box
            w="100%"
            position="relative"
            zIndex="999"
            rounded="full"
            tabIndex="-1"
            onFocus={searchFocussed}
            onBlur={searchBlurred}
            
        >
            <InputGroup 
                rounded="full"
                borderColor="gray.300"
            >
                <InputLeftElement pointerEvents="none" pl="2" >
                    <SearchIcon color="gray.300"/>
                </InputLeftElement>
                
                <Input
                    type="text"
                    placeholder={placeholder}
                    rounded="full"
                    color="gray.600"
                    shadow="base"
                    _hover={{ shadow : "lg" }}
                    _focus={{ shadow : "lg" }}
                    value={input}
                    onChange={handleInputChange}

                />
                
                {
                    input.length &&
                    <InputRightElement pr="2">
                        <CloseIcon 
                            h="0.8rem" 
                            color="gray.300"
                            _hover={{ cursor : 'pointer'}}
                            onClick={clearInput}
                        />
                    </InputRightElement>
                }
            </InputGroup>

            {
                showSearchResult && 
                <SearchResults
                    resultKeyString="value"
                    results={items}
                    onSelectCB={onSelectCB}
                    setInput={setInput}
                    setShowSearchResult={setShowSearchResult}
                />
            }
            
        </Box>
    )
}

export default SearchBar;