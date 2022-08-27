import React from "react";
import Card from "./_components/card";
import { Flex, Spacer, Image, VStack, HStack, Text } from "@chakra-ui/react";
import { TipsData } from "../../common/constant/data";
import Head from "next/head";

export default function Tips() {
  return (
    <>
      <Head>
        <title>TemanRaga - Tips</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
              key={idx}
            />
          ))}
        </Flex>
      </Flex>
    </>
  );
}
