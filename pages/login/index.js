import { VStack, FormControl, FormLabel, Input, Button, Heading, Flex, Text, HStack, Divider, Box } from '@chakra-ui/react'
import React from 'react'
import { Icon } from '@iconify/react'

function AlternateLogin() {
    return (
        <Flex borderRadius={'4px'} border='1px solid #C0C0C0' py='9px' px='45px'>
            <Icon icon='flat-color-icons:google' />
        </Flex>
    )
}


function Login() {
    return (
        <Flex w='full' h='90vh' bg='blue.600' justify={'center'} align='center'>
            <VStack bg='white' borderRadius={'12px'} p='51px' align={'flex-start'}>
                <Heading fontSize={'24px'} mb='23px'>Masuk</Heading>
                <FormControl>
                    <FormLabel color='#2F2F2F' fontWeight={500}>Email</FormLabel>
                    <Input type='email' mb='23px' />
                    <FormLabel color='#2F2F2F' fontWeight={500}>Password</FormLabel>
                    <Input type='password' mb='23px' />
                    <Button colorScheme={'blue'} w='full' mb='23px'>Masuk</Button>
                </FormControl>
                <Text pb='23px' alignSelf={'center'} fontWeight={400}><Text as='span' color='blue.600' >Daftar </Text>disini apabila belum memiliki akun</Text>
                <HStack w='full' pb='23px'>
                    <Divider />
                    <Text whiteSpace={'nowrap'} fontWeight={400}>atau login dengan</Text>
                    <Divider />
                </HStack>
                <HStack>
                    <AlternateLogin />
                    <AlternateLogin />
                    <AlternateLogin />
                </HStack>
            </VStack>
        </Flex >
    )
}

export default Login