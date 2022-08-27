import NextLink from "next/link";
import { AnimatePresence } from "framer-motion";
import { Box, Link, Collapse, VStack, Button } from "@chakra-ui/react";

const Dropdown = (props) => {
  const dropVariants = {
    init: { height: 0 },
    enter: { height: 224 },
    exit: { height: 0 },
  };

  return (
    <AnimatePresence>
      <Box position="absolute" bg="white" w="full" overflow="hidden">
        <Collapse in={props.isOpen} animateOpacity>
          <VStack bg="white" textAlign="center">
            <NextLink href="/event" passHref>
              <Link
                w="full"
                p="4"
                fontWeight="semibold"
                style={{ textDecoration: "none" }}
              >
                Aktivitas
              </Link>
            </NextLink>
            <NextLink href="/tips" passHref>
              <Link
                w="full"
                p="4"
                fontWeight="semibold"
                style={{ textDecoration: "none" }}
              >
                Tips
              </Link>
            </NextLink>
            {props.isLogin ? (
              <>
                <NextLink href="/dashboard" passHref>
                  <Link
                    w="full"
                    p="4"
                    fontWeight="semibold"
                    style={{ textDecoration: "none" }}
                  >
                    Dashboard
                  </Link>
                </NextLink>
                <Box pb="4">
                  <Button px="10" colorScheme="red" bg="red.600">
                    <NextLink href="/login" passHref>
                      <Link style={{ textDecoration: "none" }}>Keluar</Link>
                    </NextLink>
                  </Button>
                </Box>
              </>
            ) : (
              <Box pb="4">
                <Button px="10" colorScheme="blue" bg="blue.600">
                  <NextLink href="/login" passHref>
                    <Link style={{ textDecoration: "none" }}>Masuk</Link>
                  </NextLink>
                </Button>
              </Box>
            )}
          </VStack>
        </Collapse>
      </Box>
    </AnimatePresence>
  );
};

export default Dropdown;
