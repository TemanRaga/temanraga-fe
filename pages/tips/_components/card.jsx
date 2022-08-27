import React from "react";
import { Flex, Spacer, Image, VStack, HStack, Text } from "@chakra-ui/react";

export default function Card({ title, picture, paragraph, date }) {
  return (
    <Flex
      border="1px solid #C0C0C0"
      borderRadius="10px"
      p="20px"
      borderShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
    >
      <Flex width="40%">
        <Image
          src={picture}
          borderRadius="10px"
          boxSize={{ base: '150px', md: '400px' }}
        />
        <Image src={picture} borderRadius="10px" w={{ lg: "300px" }} />
      </Flex>

      <Flex direction="column" px="4%" width="60%">
        <Text align="left" fontSize="lg" fontWeight="600">
          {title}
        </Text>

        <Text fontSize="sm">{paragraph}</Text>
        <Text fontSize="md" mt="15px">
          {date}
        </Text>
      </Flex>
    </Flex>
  );
}

Card.defaultProps = {
  title: "",
  picture:
    "https://images.ctfassets.net/hrltx12pl8hq/4f6DfV5DbqaQUSw0uo0mWi/6fbcf889bdef65c5b92ffee86b13fc44/shutterstock_376532611.jpg?fit=fill&w=800&h=300",
  paragraph: "",
  date: "",
};
