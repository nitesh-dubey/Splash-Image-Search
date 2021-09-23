import React from 'react';
import {
    VStack,
    Box
} from '@chakra-ui/react';
import SearchResultItem from './SearchResultItem';

const SearchResults = React.memo((props) => {
    const { resultKeyString, results, onSelectCB, setInput, setShowSearchResult } = props;
    // console.log(props);

    return (
        <VStack
            w="100%"
            position="absolute"
            top="42"
            zIndex="999"
            backgroundColor="white"
            border="1px solid gray.600"
            shadow="2xl"
            align="flex-start"
            spacing="0.5"
            borderTopRadius="lg"
            borderBottomRadius="2xl"
            p="3"
            color="gray.600"
        >
            {
                results.map((item, ind) => {
                    return (
                        <SearchResultItem key={item.key} onSelectCB={onSelectCB} setInput={setInput} setShowSearchResult={setShowSearchResult}>
                            {item[resultKeyString]}
                        </SearchResultItem>
                    )
                })
            }
        </VStack>
    );
});


SearchResults.displayName = 'SearchResults';

export default SearchResults;