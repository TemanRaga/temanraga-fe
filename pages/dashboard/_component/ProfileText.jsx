import { Stack, Text } from "@chakra-ui/react";

const ProfileText = ({ title, text }) => {
  return (
    <Stack direction={{ base: "column", md: "row" }}>
      <Text fontWeight="semibold" w={{ base: null, md: "80px" }}>
        {title}
      </Text>
      <Text pl={{ base: "0", md: "8" }} fontSize="16" fontWeight="medium">
        {text}
      </Text>
    </Stack>
  );
};

export default ProfileText;
