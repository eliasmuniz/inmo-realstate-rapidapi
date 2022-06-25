import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

import Property from "../components/Property";
import { baseUrl, fetchApi } from "../utils/fetchApi";

export const Banner = ({
  imageUrl,
  purpose,
  title1,
  title2,
  desc1,
  linkName,
  buttonText,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner" />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text
        color="gray.700"
        fontSize="lg"
        fontWeight="medium"
        paddingTop="3"
        paddingBottom="3"
      >
        {desc1}
      </Text>
      <Button fontSize="xl" size="md">
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
            title="Alquiler de casas "
            title2="Para todos"
            desc1="Encuentra casa, cabañas y departamentos"
            buttonText="Ver Propiedades"
            linkName="/search?purpose=rent"
            imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
          />
        </Flex>
        <Flex flexWrap="wrap">
          {/*Fetch the properties and map over them*/}
          {propertiesForRent.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </Flex>
      </Box>
      <Box>
        <Flex>
          <Banner
            purpose="COMPRAR UNA CASA"
            title="Encuentra y compra por ti mismo "
            title2="Mudate ahora"
            desc1="Encuentra casa, cabañas y departamentos"
            buttonText="Ver Propiedades "
            linkName="/search?purpose=rent"
            imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
          />
        </Flex>
        <Flex flexWrap="wrap">
          {/*Fetch the properties and map over them*/}
          {propertiesForSale.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </Flex>
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
