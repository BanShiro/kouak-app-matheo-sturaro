import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
      },
    }),
  },
  components: {
    Box: {
      baseStyle: (props) => ({
        bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
      }),
    },
  },
});

export default theme;