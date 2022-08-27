import React, { useEffect, useState } from "react";
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
  Image,
  RadioGroup,
  Radio,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { serverEnv } from "../../../common/constant/env";
import urlSplitter from "../../../common/helper/urlSplitter";
import Router from "next/router";
import Cookies from "js-cookie";

function CreateEvent() {
  const [token, setToken] = useState(Cookies.get("access-temanraga"));
  const toast = useToast();
  const nowDate = new Date();
  const [imageSelect, setImageSelect] = useState("0");
  const [oldImage, setOldImage] = useState();
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
      setIsSubmitting(false);
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
      setIsSubmitting(false);
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
      setIsSubmitting(false);
      return;
    } else if (
      !(
        clientData.name &&
        clientData.description &&
        clientData.finish &&
        clientData.date &&
        clientData.location &&
        clientData.max_participants &&
        clientData.start &&
        clientData.image
      )
    ) {
      toast({
        title: `Error`,
        description: "Masih ada field yang kosong",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }

    for (let key in clientData) {
      if (key === "image" && imageSelect === "0")
        postData.append(key, oldImage);
      else postData.append(key, clientData[key]);
    }

    const eventId = urlSplitter(1);
    fetch(`https://temanraga.xyz/api/v1/events/${eventId}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: postData,
    })
      .then(async (res) => {
        if (res.status !== 201) {
          toast({
            title: `${res.statusText}`,
            description: "Gagal mengedit aktivitas",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          setIsSubmitting(false);
        } else {
          setTimeout(() => {
            toast({
              title: "Berhasil",
              description: `Aktivitas berhasil diedit`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }, 500);
          setIsSubmitting(false);
          setTimeout(() => {
            Router.push("/dashboard");
          }, 1500);
        }
      })
      .catch((err) => {
        toast({
          title: "Gagal mengedit aktivitas",
          description: "Coba lagi di lain waktu",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    const eventId = urlSplitter(1);
    const idUser = Cookies.get("id-user");

    fetch(`${serverEnv}/api/v1/events/${eventId}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientData(data.data);
        setOldImage(data.data.image);
        setDate({
          startDate: `${data.data.date.slice(6, 10)}-${data.data.date.slice(
            3,
            5
          )}-${data.data.date.slice(0, 2)}T${data.data.start}`,
          endDate: `${data.data.date.slice(6, 10)}-${data.data.date.slice(
            3,
            5
          )}-${data.data.date.slice(0, 2)}T${data.data.finish}`,
        });
        if (idUser === data.data.created_by.id) Router.push("/event");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Flex w="full" bg="blue.600" justify={"center"} align="center" py="80px">
      <VStack bg="white" borderRadius={"12px"} p="51px" w="80%">
        <Heading fontSize={"24px"} mb="23px">
          Edit Aktivitas
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
                defaultValue={clientData.name}
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
                value={clientData.gender}
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
                defaultValue={clientData.location}
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
                defaultValue={clientData.max_participants}
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
                defaultValue={date.startDate}
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
                defaultValue={date.endDate}
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
            defaultValue={clientData.description}
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

          <HStack>
            <Input
              defaultValue={clientData.image}
              w="fit-content"
              type="file"
              accept="image/x-png,image/jpg,image/jpeg"
              onChange={(e) => {
                setClientData({
                  ...clientData,
                  image: e.target.files[0],
                });
                setIsUploaded(true);
              }}
            ></Input>
          </HStack>
          <RadioGroup onChange={setImageSelect} value={imageSelect}>
            <Flex direction={{ base: "column", lg: "row" }} gap="4">
              <Flex direction="column" w={{ base: "100%", lg: "50%" }}>
                <Flex>
                  <Text my="4">Foto atau logo lama</Text>
                  <Radio ml="4" value="0"></Radio>
                </Flex>
                <Image
                  src={oldImage}
                  border="1px"
                  borderColor="gray.400"
                  w="100%"
                  h={{ base: "200px", md: "300px" }}
                  objectFit="cover"
                />
              </Flex>
              {isUploaded && (
                <Flex direction="column" w={{ base: "100%", lg: "50%" }}>
                  <Flex>
                    <Text my="4">Foto atau logo baru</Text>
                    <Radio ml="4" value="1"></Radio>
                  </Flex>
                  <Image
                    src={URL.createObjectURL(clientData.image)}
                    border="1px"
                    borderColor="gray.400"
                    w="100%"
                    h={{ base: "200px", md: "300px" }}
                    objectFit="cover"
                  />
                </Flex>
              )}
            </Flex>
          </RadioGroup>
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
        </FormControl>
      </VStack>
    </Flex>
  );
}

export default CreateEvent;
