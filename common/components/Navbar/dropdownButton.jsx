import { motion } from "framer-motion";
import { Flex, Box } from "@chakra-ui/react";

const DropdownButton = (props) => {
  const bars = [];
  const hamburgerVariants = {
    init: {
      y: 0,
      rotate: 0,
    },
    enter: (custom) => {
      return {
        width: custom === 1 ? 0 : null,
        y: custom === 0 ? 8 : custom === 2 ? -8 : 0,
        rotate: custom === 0 ? 45 : custom === 2 ? -45 : 0,
      };
    },
    exit: {},
  };

  for (let i = 0; i < 3; i++) {
    bars.push(
      <Box
        as={motion.div}
        key={i}
        custom={i}
        layout
        variants={hamburgerVariants}
        animate={`${props.isOpen ? "enter" : "init"}`}
        position="relative"
        top="0"
        left="0"
        h="1"
        w="6"
        borderRadius="2xl"
        bg="black"
      />
    );
  }

  return (
    <Flex
      cursor="pointer"
      flexDirection="column"
      as={motion.div}
      onClick={props.onToggle}
      display={{ base: "flex", lg: "none" }}
      gap="1"
    >
      {bars}
    </Flex>
  );
};

export default DropdownButton;
