import React, { useState } from 'react'
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
  Image,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";


export default function EventDetail() {
  return (
    <Flex my="50px" flexDirection="column" p="3%">
      <Flex>
        <Image src='https://images.ctfassets.net/hrltx12pl8hq/4f6DfV5DbqaQUSw0uo0mWi/6fbcf889bdef65c5b92ffee86b13fc44/shutterstock_376532611.jpg?fit=fill&w=800&h=300' alt='EventPicture' width="100%" height="400px" borderRadius="10px" />
      </Flex>


      <Flex p="4%" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" style={{ zIndex: "4" }} width="80%" margin="auto auto" background="white" marginTop="-100px" flexDirection="column">

        <Text fontSize='xl' fontWeight="semibold" mb="8px">Turnamen Bola RT 04</Text>

        <HStack flexDirection="row" mb="20px" gap={0}>
          <Text fontSize='lg'>Event Organizer</Text>
          <Icon icon="bi:check-circle-fill" margin="200px 200px" />
        </HStack>

        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer odio pharetra, risus, vel. Ornare enim auctor proin sed accumsan. Vitae vulputate massa aliquam, viverra tempus vestibulum facilisis lorem. Quam dolor congue morbi enim et enim suspendisse et eget. Ultricies nibh massa scelerisque sed consequat diam. Sit nec malesuada egestas mi elit libero ut tristique vulputate. Vel pharetra, auctor porttitor nisi.
        </Text>

        <Flex gap={20} mt="20px" flexDirection={{ sm: 'column', md: 'column', lg: 'row' }}>
          <Flex flexDirection="column">
            <HStack gap={4} flexDirection="row">
              <Icon icon="ci:location" />
              <Text>Japan</Text>
            </HStack>

            <HStack gap={4} flexDirection="row">

              <Icon icon="ic:baseline-date-range" />
              <Text>20 April</Text>
            </HStack>
          </Flex>

          <Flex flexDirection="column">
            <HStack gap={4} flexDirection="row">

              <Icon icon="bi:person-fill" />
              <Text>20</Text>
            </HStack>

            <HStack gap={4} flexDirection="row">

              <Icon icon="akar-icons:clock" />
              <Text>Malem</Text>
            </HStack>
          </Flex>

        </Flex>

        <Flex gap={5} mt="3%" flexDirection={{ sm: 'column', md: 'column', lg: 'row' }}>
          <Button colorScheme='blue' variant='outline'>Ikutan Aktivitas</Button>
          <Button colorScheme='blue' variant='outline'>Edit Aktivitas</Button>
          <Button colorScheme='red' variant='outline'>Hapus Aktivitas</Button>
        </Flex>
      </Flex>

    </Flex>
  )
}
