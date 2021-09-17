import styles from '../styles/Home.module.css'
import LandingLayout from '../components/LandingLayout';
import {
  Box,
  Center,
  Text,
  Flex,
  Heading,
  Link,
  Button,
  Stack,
  Image,
  chakra
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Home() {
  return (
    <LandingLayout>
        <Flex
          minH="70vh"
          direction={{base : "column-reverse", md : "row"}}
          align="center"
          justify={{base : "center", md : "space-around", xl : "space-between"}}
          px={8}
          mb={16}
        >
          <Stack
            spacing={4}
            align={{base : "center", md : "flex-start"}}
            w={{base : "80%", md : "40%"}}
          >
            <Heading
              as="h1"
              size="xl"
              fontWeight="bold"
              color="teal.800"
              textAlign={{base : "center", md : "left"}}
            >
              Welcome To Splash
            </Heading>

            <Heading
              as="h2"
              size="md"
              color="teal.800"
              opacity="0.8"
              fontWeight="bold"
              lineHeight="1.5"
              textAlign={{base : "center", md : "left"}}
            >
              Search for images according to your mood based on its tags or upload your own images to the website.
              Login and start exploring or Try it as a guest.
            </Heading>

              <NextLink href="/photos" passHref>
                <Link to="/photos" _hover={{textDecoration : "none"}}>
                  <Button
                    colorScheme="yellow"
                    size="md"
                    borderRadius="8px"
                    px={4}
                    py={4}
                    lineHeight={1}
                  >
                    Try as a Guest
                  </Button>
                </Link>
              </NextLink>

            <Text
              fontSize="xs"
              textAlign="center"
              opacity="0.8"
              mt={2}
              color="teal.800"
            >
              For access to all features, please Sign In
            </Text>
          </Stack>

          <Box w={{base : "80%", sm : "60%", md : "50%"}} mb={{base : 12 , md : 0}}>
            <Image
              src="/images/landing_page_image.jpeg"
              borderRadius="1rem"
              width="100%"
              height="100%"
              shadow="2xl"
            />
          </Box>

        </Flex>
    </LandingLayout>

  )
}
