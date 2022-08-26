import { VStack, FormControl, FormLabel, Input, Button, Heading, Flex, Text, HStack, Divider, RadioGroup, Stack, Radio } from '@chakra-ui/react'
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
        <Flex w='full' bg='blue.600' justify={'center'} align='center' py='5%'>
            <VStack bg='white' borderRadius={'12px'} p='51px' align={'flex-start'}>
                <Heading fontSize={'24px'} mb='23px'>Daftar Akun</Heading>
                <FormControl>
                    <FormLabel color='#2F2F2F' fontWeight={500}>Nama Lengkap</FormLabel>
                    <Input mb='23px' />
                    <FormLabel color='#2F2F2F' fontWeight={500}>Email</FormLabel>
                    <Input type='email' mb='23px' />
                    <FormLabel color='#2F2F2F' fontWeight={500}>Password</FormLabel>
                    <Input mb='23px' />
                    <FormLabel color='#2F2F2F' fontWeight={500}>Alamat</FormLabel>
                    <Input mb='23px' />
                    <RadioGroup mb='23px'>
                        <Stack direction='row' spacing='24px'>
                            <Radio value='1'>Laki-Laki</Radio>
                            <Radio value='2'>Perempuan</Radio>
                        </Stack>
                    </RadioGroup>
                    <Button colorScheme={'blue'} w='full' mb='23px'>Daftar</Button>
                </FormControl>
                <Text pb='23px' alignSelf={'center'} fontWeight={400}><Text as='span' color='blue.600' >Masuk </Text>disini apabila sudah memiliki akun</Text>
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