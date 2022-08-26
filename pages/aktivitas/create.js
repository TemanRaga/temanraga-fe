import React from 'react'
import { Flex, VStack, Heading, FormControl, FormLabel, Input, Button, HStack, Textarea, Text } from '@chakra-ui/react'

function Aktivitas() {
    return (
        <Flex w='full' bg='blue.600' justify={'center'} align='center'>
            <VStack bg='white' borderRadius={'12px'} p='51px' align={'flex-start'} w='80%'>
                <Heading fontSize={'24px'} mb='23px'>Buat Aktivitas</Heading>
                <FormControl isRequired>
                    <Flex justify='space-between' flexDirection={{ base: 'column', md: 'row' }}>
                        <VStack align={'flex-start'} mb='23px' w={{ base: '100%', md: '45%' }}>
                            <FormLabel color='#2F2F2F' fontWeight={500}>Nama aktivitas</FormLabel>
                            <Input />
                        </VStack>
                        <VStack align={'flex-start'} mb='23px' w={{ base: '100%', md: '45%' }}>
                            <FormLabel color='#2F2F2F' fontWeight={500}>Gender khusus</FormLabel>
                            <Input />
                        </VStack>
                    </Flex>
                    <Flex justify='space-between' flexDirection={{ base: 'column', md: 'row' }}>
                        <VStack align={'flex-start'} mb='23px' w={{ base: '100%', md: '45%' }}>
                            <FormLabel color='#2F2F2F' fontWeight={500}>Lokasi</FormLabel>
                            <Input />
                        </VStack>
                        <VStack align={'flex-start'} mb='23px' w={{ base: '100%', md: '45%' }}>
                            <FormLabel color='#2F2F2F' fontWeight={500}>Jumlah maksimal peserta</FormLabel>
                            <Input />
                        </VStack>
                    </Flex>
                    <Flex justify='space-between' flexDirection={{ base: 'column', md: 'row' }}>
                        <VStack align={'flex-start'} mb='23px' w={{ base: '100%', md: '45%' }}>
                            <FormLabel color='#2F2F2F' fontWeight={500}>Tanggal dan waktu dimulai</FormLabel>
                            <Input />
                        </VStack>
                        <VStack align={'flex-start'} mb='23px' w={{ base: '100%', md: '45%' }}>
                            <FormLabel color='#2F2F2F' fontWeight={500}>Tanggal dan waktu selesai</FormLabel>
                            <Input />
                        </VStack>
                    </Flex>
                    <FormLabel color='#2F2F2F' fontWeight={500}>Deskripsi</FormLabel>
                    <Textarea mb='23px' />
                    <Text color='#2F2F2F' fontWeight={500}>Foto atau logo aktivitas</Text>
                    <Button my='23px'>Tambah</Button>
                    <Button colorScheme={'blue'} w='full' mt='100px' type='submit'>Buat Aktivitas</Button>
                </FormControl>
            </VStack>
        </Flex>
    )
}

export default Aktivitas