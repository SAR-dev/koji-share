import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
  Input,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Iframe from 'react-iframe';
import Generator from './Generator';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Generator />
    </ChakraProvider>
  );
}

export default App;
