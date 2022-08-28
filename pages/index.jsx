import {
  HStack,
  VStack,
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";
import { Card } from "../common/components";
import React, { useEffect, useState } from "react";
import { localEnv, serverEnv } from "../common/constant/env";
import Router from "next/router";
import Head from "next/head";

function Kelebihan({ judul, deskripsi, img }) {
  return (
    <VStack border="1px solid #C0C0C0" w="300px" p="18px" borderRadius="11px">
      <Image alt="kelebihan" src={img} w="200px" h="200px" />
      <Text fontWeight={600}>{judul}</Text>
      <Text fontWeight={300} textAlign="center">
        {deskripsi}
      </Text>
    </VStack>
  );
}

export default function Home() {
  const [activites, setActivites] = useState();

  useEffect(() => {
    fetch(`${serverEnv}/api/v1/events/`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setActivites(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Head>
        <title>TemanRaga - Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:image" content="/favicon.png" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Box bg="blue.600" py={{base:"48px", md: "2%"}} color="white" align={"center"}>
        <Flex
          w="80%"
          alignSelf={"center"}
          justify="center"
          align="center"
          flexDirection={{ base: "column-reverse", md: "row" }}
        >
          <VStack align={"flex-start"}>
            <Text fontSize={{base:"24px", md:"36px", lg:"48px"}} fontWeight="600">
              TemanRaga
            </Text>
            <Text textAlign={"start"} fontSize={{base:"16px", md:"20px"}}>
              Platform untuk mencari teman olahraga dengan membuat atau
              mengikuti aktivitas olahraga yang ada
            </Text>
          </VStack>
          <Image
            alt="utama"
            src="/homepage/hero.svg"
            boxSize={{ base: "150px", md: "400px", lg: "600px" }}
          />
        </Flex>
      </Box>
      <VStack>
        <Heading py={{ base: "35px", lg: "70px" }} fontSize={"24px"}>
          Kelebihan yang didapat
        </Heading>
        <Flex
          gap="20px"
          justify={"space-between"}
          w={{ base: "auto", lg: "80%" }}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Kelebihan
            judul={"Aksesibilitas"}
            deskripsi="Semuanya dapat mengakses sistem pada platform kami dengan mudah "
            img="/homepage/Accesibilty.svg"
          />
          <Kelebihan
            judul={"Gratis"}
            deskripsi="Tanpa mengeluarkan uang kalian bisa bertemu dengan orang terdekat"
            img="/homepage/gratis.svg"
          />
          <Kelebihan
            judul={"Kredibilitas"}
            deskripsi="Website kami dijamin aman dan diawasi oleh tim kami"
            img="/homepage/kredibilitas.svg"
          />
        </Flex>
      </VStack>
      <HStack py="5%" px="5%" justify="center">
        <Image
          src="/homepage/cari_temanraga.svg"
          alt="cari"
          boxSize={{ base: "150px", md: "400px", lg: "600px" }}
        />
        <VStack align="flex-start">
          <Text
            mb="24px"
            fontWeight={600}
            fontSize={{ base: "12px", md: "18px", lg: "24px" }}
          >
            Yuk Cari TemanRaga-mu sekarang!
          </Text>
          <Button colorScheme={"blue"} bg="blue.600">
            Cari Aktivitas
          </Button>
        </VStack>
      </HStack>
      <VStack px="5%" mb="5%">
        <Heading fontSize={"24px"} mb="40px" textAlign={"center"}>
          Aktivitas Terpopuler
        </Heading>
        <Flex
          gap={{ base: "60px", lg: "70px" }}
          justify={"center"}
          w={{ base: "auto", lg: "full" }}
          flexDirection={{ base: "column", lg: "row" }}
        >
          {activites &&
            activites.slice(0, 3).map((ctx, idx) => (
              <Card
                name={ctx.name}
                creator={ctx.created_by.name}
                location={ctx.location}
                date={ctx.date}
                time={ctx.start + " - " + ctx.finish}
                participant={
                  ctx.num_participants + " / " + ctx.max_participants
                }
                picture={ctx.image}
                key={idx}
                gender={ctx.gender}
                onClick={() => {
                  Router.push(`/event/${ctx.id}`);
                }}
              />
            ))}
        </Flex>
      </VStack>
    </>
  );
}
