import { ChakraProvider, theme } from '@chakra-ui/react';
import Generator from './Generator';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Generator />
    </ChakraProvider>
  );
}

export default App;
