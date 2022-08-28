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
  const [token, setToken] = useState(Cookies.get("access-temanraga"));
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
    if (!token) router.push("/");
    fetch(`${serverEnv}/api/v1/profiles/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserData(data.data);
        setHasOngoingActivity(
          data.data.event_soon && data.data.event_soon.length > 0 ? true : false
        );
        setHasCreateActivity(
          data.data.event_created && data.data.event_created.length > 0
            ? true
            : false
        );
        setHasHistoricActivity(
          data.data.event_done && data.data.event_done.length > 0 ? true : false
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box w="full" py="80px" bg="blue.600">
      <Flex
        direction="column"
        gap="8"
        bg="white"
        mx={{ base: "2%", md: "80px" }}
        p={{ base: "4", md: "24" }}
        py={{ base: "16", md: null }}
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
            <Link
              href="/dashboard/editprofile"
              textAlign={"center"}
              mt="6"
              style={{ textDecoration: "none" }}
            >
              <Button colorScheme={"blue"} bg="blue.600">
                Edit Profil
              </Button>
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
                <Text
                  fontSize={{ base: "24", md: "32" }}
                  fontWeight="semibold"
                  mb="4"
                >
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
              minChildWidth={{ base: "270px", md: "300px" }}
              spacing={{ base: "16px", lg: "40px" }}
              justifyContent={"center"}
            >
              {userData.event_soon.map((ctx, idx) => (
                <Box w="fit-content" m={{ base: "auto", md: null }} key={idx}>
                  <Card
                    name={ctx.name}
                    creator={ctx.created_by.name}
                    location={ctx.location}
                    date={ctx.date}
                    time={ctx.start + " - " + ctx.finish}
                    participant={
                      ctx.num_participants + " / " + ctx.max_participants
                    }
                    picture={"http://temanraga.xyz" + ctx.image}
                    gender={ctx.gender}
                    onClick={() => {
                      router.push(`/event/${ctx.id}`);
                    }}
                  />
                </Box>
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

              <Button
                onClick={() => router.push("/event/create")}
                colorScheme={"blue"}
                bg="blue.600"
              >
                Buat Aktivitas
              </Button>
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
