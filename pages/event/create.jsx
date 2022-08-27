import React, { useState } from "react";
import {
  Flex,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
  Textarea,
  Text,
  Stack,
  Box,
  Select,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";

function CreateEvent() {
  return (
    <Flex w="full" bg="blue.600" justify={"center"} align="center" py="5%">
      <VStack
        bg="white"
        borderRadius={"12px"}
        p="51px"
        align={"flex-start"}
        w="80%"
      >
        <Heading fontSize={"24px"} mb="23px">
          Buat Aktivitas
        </Heading>
        <FormControl isRequired>
          <Flex
            justify="space-between"
            flexDirection={{ base: "column", md: "row" }}
          >
            <VStack
              align={"flex-start"}
              mb="23px"
              w={{ base: "100%", md: "45%" }}
            >
              <FormLabel color="#2F2F2F" fontWeight={500}>
                Nama aktivitas
              </FormLabel>
              <Input />
            </VStack>
            <VStack
              align={"flex-start"}
              mb="23px"
              w={{ base: "100%", md: "45%" }}
            >
              <FormLabel color="#2F2F2F" fontWeight={500}>
                Gender khusus
              </FormLabel>
              <Select placeholder="Semua">
                <option value="option1">Laki-Laki</option>
                <option value="option2">Perempuan</option>
              </Select>
            </VStack>
          </Flex>
          <Flex
            justify="space-between"
            flexDirection={{ base: "column", md: "row" }}
          >
            <VStack
              align={"flex-start"}
              mb="23px"
              w={{ base: "100%", md: "45%" }}
            >
              <FormLabel color="#2F2F2F" fontWeight={500}>
                Lokasi
              </FormLabel>
              <Input />
            </VStack>
            <VStack
              align={"flex-start"}
              mb="23px"
              w={{ base: "100%", md: "45%" }}
            >
              <FormLabel color="#2F2F2F" fontWeight={500}>
                Jumlah maksimal peserta
              </FormLabel>
              <Input />
            </VStack>
          </Flex>
          <Flex
            justify="space-between"
            flexDirection={{ base: "column", md: "row" }}
          >
            <VStack
              align={"flex-start"}
              mb="23px"
              w={{ base: "100%", md: "45%" }}
            >
              <FormLabel color="#2F2F2F" fontWeight={500}>
                Tanggal dan waktu dimulai
              </FormLabel>
              <Input type="datetime-local" />
            </VStack>
            <VStack
              align={"flex-start"}
              mb="23px"
              w={{ base: "100%", md: "45%" }}
            >
              <FormLabel color="#2F2F2F" fontWeight={500}>
                Tanggal dan waktu selesai
              </FormLabel>
              <Input type="datetime-local" />
            </VStack>
          </Flex>
          <FormLabel color="#2F2F2F" fontWeight={500}>
            Deskripsi
          </FormLabel>
          <Textarea mb="23px" />
          <Text color="#2F2F2F" fontWeight={500}>
            Foto atau logo aktivitas
          </Text>
          <Box
            my="23px"
            fontWeight={500}
            borderRadius={"4px"}
            border="1px solid #2B6CB0"
            px="45px"
            py="7px"
            w="fit-content"
          >
            Tambah
          </Box>
          <HStack>
            <Box
              my="23px"
              fontWeight={500}
              borderRadius={"4px"}
              border="1px solid #2B6CB0"
              px="45px"
              py="7px"
            >
              Sesuatu.jpg
            </Box>
            <Stack border="1px solid #C53030" borderRadius={"4px"} p="10px">
              <Icon icon="fa-solid:trash-alt" color="#C53030" />
            </Stack>
          </HStack>
          <Button colorScheme={"blue"} w="full" mt="100px" type="submit">
            Buat Aktivitas
          </Button>
        </FormControl>
      </VStack>
    </Flex>
  );
}

export default CreateEvent;
