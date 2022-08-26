import React from 'react'
import {Stack, Container, VStack, Text} from '@chakra-ui/react'

export default function Event() {
  return (
    <Stack direction="column" > 
      <Container
        height="30px"
      />  
      <Container>
        <VStack 
        align='stretch'
        >
        <Container>
        <Text fontSize='lg'>(lg) In love with React & Next</Text>
        
        </Container>
        <Container>

        </Container>

        </VStack>
      </Container>


      <Container
        height="30px"
      /> 
    </Stack>
  )
}
