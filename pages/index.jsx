import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button, Grid } from "@chakra-ui/react";

import Property from "../components/Property";
import  { baseUrl, fetchApi } from "../utils/fetchApi";
import AlquilerImg from "../assets/img/prop.jpg";

export const Banner = ({
  imageUrl,
  purpose,
  title1,
  title2,
  desc1,
  linkName,
  buttonText,
}) => (
  <Flex  
  h="80vh" 
  w="100%" 
  bgImage={`linear-gradient(65deg, rgba(0,0,0,1) 10%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0) 100%), url('${imageUrl}') `}
  bgSize="cover"
  flexWrap="wrap"
  justifyContent="left" 
  alignItems="center" 
  mb="10"
  borderRadius="15px"
  pl="20px"
  >
    <Box p="5">
      <Text color="white" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text color="white" fontSize="3rem" lineHeight="3rem" m="10px 0" fontWeight="bold" w={{sm:"100%", md:"70%"}}>
      {title1}
      </Text>
      <Text
        color="white"
        fontSize="lg"
        fontWeight="medium"
        paddingTop="3"
        paddingBottom="3"
      >
        {desc1}
      </Text>
      <Button fontSize="xl" size="md" mt="30px">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

export default function Home({ propertiesForSale, propertiesForRent }) {
  console.log(propertiesForSale);
  console.log(propertiesForRent);
  return (
    <Box p="2%">
      <Box mb="10%">
        <Flex>
          <Banner
            purpose="ALQUILA UNA CASA"
            title1="Alquila de forma simple y rápida "
            title2="Para todos"
            desc1="Encuentra casa, cabañas y departamentos"
            buttonText="Ver Propiedades"
            linkName="/search?purpose=rent"
            imageUrl={AlquilerImg.src}
          />
        </Flex>
        <Grid templateColumns='repeat(3, 1fr)' gap={6} >
          {/*Fetch the properties and map over them*/}
          {propertiesForRent.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </Grid>
      </Box>
      <Box>
        <Flex>
          <Banner
            purpose="COMPRAR UNA CASA"
            title1="Encuentra y compra por ti mismo "
            desc1="Encuentra casa, cabañas y departamentos"
            buttonText="Ver Propiedades "
            linkName="/search?purpose=rent"
            imageUrl={AlquilerImg.src}
          />
        </Flex>
        <Grid templateColumns='repeat(3, 1fr)' gap={6} >
             {/*Fetch the properties and map over them*/}
             {propertiesForSale.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </Grid>
      
      </Box>
    </Box>
  );
}

// With getStaticProps we can do the calls to the API
export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  //Nextjs brings the props to the main component, and we can destructure in Home component
  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}
