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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { localEnv, serverEnv } from "../../common/constant/env";

function Login(props) {
  // States
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    gender: 0,
    address: "",
  });
  const toast = useToast();

  // Handler
  const handleSubmit = () => {};

  const handleOnDevelopment = () => {
    toast({
      title: "On Development",
      description: "These feature is on development, please try again soon ..",
      status: "info",
      duration: 2000,
      isClosable: true,
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
                name: e.target.value,
                ...data,
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
                email: e.target.value,
                ...data,
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
                password: e.target.value,
                ...data,
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
                address: e.target.value,
                ...data,
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
          <Button colorScheme={"blue"} w="full" mb="23px">
            Daftar
          </Button>
        </FormControl>
        <Text pb="23px" alignSelf={"center"} fontWeight={400}>
          <Text as="span" color="blue.600">
            Masuk{" "}
          </Text>
          disini apabila sudah memiliki akun
        </Text>
        <HStack w="full" pb="23px">
          <Divider />
          <Text whiteSpace={"nowrap"} fontWeight={400}>
            atau login dengan
          </Text>
          <Divider />
        </HStack>
        <HStack>
          <Flex
            borderRadius={"4px"}
            border="1px solid #C0C0C0"
            py="9px"
            px="45px"
          >
            <Icon icon="flat-color-icons:google" />
          </Flex>
        </HStack>
      </VStack>
    </Flex>
  );
}

export default Login;
