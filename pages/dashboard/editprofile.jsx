import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Flex,
  Text,
  HStack,
  Divider,
  RadioGroup,
  Stack,
  Radio,
  useToast,
  Link,
} from "@chakra-ui/react";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { serverEnv } from "../../common/constant/env";

function Login(props) {
  // States
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    gender: 0,
    address: "",
  });
  const [token, setToken] = useState(
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYyMjE0NzA3LCJpYXQiOjE2NjE2MDk5MDcsImp0aSI6IjQxNjRlZmQyMjFkNjQxNmZiYmZlOWQ3YzZmODE1Zjk5IiwidXNlcl9pZCI6OCwiZW1haWwiOiJla2lyaWRnZWJhY2tzQGdtYWlsLmNvbSIsIm5hbWUiOiJNdWhhbW1hZCBIYXFxaSBBIGwgRmFyaXppIiwiZ2VuZGVyIjowLCJhZGRyZXNzIjoiYWFhYWFhYWFhYSIsImlzX2NvbXBsZXRlZCI6dHJ1ZSwiaXNfdmVyaWZpZWQiOmZhbHNlfQ._N8wXWibOfN_0A41PAofi_fD64eXpqaHBiwen8KXWGU"
  );
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // Handler
  const handleSubmit = () => {
    setIsLoading(true);

    if (
      !(data.address && data.email && data.gender && data.name && data.password)
    ) {
      toast({
        title: `Error`,
        description: "Ada field yang belum diisi",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    fetch(`https://temanraga.xyz/api/v1/profiles/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.status !== 200) {
          toast({
            title: `${res.statusText}`,
            description: "Gagal untuk mengedit profil",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          setIsLoading(false);
        } else {
          setTimeout(() => {
            toast({
              title: "Edit berhasil",
              description: `Profilmu berhasil diedit`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }, 500);

          setTimeout(() => {
            setIsLoading(false);
          }, 1000);

          setTimeout(() => {
            Router.push("/dashboard");
          }, 1500);
        }
      })
      .catch((err) => {
        toast({
          title: "Gagal mengedit profil",
          description: "Coba lagi di lain waktu",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetch("https://temanraga.xyz/api/v1/profiles", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data.user);
      });
  }, []);

  return (
    <Flex w="full" bg="blue.600" justify={"center"} align="center" py="80px">
      <VStack
        bg="white"
        borderRadius={"12px"}
        w={{ base: "90%", md: "600px" }}
        p="51px"
        align={"flex-start"}
      >
        <Heading fontSize={"24px"} mb="23px">
          Edit Profil
        </Heading>
        <FormControl>
          <FormLabel color="#2F2F2F" fontWeight={500}>
            Nama Lengkap
          </FormLabel>
          <Input
            value={data.name}
            mb="23px"
            onChange={(e) => {
              setData({
                ...data,
                name: e.target.value,
              });
            }}
          />
          <FormLabel color="#2F2F2F" fontWeight={500}>
            Email
          </FormLabel>
          <Input
            value={data.email}
            type="email"
            mb="23px"
            onChange={(e) => {
              setData({
                ...data,
                email: e.target.value,
              });
            }}
          />
          <FormLabel color="#2F2F2F" fontWeight={500}>
            Password
          </FormLabel>
          <Input
            mb="23px"
            value={data.password}
            onChange={(e) => {
              setData({
                ...data,
                password: e.target.value,
              });
            }}
          />
          <FormLabel color="#2F2F2F" fontWeight={500}>
            Alamat
          </FormLabel>
          <Input
            mb="23px"
            value={data.address}
            onChange={(e) => {
              setData({
                ...data,
                address: e.target.value,
              });
            }}
          />
          <RadioGroup mb="23px" defaultValue={data.gender}>
            <Stack direction="row" spacing="24px">
              <Radio
                value="0"
                onClick={(ctx) => {
                  console.log(ctx.target);
                }}
              >
                Laki-Laki
              </Radio>
              <Radio value="1">Perempuan</Radio>
            </Stack>
          </RadioGroup>
          <Button
            isLoading={isLoading}
            colorScheme={"blue"}
            w="full"
            mb="23px"
            onClick={handleSubmit}
            type="submit"
          >
            Edit
          </Button>
        </FormControl>
      </VStack>
    </Flex>
  );
}

export default Login;
