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
  useToast,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { OAuthButton } from "../../common/components";
import { localEnv, serverEnv } from "../../common/constant/env";
import Router from "next/router";
import Cookies from "js-cookie";

function Login() {
  // States
  const [clientData, setClientData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // Handler
  const handleLogin = () => {
    fetch(`${serverEnv}/api/v1/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    })
      .then((res) => {
        if (res.status !== 200) {
          toast({
            title: `${res.statusText}`,
            description: "Failed to login your account",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          setIsLoading(false);
        } else {
          setTimeout(() => {
            toast({
              title: "Login Success",
              description: `You have been sucessfully logged in`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }, 500);

          setTimeout(() => {
            setIsLoading(false);
          }, 1000);

          setTimeout(() => {
            return res
              .json()
              .then((data) => {
                Cookies.set("refresh-temanraga", data.tokens.refresh, {
                  expires: 365,
                });
                Cookies.set("access-temanraga", data.tokens.access, {
                  expires: 365,
                });
                Cookies.set("email-user", data.email, { expires: 365 });
                Cookies.set("id-user", data.id, { expires: 365 });
                Cookies.set("is_verified", data.is_verified, { expires: 365 });
                Cookies.set("name-user", data.name, { expires: 365 });

                setTimeout(() => {
                  window.location.replace("/")
                }, 1500);
              })
              .catch((err) => {
                console.log(err);
              });
          }, 1500);
        }
      })
      .catch((err) => {
        toast({
          title: "Failed to login with that credentials",
          description: "Please try again later",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setIsLoading(false);
      });
  };

  return (
    <Flex
      w="full"
      h="90vh"
      bg="blue.600"
      justify={"center"}
      align="center"
      py="5%"
    >
      <VStack bg="white" borderRadius={"12px"} p="51px" align={"flex-start"}>
        <Heading fontSize={"24px"} mb="23px">
          Masuk
        </Heading>
        <FormControl>
          <FormLabel color="#2F2F2F" fontWeight={500}>
            Email
          </FormLabel>
          <Input
            type="email"
            mb="23px"
            onChange={(e) => {
              setClientData({
                ...clientData,
                email: e.target.value,
              });
            }}
          />
          <FormLabel color="#2F2F2F" fontWeight={500}>
            Password
          </FormLabel>
          <Input
            type="password"
            mb="23px"
            onChange={(e) => {
              setClientData({
                ...clientData,
                password: e.target.value,
              });
            }}
          />
          <Button
            colorScheme={"blue"}
            w="full"
            mb="23px"
            onClick={handleLogin}
            type="submit"
          >
            Masuk
          </Button>
        </FormControl>
        <Text pb="23px" alignSelf={"center"} fontWeight={400}>
          <Link href="/register" color="blue.600">
            Daftar{" "}
          </Link>
          disini apabila belum memiliki akun
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
