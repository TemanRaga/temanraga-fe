import React from "react";
import Card from "./_components/card";
import { Flex, Text } from "@chakra-ui/react";
import { TipsData } from "../../common/constant/data";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function Tips() {
  const [width, setWidth] = useState(undefined);
  
  useEffect(() => {
    if (window !== undefined) {
      function handleResize() {
        setWidth(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  });

  return (
    <>
      <Head>
        <title>TemanRaga - Tips</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:image" content="/favicon.png" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Flex direction="column">
        <Text align="center" fontSize="3xl" mt="5%" fontWeight="600">
          Tips
        </Text>
        <Flex
          px={{ base: "24px", md: "64px" }}
          py="24px"
          mb="8%"
          wrap="wrap"
          gap={10}
          justifyContent="space-between"
        >
          {TipsData.map((ctx, idx) => (
            <Card
              windowWidth={width}
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
