import React, { useState, useRef, useCallback } from 'react';
import { Box, Flex, Heading, Text, Image, Skeleton, SkeletonText } from '@chakra-ui/react';
import MainLayout from '../../components/MainLayout';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import ImageWrapper from '../../components/ImageWrapper';
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
                                        <ImageWrapper ref={lastPhotoElementRef} key={ind} img={img} />
                                    )
                                    :
                                    (
                                        <ImageWrapper key={ind} img={img} />
                                    )

                                ))
                            
                            }
                            {
                                hasMore && loading &&
                                [...Array(20).keys()].map(ind => {
                                    return (
                                        <Box key={ind} padding="2">
                                            <Skeleton height={200} />
                                            <SkeletonText mt={3} noOfLines={2} />
                                        </Box>
                                    )
                                })
                            }
                        </Masonry>
                    </ResponsiveMasonry>
                </>
            </Box>
        </MainLayout>
    );
}

export default Photos;