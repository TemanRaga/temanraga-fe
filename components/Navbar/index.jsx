import { useState } from "react";
import NextLink from "next/link";
import DropdownButton from "./dropdownButton";
import Dropdown from "./dropdown";
import {
  Flex,
  HStack,
  Link,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Flex
        w="100%"
        h="80px"
        px="4%"
        justifyContent="space-between"
        alignItems="center"
      >
        <NextLink href="/" passHref>
          <Link
            fontSize={{ base: 16, sm: 20, md: 24 }}
            fontWeight="semibold"
            color="blue.600"
            style={{ textDecoration: "none" }}
          >
            TemanRaga
          </Link>
        </NextLink>
        <HStack display={{ base: "none", lg: "flex" }} gap="1">
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
          {isLogin ? (
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
              <Button px="10" colorScheme="red" bg="red.600">
                <NextLink href="/login" passHref>
                  <Link style={{ textDecoration: "none" }}>Keluar</Link>
                </NextLink>
              </Button>
            </>
          ) : (
            <Button px="10" colorScheme="blue" bg="blue.600">
              <NextLink href="/login" passHref>
                <Link style={{ textDecoration: "none" }}>Masuk</Link>
              </NextLink>
            </Button>
          )}
        </HStack>
        <DropdownButton onToggle={onToggle} isOpen={isOpen} />
      </Flex>
      <Dropdown isOpen={isOpen} isLogin={isLogin} />
    </>
  );
};

export default Navbar;
