import { ChakraProvider } from '@chakra-ui/react'
import Footer from "../components/Footer";
import theme from '../theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  )
}

export default MyApp