import { Box, HStack, VStack, Image, Text, Flex } from '@chakra-ui/react'
import React from 'react'
import { Icon } from '@iconify/react'

function Gender() {
    return (
        <Box bg='teal.600' px='5px' py='2px' borderRadius={'2px'} color='white'>
            S
        </Box>
    )
}

function Card() {
    return (
        <Box border='1px solid #C0C0C0' borderRadius={'8px'} w='400px'>
            <Image src='https://images.ctfassets.net/hrltx12pl8hq/4f6DfV5DbqaQUSw0uo0mWi/6fbcf889bdef65c5b92ffee86b13fc44/shutterstock_376532611.jpg?fit=fill&w=800&h=300'
                borderRadius={'8px 8px 0px 0px'} w='100%' />
            <VStack align={'flex-start'} p='24px' >
                <HStack justify={'space-between'} w='full'>
                    <HStack>
                        <Text fontWeight={600}>Turnamen Bola Gan</Text>
                        <Gender />
                    </HStack>
                    <HStack>
                        <Icon icon="bi:person-fill" />
                        <Text>12</Text>
                    </HStack>
                </HStack>
                <HStack>
                    <Text>PTI BEM Fasilkom UI</Text>
                    <Icon icon="bi:check-circle-fill" />
                </HStack>
                <HStack>
                    <Icon icon="ci:location" />
                    <Text>Golden Stick, Depok</Text>
                </HStack>
                <HStack justify={'space-between'} w='full'>
                    <HStack>
                        <Icon icon="ic:baseline-date-range" />
                        <Text>4 April 2022</Text>
                    </HStack>
                    <HStack>
                        <Icon icon="akar-icons:clock" />
                        <Text>20:00 - 21:00</Text>
                    </HStack>
                </HStack>
            </VStack>
        </Box>
    )
}

export default Card