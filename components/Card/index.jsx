import { Box, HStack, VStack, Image, Text, Flex } from "@chakra-ui/react";
import React from "react";
import { Icon } from "@iconify/react";

function Gender(props) {
    return (
        <Box bg="teal.600" px="5px" py="2px" borderRadius={"2px"} color="white">
            {props.gender}
        </Box>
    );
}

function Card({ name, gender, location, creator, size, date, time, picture }) {
    return (
        <Box border="1px solid #C0C0C0" borderRadius={"8px"} w={{ base: '300px', md: '400px' }}>
            <Image src={picture} borderRadius={"8px 8px 0px 0px"} w="100%" />
            <VStack align={"flex-start"} p="24px">
                <HStack justify={"space-between"} w="full">
                    <HStack>
                        <Text fontWeight={600}>{name}</Text>
                        <Gender gender={gender} />
                    </HStack>
                    <HStack>
                        <Icon icon="bi:person-fill" />
                        <Text>{size}</Text>
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
    size: 0,
    creator: "Creator",
    date: "0 January 2022",
    time: "00:00 - 00:00",
    isOfficial: true,
    gender: "A",
    picture:
        "https://images.ctfassets.net/hrltx12pl8hq/4f6DfV5DbqaQUSw0uo0mWi/6fbcf889bdef65c5b92ffee86b13fc44/shutterstock_376532611.jpg?fit=fill&w=800&h=300",
};

export default Card;
