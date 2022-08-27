import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Stack, Text, Button, VStack } from "@chakra-ui/react";
import ProfileText from "./_component/ProfileText";
import IconText from "./_component/IconText";
import CreatedTable from "./_component/CreatedTable";
import FollowedTable from "./_component/FollowedTable";
import { Card } from "../../common/components";

export default function Dashboard() {
  const router = useRouter();
  const [hasOngoingActivity, setHasOngoingActivity] = useState(true);
  const [hasCreateActivity, setHasCreateActivity] = useState(true);
  const [hasHistoricActivity, setHasHistoricActivity] = useState(true);

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
          Halo, Muhammad Haqqi Al Farizi
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
            <ProfileText title="Nama" text="Muhammad Haqqi Al Farizi" />
            <ProfileText title="Email" text="muhammad.haqqi01@ui.ac.id" />
            <ProfileText title="Jenis Kelamin" text="Laki-laki" />
            <ProfileText
              title="Alamat"
              text="Kampus Universitas Indonesia, Jakarta"
            />
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
                  Turnamen Bola Gan
                </Text>
                <IconText
                  icon="ci:location"
                  text="Jalan Dago nomor 2, Jakarta"
                />
                <IconText
                  icon="ic:baseline-date-range"
                  text="Jalan Dago nomor 2, Jakarta"
                />
                <IconText
                  icon="akar-icons:clock"
                  text="Jalan Dago nomor 2, Jakarta"
                />
              </>
            ) : (
              <VStack gap="2">
                <Text textAlign="center" fontWeight="semibold" fontSize="24px">
                  Belum ada aktivitas yang sedang diikuti, yuk cari sekarang!
                </Text>
                <Button onClick={() => router.push('/event')} colorScheme="blue" bg="blue.600">
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
            <Flex>
              <Card></Card>
            </Flex>
          </Box>
        )}
        {hasCreateActivity ? (
          <Box>
            <Text fontSize="24px" fontWeight="semibold" mb="8">
              Aktivitas yang telah dibuat
            </Text>
            <CreatedTable data={null} />
          </Box>
        ) : (
          <VStack gap="2" mt="8">
            <Text
              textAlign="center"
              fontWeight="semibold"
              fontSize="24px"
            >
              Kamu belum pernah membuat aktivitas nih, ayo buat sekarang!
            </Text>
            <Button onClick={() => router.push('/event/create')} colorScheme="blue" bg="blue.600">
              Buat aktivitas
            </Button>
          </VStack>
        )}
        {hasHistoricActivity && (
          <Box>
            <Text fontSize="24px" fontWeight="semibold" mb="8">
              Aktivitas yang telah diikuti
            </Text>
            <FollowedTable data={null} />
          </Box>
        )}
      </Flex>
    </Box>
  );
}
