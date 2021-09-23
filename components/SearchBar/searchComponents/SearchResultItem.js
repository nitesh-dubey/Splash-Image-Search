import React from 'react';
import {
    Text,
    Box
} from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';

const SearchResultItem = React.memo((props) => {
    const { children, onSelectCB, setInput, setShowSearchResult } = props
    // console.log(children)

    const onClick = () => {
        onSelectCB(children);
        setInput(children);
        setShowSearchResult(false);
    }

    return (
        <Box
            w="100%"
            py="1"
            cursor="pointer"
            _hover={{
                backgroundColor : "gray.100"
            }}
            onClick={onClick}
        >
            <Box>
                <SearchIcon h={4} w={4} mx="2"/>
                {children}
            </Box>
        </Box>
    );
})
export default SearchResultItem;