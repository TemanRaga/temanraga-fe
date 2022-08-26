import React from 'react'
import { Box, Flex, HStack, Image, Text, Button } from '@chakra-ui/react'

function Navbar() {
    return (
        <Flex w='100%' h='80px' bg='white' px='4%'>
            <HStack w='100%' justify={'space-between'}>
                <Text fontSize={{ base: 10, sm: 12, md: 16 }}>TemanRaga</Text>
                <HStack spacing='20px' justify={'space-between'}>
                    <Text fontSize={{ base: 10, sm: 12, md: 16 }} _hover={{
                        cursor: 'pointer',
                        fontSize: '120%'
                    }}>Aktivitas</Text>
                    <Text fontSize={{ base: 10, sm: 12, md: 16 }} _hover={{
                        cursor: 'pointer',
                        fontSize: '120%'
                    }}>Tips</Text>
                    <Button colorScheme='blue'>Masuk</Button>
                </HStack>
            </HStack>
        </Flex>
    )
}

export default Navbar