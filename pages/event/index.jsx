import React from "react";
import {
  Stack,
  Container,
  VStack,
  Text,
  Input,
  Flex,
  Spacer,
  Box,
  Checkbox,
} from "@chakra-ui/react";

import { Card } from "../../components";

export default function Event() {
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" p="0px">
        <Flex flexDirection="column" px="18%" py="5%">
          <Text fontSize="3xl" textAlign="center" mb="2%" fontWeight="semibold">
            Aktivitas
          </Text>
          <Input placeholder="Cari Aktivitas" />
        </Flex>

        <Flex flexDirection="row" px="8%">
          <Flex width="13%" flexDirection="column">
            <Text fontSize="xl" mb="3%" fontWeight="semibold">
              Filter
            </Text>
            <Text fontSize="lg" mb="1%" fontWeight="medium">
              Gender
            </Text>
            <Checkbox defaultChecked>Semua Gender</Checkbox>
            <Checkbox defaultChecked>Khusus laki - laki</Checkbox>
            <Checkbox defaultChecked>Khusus Perempuan</Checkbox>
          </Flex>

          <Flex width="8%" ml="10px">
            <Box width="4px" background="C0C0C0" />
          </Flex>

          <Flex width="80%" flexDirection="column">
            <Text fontSize="xl" mb="2%" fontWeight="semibold">
              Semua Aktivitas
            </Text>

            <Flex flexDirection="row" flexWrap="wrap" gap={10}>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
