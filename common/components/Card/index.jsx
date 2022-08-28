import { Box, HStack, VStack, Image, Text, Flex } from "@chakra-ui/react";
import React from "react";
import { Icon } from "@iconify/react";

function Gender(props) {
  if (props.gender == 0) {
    return (
      <Box bg="blue.600" px="5px" py="2px" borderRadius={"2px"} color="white">
        L
      </Box>
    );
  } else if (props.gender == 1) {
    return (
      <Box bg="pink.600" px="5px" py="2px" borderRadius={"2px"} color="white">
        P
      </Box>
    );
  } else if (props.gender == 2) {
    return (
      <Box bg="teal.600" px="5px" py="2px" borderRadius={"2px"} color="white">
        S
      </Box>
    );
  }
}

function Card({
  name,
  gender,
  location,
  creator,
  participant,
  date,
  time,
  picture,
  onClick,
}) {
  return (
    <Box
      border="1px solid #C0C0C0"
      borderRadius={"8px"}
      w={{ base: "280px", md: "300px" }}
      fontSize="12px"
      cursor="pointer"
      onClick={onClick}
    >
      <Image
        src={picture}
        objectFit="cover"
        borderRadius={"8px 8px 0px 0px"}
        w="100%"
        h={{ lg: "140px", md: "120px", base: "100px" }}
        overflow="hidden"
      />
      <VStack align={"flex-start"} p="24px">
        <HStack justify={"space-between"} w="full">
          <HStack w="70%">
            <Text fontWeight={600} fontSize="14px">
              {name}
            </Text>
            <Gender gender={gender} />
          </HStack>
          <HStack w="25%">
            <Icon icon="bi:person-fill" />
            <Text>{participant}</Text>
          </HStack>
        </HStack>
        <HStack>
          <Text>{creator}</Text>
          <Icon icon="bi:check-circle-fill" />
        </HStack>
        <HStack>
          <Icon icon="ci:location" />
          <Text>{location}</Text>
        </HStack>
        <HStack justify={"space-between"} w="full">
          <HStack>
            <Icon icon="ic:baseline-date-range" />
            <Text>{date}</Text>
          </HStack>
          <HStack>
            <Icon icon="akar-icons:clock" />
            <Text>{time}</Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
}

Card.defaultProps = {
  name: "Event Name",
  location: "Location",
  participant: 0,
  creator: "Creator",
  date: "0 January 2022",
  time: "00:00 - 00:00",
  isOfficial: true,
  onClick: () => {},
  gender: 0,
  picture:
    "https://images.ctfassets.net/hrltx12pl8hq/4f6DfV5DbqaQUSw0uo0mWi/6fbcf889bdef65c5b92ffee86b13fc44/shutterstock_376532611.jpg?fit=fill&w=800&h=300",
};

export default Card;
