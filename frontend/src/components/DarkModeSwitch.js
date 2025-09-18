import React from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      colorScheme="gray"
      aria-label="Toggle dark mode"
      size="md"
      _hover={{
        bg: colorMode === 'dark' ? 'gray.700' : 'gray.200'
      }}
    />
  );
};

export default DarkModeSwitch;