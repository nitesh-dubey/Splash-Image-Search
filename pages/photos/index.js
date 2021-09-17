import React, { useState, useRef, useCallback } from 'react';
import { Box, Flex, Heading, Text, Image } from '@chakra-ui/react';
import MainLayout from '../../components/MainLayout';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import axios from 'axios';

import usePhotoSearch from '../../hooks/usePhotoSearch';

const Photos = () => {

    const [ pageNumber, setPageNumber ] = useState(1);
    const {
        photos,
        loading,
        hasMore,
        error
    } = usePhotoSearch("", pageNumber, 20); 
    //Empty tag means that photos related to default tag will be sent from the server

    //Pagination
    const observer = useRef();
    const lastPhotoElementRef = useCallback(node => {
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        });
        if(node) observer.current.observe(node);

    }, [loading, hasMore])

   

    return (
        <MainLayout>
            <Box maxW={{xl : "1100px"}} margin="0 auto">
                <>
                    <Heading mt="8" mb="20" mx="5"> Welcome </Heading>
                    <ResponsiveMasonry columnsCountBreakpoints={{350 : 1, 720 : 2, 900 : 3}}>
                        <Masonry gutter="15px">
                            {
                                photos.length && 
                                photos.map((img, ind) => (

                                    ind === photos.length - 1
                                    ?
                                    (
                                    <Box ref={lastPhotoElementRef} key={ind} width="100%" display="block">
                                        <Image src={img.previewURL} width="100%" height="100%" rounded="lg"/>
                                    </Box>
                                    )
                                    :
                                    (
                                    <Box key={ind} width="100%" display="block">
                                        <Image src={img.previewURL} width="100%" height="100%" rounded="lg"/>
                                    </Box>
                                    )

                                ))
                            
                            }
                        </Masonry>
                    </ResponsiveMasonry>
                </>
            </Box>
        </MainLayout>
    );
}

export default Photos;