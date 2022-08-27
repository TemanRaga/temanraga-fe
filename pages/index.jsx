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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useEffect, useState } from "react";
import { localEnv, serverEnv } from "../common/constant/env";
import Router from "next/router";

function Kelebihan() {
  return (
    <VStack border="1px solid #C0C0C0" w="300px" p="18px" borderRadius="11px">
      <Image alt="kelebihan" src="/homepage/hero.svg" w="200px" h="200px" />
      <Text fontWeight={600}>Aksesibilitas</Text>
      <Text fontWeight={300} textAlign="center">
        Semuanya dapat mengakses sistem pada paltform kami dengan mudah{" "}
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
  }, [])


  return (
    <>
      <Box bg="#2b6cb0" py="5%" color="white" align={"center"}>
        <Flex
          w="80%"
          alignSelf={"center"}
          justify="center"
          align="center"
          flexDirection={{ base: "column-reverse", md: "row" }}
        >
          <VStack align={"flex-start"}>
            <Heading>TemanRaga</Heading>
            <Text textAlign={"start"}>
              TemanRaga adalah platform untuk mencari teman olahraga dengan
              membuat atau mengikuti aktivitas olahraga yang ada
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
          <Kelebihan />
          <Kelebihan />
          <Kelebihan />
        </Flex>
      </VStack>
      <HStack py="5%" px="5%" justify="center">
        <Image
          src="/homepage/hero.svg"
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
          <Button colorScheme={"blue"}>Cari Aktivitas</Button>
        </VStack>
      </HStack>
      <Box px="5%" mb="5%">
        <Heading fontSize={"24px"} mb="40px" textAlign={"center"}>
          Aktivitas Terpopuler
        </Heading>
        <Swiper
          spaceBetween={50}
          centeredSlides={true}
          centeredSlidesBounds={true}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            // when window width is >= 480px
            1000: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            // when window width is >= 640px
            1440: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {activites && activites.map((ctx, idx) => (
            <SwiperSlide key={ctx.name}>
              <Card
                name={ctx.name}
                description={ctx.description}
                location={ctx.location}
                picture={ctx.image}
                key={idx}
                onClick={() => {
                  Router.push(`/event/${ctx.id}`)
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
