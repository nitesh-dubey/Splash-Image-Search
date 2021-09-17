import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Text, Image } from '@chakra-ui/react';
import MainLayout from '../../components/MainLayout';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import axios from 'axios';

import usePhotoSearch from '../../hooks/usePhotoSearch';

const Photos = () => {
    const [images, setImages] = useState([]);


    const [ pageNumber, setPageNumber ] = useState(1);
    const {
        photos,
        loading,
        hasMore,
        error
    } = usePhotoSearch("", pageNumber, 20); 
    //Empty tag means that photos related to default tag will be sent from the server

    /*
    useEffect(() => {
        const fetchImgUrls = async () => {
            try {
                const res = await axios.get('https://picsum.photos/v2/list');
                // const res = await axios.get(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${encodeURIComponent('red roses')}`);
                // console.log(res.data.hits);
                // setImages(res.data.hits);
                setImages(res.data);

            } catch(err) {
                console.log(err); 
            }
        }
        fetchImgUrls();
    }, [])
    */

    return (
        <MainLayout>
            <Box maxW={{xl : "1100px"}} margin="0 auto">
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
            </Box>
        </MainLayout>
    );
}

export default Photos;