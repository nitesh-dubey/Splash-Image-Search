import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Text, Image } from '@chakra-ui/react';
import MainLayout from '../../components/MainLayout';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import axios from 'axios';
import { useRouter } from 'next/router';
import usePhotoSearch from '../../hooks/usePhotoSearch';

const Photos = () => {
    const router = useRouter();
    const { tag } = router.query;
    const [ heading, setHeading ] = useState();

    const [ pageNumber, setPageNumber ] = useState(1);
    const {
        photos,
        loading,
        hasMore,
        error
    } = usePhotoSearch(tag, pageNumber, 20);

    useEffect(() => {
        if(tag) {
            setHeading(tag.split(" ").map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(" "));
        }
    }, [tag])


    return (
        <MainLayout>
            <Box maxW={{xl : "1100px"}} margin="0 auto">
                <>
                    <Heading mt="8" mb="20" mx="5"> { heading } </Heading>
                    <ResponsiveMasonry columnsCountBreakpoints={{350 : 1, 720 : 2, 900 : 3}}>
                        <Masonry gutter="15px">
                            {
                                photos.length && 
                                photos.map((img, ind) => (
                                    <Box key={ind} width="100%" display="block">
                                        {/* <Image src={img.previewURL} width="100%" height="100%" rounded="lg"/> */}
                                        <Image src={img.previewURL} width="100%" height="100%" rounded="lg"/>
                                    </Box>
                                ))
                            
                            }
                        </Masonry>
                    </ResponsiveMasonry>
                </>
            </Box>
        </MainLayout>
    );
}

export default Photos