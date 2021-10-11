import React, {useState} from 'react';
import {
    Box,
    Image,
    useBreakpointValue,
    Tag,
    Skeleton,
    SkeletonText
} from '@chakra-ui/react';


String.prototype.capitalizeFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const ImageSkeleton = (props) =>  {
    const [height, setHeight] = useState(props.img.previewHeight) 
    return (
        <>
            <Skeleton  height={height*2} />
            <SkeletonText mt="3" noOfLines={1} />
        </>
    )
}

const ImageWrapper = React.forwardRef((props, ref) => {

    const { img } = props;
    const [tags, setTags] = useState(
        props
        .img
        .tags
        .split(",")
        .map(str => (str.trim().capitalizeFirst()))
    )
    const [imgLoaded, setImgLoaded] = useState(false);
    const scaleImage = useBreakpointValue({base : false, xl : true });

    const handleImgLoaded = () => setImgLoaded(true);

    return (
        ref ?
        (
            <Box ref={ref} width="100%" display="block" _hover={{ transform : scaleImage ? "scale(1.15)" : "none"}} transition="transform .3s">
                {
                    !imgLoaded &&
                    <ImageSkeleton img={props.img} />
                }
    
                <Image
                    src={img.previewURL}
                    width="100%"
                    height="100%"
                    rounded="lg"
                    _hover={{
                        cursor : "pointer"
                    }}
                    onLoad={handleImgLoaded}
                />
                {
                    imgLoaded &&
                    <Box display="inline-block" my="3">
                        {
                            tags.map((tag, ind) => (

                                <Tag key={ind} mx="2">
                                    {tag}
                                </Tag>
                            ))
                        }
                    </Box>
                }
                
            </Box>
        )
        :
        (
            <Box width="100%" display="block" _hover={{ transform : scaleImage ? "scale(1.15)" : "none"}} transition="transform .3s">
                {
                    !imgLoaded &&
                    <ImageSkeleton img={props.img} />
                }
                
                <Image
                    src={img.previewURL}
                    width="100%"
                    height="100%"
                    rounded="lg"
                    _hover={{
                        cursor : "pointer"
                    }}
                    onLoad={handleImgLoaded}
                />
                {
                    imgLoaded  &&
                    <Box display="inline-block" my="3">
                        {
                            tags.map((tag, ind) => (

                                <Tag key={ind} mx="2" >
                                    {tag}
                                </Tag>
                            ))
                        }
                    </Box>
                }
            </Box>
        )

    )
})

export default ImageWrapper;