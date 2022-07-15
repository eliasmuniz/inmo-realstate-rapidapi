import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import DefaultImage from "../assets/img/houses.jpeg";

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => (
  <Link href={`/property/${externalID}`} passHref>
    <Flex
      flexWrap="wrap"
      w="100%"
      pt="0"
      pb="5"
      mb="5"
      justifyContent="flex-start"
      cursor="pointer"
      boxShadow="1px 1px 20px 0px rgba(0,0,0,0.15)"
      borderRadius="15px"
    >
      <Box width="100%">
          <img 
          src={coverPhoto ? coverPhoto.url : DefaultImage} 
          alt=""
          style={{width: "100%", height: "320px", objectFit: "cover", borderRadius: "15px 15px 0 0"}} 
          />
      </Box>
      <Box w="full"  bg="#fff" p="5px 10px" >
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
        <Text fontSize="lg">
          {title.length > 30 ? `${title.substring(0, 30)}...` : title}
        </Text>
      </Box>
    </Flex>
  </Link>
);

export default Property;
