import React from 'react'
import { Flex, HStack, Image, Text } from '@chakra-ui/react'

function Footer() {
    return (
        <Flex w='100%' h='80px' bg='#3182ce' px='4%' color='white'>
            <HStack w='100%' justify={'space-between'}>
                <Text fontSize={{ base: 10, sm: 12, md: 16 }}>© TemanRaga 2022. All Rights Reserved.</Text>
                <HStack spacing='20px' justify={'space-between'}>
                    <Image src='linelogo.svg' />
                    <Image src='facebooklogo.svg' />
                    <Image src='instagramlogo.svg' />
                    <Image src='twitterlogo.svg' />
                </HStack>
            </HStack>
        </Flex>
    )
}

export default Footer