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
import React, { useState } from "react";
import { localEnv, serverEnv } from "../../common/constant/env";
import { OAuthButton } from "../../common/components";

function Login(props) {
  // States
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    gender: 0,
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // Handler
  const handleSubmit = () => {
    fetch(`${serverEnv}/api/v1/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.status !== 201) {
          toast({
            title: `${res.statusText}`,
            description: "Failed creating your account",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          setIsLoading(false);
        } else {
          setTimeout(() => {
            toast({
              title: "Register Success",
              description: `Your account have been created`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }, 500);

          setTimeout(() => {
            setIsLoading(false);
          }, 1000);

          setTimeout(() => {
            Router.push("/login");
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
        setIsLoading(false);
      });
  };

  return (
    <Flex w="full" bg="blue.600" justify={"center"} align="center" py="5%">
      <VStack bg="white" borderRadius={"12px"} p="51px" align={"flex-start"}>
        <Heading fontSize={"24px"} mb="23px">
          Daftar Akun
        </Heading>
        <FormControl>
          <FormLabel color="#2F2F2F" fontWeight={500}>
            Nama Lengkap
          </FormLabel>
          <Input
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
            onChange={(e) => {
              setData({
                ...data,
                address: e.target.value,
              });
            }}
          />
          <RadioGroup mb="23px">
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
            colorScheme={"blue"}
            w="full"
            mb="23px"
            onClick={handleSubmit}
            type="submit"
          >
            Daftar
          </Button>
        </FormControl>
        <Text pb="23px" alignSelf={"center"} fontWeight={400}>
          <Link href="/login" color="blue.600">
            Masuk{" "}
          </Link>
          disini apabila sudah memiliki akun
        </Text>
        <HStack w="full" pb="23px">
          <Divider />
          <Text whiteSpace={"nowrap"} fontWeight={400}>
            atau login dengan
          </Text>
          <Divider />
        </HStack>
        <OAuthButton />
      </VStack>
    </Flex>
  );
}

export default Login;
