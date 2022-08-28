import React from "react";
import { Flex, Box, Image, Text } from "@chakra-ui/react";

export default function Card({ windowWidth, title, picture, paragraph, date }) {
  return (
    <Flex
      w={{ base: "100%", lg: "46%" }}
      h={{ base: "160px", md: "200px" }}
      border="1px solid #C0C0C0"
      borderRadius="10px"
      p="20px"
      gap="6"
      borderShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
    >
      <Image
        src={picture}
        objectFit="cover"
        borderRadius="10px"
        w="30%"
        h="100%"
      />

      <Flex direction="column" justifyContent="space-between" width="70%">
        <Box>
          <Text
            align="left"
            fontSize={{ base: "md", md: "xl" }}
            fontWeight="semibold"
          >
            {title}
          </Text>

          <Text fontSize={{ base: "xs", md: "sm" }}>
            {windowWidth >= 1280 && paragraph.length > 230
              ? paragraph.slice(0, 230) + "..."
              : windowWidth < 1280 &&
                windowWidth >= 990 &&
                paragraph.length > 170
              ? paragraph.slice(0, 170) + "..."
              : windowWidth < 990 && windowWidth >= 768 && paragraph.length > 300
              ? paragraph.slice(0, 300) + "..."
              : windowWidth < 768 && windowWidth >= 560 && paragraph.length > 200
              ? paragraph.slice(0, 200) + "..."
              : windowWidth < 650 && windowWidth >= 420 && paragraph.length > 140
              ? paragraph.slice(0, 140) + "..."
              : windowWidth < 420 && paragraph.length > 80
              ? paragraph.slice(0, 80) + "..."
              : paragraph}
          </Text>
        </Box>
        <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="medium">
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
