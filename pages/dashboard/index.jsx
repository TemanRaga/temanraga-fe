import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Stack,
  Text,
  Button,
  VStack,
  HStack,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import ProfileText from "./_component/ProfileText";
import IconText from "./_component/IconText";
import CreatedTable from "./_component/CreatedTable";
import FollowedTable from "./_component/FollowedTable";

import { Card } from "../../common/components";
import { localEnv, serverEnv } from "../../common/constant/env";
import Cookies from "js-cookie";

export default function Dashboard() {
  const router = useRouter();
  const [hasOngoingActivity, setHasOngoingActivity] = useState(true);
  const [hasCreateActivity, setHasCreateActivity] = useState(true);
  const [hasHistoricActivity, setHasHistoricActivity] = useState(true);
  const [userData, setUserData] = useState({
    user: {
      name: "",
      email: "",
      gender: 0,
      address: "",
    },
    event_soon: [],
    event_created: [],
    event_done: [],
  });

  useEffect(() => {
    fetch(`${serverEnv}/api/v1/profiles/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("access-temanraga")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUserData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(userData);

  return (
    <Box w="full" py="80px" bg="blue.600">
      <Flex
        direction="column"
        gap="8"
        bg="white"
        mx="80px"
        p="24"
        borderRadius="lg"
      >
        <Text
          fontSize={{ base: "24", sm: "28", md: "32" }}
          fontWeight="semibold"
        >
          Halo, {userData.user.name}
        </Text>
        <Stack
          direction={{ base: "column", xl: "row" }}
          justifyContent="space-between"
          alignItems={{ base: "center", xl: "initial" }}
          gap="8"
        >
          <Flex
            flexDirection="column"
            justifyContent="center"
            gap={{ base: "6", md: "2" }}
            p="8"
            border="1px"
            borderColor="gray.400"
            borderRadius="xl"
            w="100%"
          >
            <ProfileText title="Nama" text={userData.user.name} />
            <ProfileText title="Email" text={userData.user.email} />
            <ProfileText
              title="Jenis Kelamin"
              text={userData.user.gender ? "Perempuan" : "Laki-laki"}
            />
            <ProfileText title="Alamat" text={userData.user.address} />
            <Link href="/dashboard/editprofile" textAlign={"center"} mt="6">
              <Button colorScheme={"blue"}>Edit Profil</Button>
            </Link>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="center"
            gap="2"
            p="8"
            border="1px"
            borderColor="gray.400"
            borderRadius="lg"
            w="100%"
          >
            {hasOngoingActivity ? (
              <>
                <Text fontWeight="semibold">Aktivitas terdekat</Text>
                <Text fontSize="28" fontWeight="semibold" mb="4">
                  {userData.event_soon.length != 0 &&
                    userData.event_soon[0].name}
                </Text>
                <IconText
                  icon="ci:location"
                  text={
                    userData.event_soon.length != 0 &&
                    userData.event_soon[0].location
                  }
                />
                <IconText
                  icon="ic:baseline-date-range"
                  text={
                    userData.event_soon.length != 0 &&
                    userData.event_soon[0].date
                  }
                />
                <IconText
                  icon="akar-icons:clock"
                  text={
                    userData.event_soon.length != 0 &&
                    userData.event_soon[0].start +
                      " - " +
                      userData.event_soon[0].finish
                  }
                />
              </>
            ) : (
              <VStack gap="2">
                <Text textAlign="center" fontWeight="semibold" fontSize="24px">
                  Belum ada aktivitas yang sedang diikuti, yuk cari sekarang!
                </Text>
                <Button
                  onClick={() => router.push("/event")}
                  colorScheme="blue"
                  bg="blue.600"
                >
                  Cari aktivitas
                </Button>
              </VStack>
            )}
          </Flex>
        </Stack>
        {hasOngoingActivity && (
          <Box>
            <Text fontSize="24px" fontWeight="semibold" mb="8">
              Aktivitas yang akan diikuti
            </Text>
            <SimpleGrid
              minChildWidth={"350px"}
              spacing="40px"
              justifyContent={"center"}
            >
              {userData.event_soon.map((ctx, idx) => (
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
            </SimpleGrid>
          </Box>
        )}
        {hasCreateActivity ? (
          <Box>
            <HStack mb="8">
              <Text fontSize="24px" fontWeight="semibold" mr="4">
                Aktivitas yang telah dibuat
              </Text>
              <Link href="/event/create">
                <Button colorScheme={"blue"}>Buat Aktivitas</Button>
              </Link>
            </HStack>
            <CreatedTable data={userData.event_created} />
          </Box>
        ) : (
          <VStack gap="2" mt="8">
            <Text textAlign="center" fontWeight="semibold" fontSize="24px">
              Kamu belum pernah membuat aktivitas nih, ayo buat sekarang!
            </Text>
            <Button
              onClick={() => router.push("/event/create")}
              colorScheme="blue"
              bg="blue.600"
            >
              Buat aktivitas
            </Button>
          </VStack>
        )}
        {hasHistoricActivity && (
          <Box>
            <Text fontSize="24px" fontWeight="semibold" mb="8">
              Aktivitas yang telah diikuti
            </Text>
            <FollowedTable data={userData.event_done} />
          </Box>
        )}
      </Flex>
    </Box>
  );
}
