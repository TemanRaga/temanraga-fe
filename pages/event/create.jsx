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
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { localEnv } from "../../common/constant/env";
import Router from "next/router";
import Cookies from "js-cookie";

function CreateEvent() {
  
  const [token, setToken] = useState("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYxNjE3MzMxLCJpYXQiOjE2NjE1OTkzMzEsImp0aSI6Ijk0MmVhMWI4YzAyMDQwMjViYTFlZTczY2I3YWI0YWE3IiwidXNlcl9pZCI6OCwiZW1haWwiOiJla2lyaWRnZWJhY2tzQGdtYWlsLmNvbSIsIm5hbWUiOiJNdWhhbW1hZCBIYXFxaSBBIGwgRmFyaXppIiwiZ2VuZGVyIjowLCJhZGRyZXNzIjoiYWFhYWFhYWFhYSIsImlzX2NvbXBsZXRlZCI6dHJ1ZSwiaXNfdmVyaWZpZWQiOmZhbHNlfQ.BbIbpsd9anjUnbejTjpiFb-rkkSp07WrWdtAeNg77wk");
  const toast = useToast();
  const nowDate = new Date();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [clientData, setClientData] = useState({
    name: "",
    location: "",
    description: "",
    max_participants: "",
    gender: 2,
    date: "",
    start: "",
    finish: "",
    image: "",
  });
  const [isUploaded, setIsUploaded] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);

    let postData = new FormData();
    const startDate = date.startDate.slice(0, 10);
    const endDate = date.endDate.slice(0, 10);

    clientData.start = date.startDate.slice(11);
    clientData.finish = date.endDate.slice(11);
    clientData.date = startDate;

    const minimumDate = `${nowDate.getFullYear()}-${
      nowDate.getMonth() < 10
        ? "0" + parseInt(nowDate.getMonth() + 1)
        : nowDate.getMonth()
    }-${nowDate.getDate()}`;

    if (startDate != endDate) {
      toast({
        title: `Error`,
        description:
          "Tanggal dimulai tidak boleh berbeda dengan tanggal selesai",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setIsSubmitting(false)
      return;
    } else if (startDate <= minimumDate) {
      toast({
        title: `Error`,
        description:
          "Tanggal yang dimasukkan tidak boleh sebelum atau hari ini",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setIsSubmitting(false)
      return;
    } else if (clientData.start >= clientData.finish) {
      toast({
        title: `Error`,
        description:
          "Jam dimulai tidak boleh sebelum atau sama dengan jam selesai",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setIsSubmitting(false)
      return;
    } else if (
      !(
        clientData.name &&
        clientData.description &&
        clientData.finish &&
        clientData.date &&
        clientData.gender &&
        clientData.location &&
        clientData.max_participants &&
        clientData.start
      )
    ) {
      toast({
        title: `Error`,
        description: "Masih ada field yang kosong",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setIsSubmitting(false)
      return;
    }

    for (let key in clientData ) {
      postData.append(key, clientData[key]);
    }

    fetch(`https://temanraga.xyz/api/v1/events/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: postData,
    })
      .then(async (res) => {
        if (res.status !== 201) {
          toast({
            title: `${res.statusText}`,
            description: "Gagal membuat aktivitas",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          setIsSubmitting(false)
        } else {
          setTimeout(() => {
            toast({
              title: "Berhasil",
              description: `Aktivitas berhasil dibuat`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }, 500);
          setIsSubmitting(false)
          setTimeout(() => {
            Router.push("/dashboard");
          }, 1500);
        }
      })
      .catch((err) => {
        toast({
          title: "Failed creating account",
          description: "Please try again later",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setIsSubmitting(false)
      });
  };

  return (
    <Flex w="full" bg="blue.600" justify={"center"} align="center" py="80px">
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
              <Input
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    name: e.target.value,
                  });
                }}
              />
            </VStack>
            <VStack
              align={"flex-start"}
              mb="23px"
              w={{ base: "100%", md: "45%" }}
            >
              <FormLabel color="#2F2F2F" fontWeight={500}>
                Gender khusus
              </FormLabel>
              <Select
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    gender: e.target.value,
                  })
                }
              >
                <option value="2">Semua orang</option>
                <option value="0">Laki-Laki</option>
                <option value="1">Perempuan</option>
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
              <Input
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    location: e.target.value,
                  });
                }}
              />
            </VStack>
            <VStack
              align={"flex-start"}
              mb="23px"
              w={{ base: "100%", md: "45%" }}
            >
              <FormLabel color="#2F2F2F" fontWeight={500}>
                Jumlah maksimal peserta
              </FormLabel>
              <Input
                type="number"
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    max_participants: e.target.value,
                  });
                }}
              />
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
              <Input
                type="datetime-local"
                onChange={(e) =>
                  setDate({
                    ...date,
                    startDate: e.target.value,
                  })
                }
              />
            </VStack>
            <VStack
              align={"flex-start"}
              mb="23px"
              w={{ base: "100%", md: "45%" }}
            >
              <FormLabel color="#2F2F2F" fontWeight={500}>
                Tanggal dan waktu selesai
              </FormLabel>
              <Input
                type="datetime-local"
                onChange={(e) =>
                  setDate({
                    ...date,
                    endDate: e.target.value,
                  })
                }
              />
            </VStack>
          </Flex>
          <FormLabel color="#2F2F2F" fontWeight={500}>
            Deskripsi
          </FormLabel>
          <Textarea
            mb="23px"
            h={{ base: "200px", md: "250px" }}
            onChange={(e) => {
              setClientData({
                ...clientData,
                description: e.target.value,
              });
            }}
          />
          <Text color="#2F2F2F" fontWeight={500} mb="16px">
            Foto atau logo aktivitas
          </Text>

          {isUploaded ? (
            <HStack>
              <Box
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
          ) : (
            <HStack>
              <Input
                w="fit-content"
                type="file"
                accept="image/x-png,image/jpg,image/jpeg"
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    image: e.target.files[0],
                  })
                }
              ></Input>
            </HStack>
          )}
          <Flex w="full" alignItems="center">
            <Button
              isLoading={isSubmitting}
              onClick={handleSubmit}
              colorScheme={"blue"}
              bg="blue.600"
              m="auto"
              type="submit"
              mt="96px"
            >
              Buat Aktivitas
            </Button>
          </Flex>
          {clientData.image && (<p>{clientData.image.name}</p>)}
        </FormControl>
      </VStack>
    </Flex>
  );
}

export default CreateEvent;
