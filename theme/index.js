import { extendTheme, theme as base } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Table: {
      variants: {
        "tr-simple": (props) => ({
          borderColor: "gray.400",
          thead: {
            th: {
              textTransform: "none",
              bg: props.useTopBg ? "#121263" : null,
              color: props.useTopBg ? "white" : null,
              fontSize: "16px",
              fontWeight: "semibold",
              textAlign: "center",
            },
          },
          th: {
            border: "1px",
            borderColor: "gray.400",
          },
          td: {
            border: "1px",
            borderColor: "gray.400",
            whiteSpace: "pre-wrap",
          },
        }),
      },
    },
  },
  fonts: {
    heading: `Inter, ${base.fonts?.heading}`,
    body: `Inter, ${base.fonts?.body}`,
  },
});

export default theme;
