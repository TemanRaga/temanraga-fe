import React from "react";
import Card from "./_components/card";
import { Flex, Spacer, Image, VStack, HStack, Text } from "@chakra-ui/react";
import { TipsData } from "../../common/constant/data";

export default function Tips() {
  return (
    <Flex direction="column">
      <Text align="center" fontSize="3xl" mt="5%" fontWeight="600">
        Tips
      </Text>
      <Flex
        px="10%"
        py="4%"
        mb="8%"
        wrap="wrap"
        gap={10}
        justifyContent="center"
      >
        {TipsData.map((ctx, idx) => (
          <Card
            title={ctx.title}
            paragraph={ctx.paragraph}
            picture={ctx.picture}
            date={ctx.date}
          />
        ))}
      </Flex>
    </Flex>
  );
}
