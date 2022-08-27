import { HStack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

const IconText = ({ icon, text }) => {
  return (
    <HStack>
      <Icon icon={icon} width="24px" height="24px" />
      <Text pl="4" fontSize="16" fontWeight="medium">
        {text}
      </Text>
    </HStack>
  );
};

export default IconText;
