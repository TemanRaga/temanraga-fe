import React, { useState, useEffect } from "react";
import {
  Link,
  Text,
  Flex,
  Image,
  Button,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { localEnv, serverEnv } from "../../common/constant/env";
import Router from "next/router";
import Cookies from "js-cookie";
import urlSplitter from "../../common/helper/urlSplitter";

export default function EventDetail() {
  const toast = useToast();
  const [isJoined, setIsJoined] = useState(false);
  const [token, setToken] = useState(Cookies.get("access-temanraga"));
  const [idUser, setIdUser] = useState(Cookies.get("id-user"));
  const [isLoadingJoin, setIsLoadingJoin] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [isOwner, setIsOwner] = useState(false);
  const [name, setName] = useState();
  const [creator, setCreator] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [participants, setParticipants] = useState([]);
  const [maxParticipants, setMaxParticipants] = useState();
  const [start, setStart] = useState();
  const [finish, setFinish] = useState();
  const [date, setDate] = useState();
  const [isVerified, setIsVerified] = useState();
  const [image, setImage] = useState();
  const [id, setId] = useState("0");

  useEffect(() => {
    // Getting id from url
    const eventId = urlSplitter(1);
    setId(eventId);

    fetch(`${serverEnv}/api/v1/events/${eventId}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setName(data.data.name);
        setCreator(data.data.created_by.name);
        setDescription(data.data.description);
        setLocation(data.data.location);
        setParticipants(data.data.participants);
        setMaxParticipants(data.data.max_participants);
        setStart(data.data.start);
        setFinish(data.data.finish);
        setIsVerified(data.data.created_by.is_verified);
        setImage(data.data.image);

        setIsOwner(idUser == data.data.created_by.id ? true : false);
        setIndonesianMonth(data.data.date);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setIndonesianMonth = (date) => {
    const monthNum = date.slice(3, 5);
    let month = "";
    if (monthNum === "01") month = "Januari";
    else if (monthNum === "02") month = "Februari";
    else if (monthNum === "03") month = "Maret";
    else if (monthNum === "04") month = "April";
    else if (monthNum === "05") month = "Mei";
    else if (monthNum === "06") month = "Juni";
    else if (monthNum === "07") month = "Juli";
    else if (monthNum === "08") month = "Agustus";
    else if (monthNum === "09") month = "September";
    else if (monthNum === "10") month = "Oktober";
    else if (monthNum === "11") month = "November";
    else if (monthNum === "12") month = "Desember";

    setDate(`${date.slice(0, 2)} ${month} ${date.slice(6, 10)}`);
  };

  const handleRegister = () => {
    setIsLoadingJoin(true);
    fetch(`${serverEnv}/api/v1/events/${id}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        console.log(res);
        if (res.status !== 201) {
          toast({
            title: `${res.statusText}`,
            description: "Gagal untuk mengikuti aktivitas",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        } else {
          setIsJoined(true);
          setTimeout(() => {
            toast({
              title: "Edit berhasil",
              description: `Anda berhasil mengikuti aktivitas`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            setTimeout(() => {
              Router.push("/dashboard");
            }, 2000);
          }, 500);
        }
        setIsLoadingJoin(false);
      })
      .catch((err) => {
        toast({
          title: "Gagal mengedit aktivitas",
          description: "Coba lagi di lain waktu",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setIsLoadingJoin(false);
      });
  };

  const handleDelete = () => {
    setIsLoadingDelete(true);
    fetch(`${serverEnv}/api/v1/events/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("access-temanraga")}`,
      },
    })
      .then(async (res) => {
        if (res.status !== 204) {
          toast({
            title: `${res.statusText}`,
            description: "Gagal untuk menghapus aktivitas",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          setIsLoadingDelete(false);
        } else {
          setTimeout(() => {
            toast({
              title: "Edit berhasil",
              description: `Anda berhasil menghapus aktivitas`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }, 500);
          setIsLoadingDelete(false);

          setTimeout(() => {
            Router.push("/dashboard");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Gagal menghapus aktivitas",
          description: "Coba lagi di lain waktu",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setIsLoadingDelete(false);
      });
  };

  return (
    <Flex mt="8px" mb="50px" flexDirection="column" px="3%">
      <Flex>
        <Image
          src={image}
          objectFit="cover"
          alt="EventPicture"
          width="100%"
          height="500px"
          borderRadius="10px"
        />
      </Flex>

      <Flex
        p="36px"
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        style={{ zIndex: "4" }}
        width="80%"
        margin="auto auto"
        background="white"
        marginTop="-150px"
        flexDirection="column"
        borderRadius="10px"
      >
        <Text fontSize="xl" fontWeight="semibold" mb="8px">
          {name}
        </Text>

        <HStack flexDirection="row" mb="20px" gap={0}>
          <Text fontSize="lg">{creator}</Text>
          {isVerified && (
            <Icon icon="bi:check-circle-fill" margin="200px 200px" />
          )}
        </HStack>

        <Text>{description}</Text>

        <Flex
          gap={{ base: "4", lg: "20" }}
          mt="20px"
          flexDirection={{ sm: "column", md: "column", lg: "row" }}
          justifyContent="space-between"
        >
          <Flex flexDirection="column" gap="4" w="100%">
            <HStack gap={4} flexDirection="row">
              <Icon width="24px" height="24px" icon="ci:location" />
              <Text>{location}</Text>
            </HStack>

            <HStack gap={4} flexDirection="row">
              <Icon width="24px" height="24px" icon="ic:baseline-date-range" />
              <Text>{date}</Text>
            </HStack>
          </Flex>

          <Flex flexDirection="column" gap="4" w="100%">
            <HStack gap={4} flexDirection="row">
              <Icon width="24px" height="24px" icon="bi:person-fill" />
              <Text>
                {participants && participants.length} / {maxParticipants}
              </Text>
            </HStack>

            <HStack gap={4} flexDirection="row">
              <Icon width="24px" height="24px" icon="akar-icons:clock" />
              <Text>
                {start} - {finish}
              </Text>
            </HStack>
          </Flex>
        </Flex>

        <Flex
          gap={5}
          mt="3%"
          flexDirection={{ sm: "column", md: "column", lg: "row" }}
        >
          {idUser && !isJoined && (
            <Button
              isLoading={isLoadingJoin}
              colorScheme="blue"
              bg="blue.600"
              onClick={handleRegister}
            >
              Ikuti Aktivitas
            </Button>
          )}
          {isOwner && (
            <>
              <Link href="/edit">
                <Button colorScheme="blue" variant="outline" w="100%">
                  Edit Aktivitas
                </Button>
              </Link>
              <Button
                isLoading={isLoadingDelete}
                colorScheme="red"
                variant="outline"
                onClick={handleDelete}
              >
                Hapus Aktivitas
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
