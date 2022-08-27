import React, { useState, useEffect } from "react";
import {
  Link,
  Text,
  Flex,
  Image,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { localEnv, serverEnv } from "../../common/constant/env";
import Router from "next/router";
import Cookies from 'js-cookie';

export default function EventDetail() {

  const [name, setName] = useState();
  const [creator, setCreator] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [participants, setParticipants] = useState([]);
  const [image, setImage] = useState();

  useEffect(() => {
    fetch(`${localEnv}/api/v1/events/${3}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setName(data.data.name);
        setCreator(data.data.created_by.name);
        setDescription(data.data.description);
        setLocation(data.data.location);
        setParticipants(data.data.participants);
        setImage(data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  const handleRegister = () => {
    fetch(`${localEnv}/api/v1/events/${3}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get('access-temanraga')}`,
      },
    })
      .then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleDelete = () => {
    fetch(`${localEnv}/api/v1/events/${1}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get('access-temanraga')}`,
      },
    })
      .then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data);
        Router.push("/event");
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <Flex my="50px" flexDirection="column" p="3%">
      <Flex>
        <Image
          src={image}
          alt="EventPicture"
          width="100%"
          height="400px"
          borderRadius="10px"
        />
      </Flex>

      <Flex
        p="4%"
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        style={{ zIndex: "4" }}
        width="80%"
        margin="auto auto"
        background="white"
        marginTop="-100px"
        flexDirection="column"
      >
        <Text fontSize="xl" fontWeight="semibold" mb="8px">
          {name}
        </Text>

        <HStack flexDirection="row" mb="20px" gap={0}>
          <Text fontSize="lg">{creator}</Text>
          <Icon icon="bi:check-circle-fill" margin="200px 200px" />
        </HStack>

        <Text>
          {description}
        </Text>

        <Flex
          gap={20}
          mt="20px"
          flexDirection={{ sm: "column", md: "column", lg: "row" }}
        >
          <Flex flexDirection="column">
            <HStack gap={4} flexDirection="row">
              <Icon icon="ci:location" />
              <Text>{location}</Text>
            </HStack>

            <HStack gap={4} flexDirection="row">
              <Icon icon="ic:baseline-date-range" />
              <Text>20 April</Text>
            </HStack>
          </Flex>

          <Flex flexDirection="column">
            <HStack gap={4} flexDirection="row">
              <Icon icon="bi:person-fill" />
              <Text>{participants && participants.length} / Max</Text>
            </HStack>

            <HStack gap={4} flexDirection="row">
              <Icon icon="akar-icons:clock" />
              <Text>Malem</Text>
            </HStack>
          </Flex>
        </Flex>

        <Flex
          gap={5}
          mt="3%"
          flexDirection={{ sm: "column", md: "column", lg: "row" }}
        >
          <Button colorScheme="blue" onClick={handleRegister}>
            Ikutan Aktivitas
          </Button>
          <Link href='/edit'>
            <Button colorScheme="blue" variant="outline">
              Edit Aktivitas
            </Button>
          </Link>
          <Button colorScheme="red" variant="outline" onClick={handleDelete}>
            Hapus Aktivitas
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
