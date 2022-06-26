import { Avatar, Box, Flex, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import { baseUrl, fetchApi } from "../../utils/fetchApi";

import ImageScrollBar from "../../components/ImageScrollBar";

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => (
  <Box maxWidth="1000px" margin="auto" p="4">
    {photos && <ImageScrollBar data={photos} />}
    <Box w="full" p="6">
      <Flex pt="2" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Box pr="3" color="green.400">
            {isVerified && <GoVerified />}
          </Box>
          <Text fontWeight="bold" fontSize="lg">
            $ {millify(price)}
            {rentFrequency && `/${rentFrequency}`}
          </Text>
          <Box>
            <Avatar size="sm" src={agency?.logo?.url} />
          </Box>
        </Flex>
      </Flex>
      <Flex
        alignItems="center"
        p="1"
        justifyContent="space-between"
        w="250px"
        color="blue.400"
      >
        {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)}m2{" "}
        <BsGridFill />
      </Flex>
      <Box marginTop="2">
        <Text fontSize="lg" marginBottom="2" fontWeight="bold">
            {title}
        </Text>
        <Text lineHeight="2" color="gray.600">
            {description}
        </Text>
      </Box>
        <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between">
            <Flex justifyContent="space-between" w="400px" borderBottom="1px solid gray.100">
                <Text>Tipo</Text>
                <Text fontWeight="bold">{type}</Text>
            </Flex>
            <Flex justifyContent="space-between" w="400px" borderBottom="1px solid gray.100">
                <Text>Propósito</Text>
                <Text fontWeight="bold">{purpose}</Text>
            </Flex>
        </Flex>
        {furnishingStatus && (
            <Flex justifyContent="space-between" w="400px" borderBottom="1px solid gray.100">
            <Text>Estado de muebles</Text>
            <Text fontWeight="bold">{furnishingStatus}</Text>
        </Flex>
        )}
        <Box>
            {amenities.length && <Text fontSize="2xl" fontWeight="black" margin-top="5">Amenities</Text>}
            <Flex flexWrap="wrap">
                {amenities.map((item) => (
                    item.amenities.map((amenity)=>(
                        <Text 
                        fontWeight="bold"
                        color="blue.400"
                        fontSize="l"
                        p="2"
                        bg="gray.200"
                        m="1"
                        borderRadius="5"
                        key={amenity.text}>{amenity.text}</Text>
                    ))
                ))}
            </Flex>

        </Box>
    </Box>
  </Box>
);

export default PropertyDetails;

// Params come from the url
export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}
