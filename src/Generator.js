import { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  Button,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Iframe from 'react-iframe';
import isUrl from 'is-url';
import { useCopyToClipboard } from 'usehooks-ts'

function Generator() {
  const [value, setValue] = useState('');
  const [valid, setValid] = useState(false);
  const [code, setCode] = useState('ode has been generated. Hover the frame ');
  const [copied, copy] = useCopyToClipboard()
  const toast = useToast();

  function changeValue(e) {
    setValue(e.target.value);
    const isValid = isUrl(e.target.value);
    setValid(isValid);
  }

  function generate() {
    const HTML = `<iframe src=${value} id="c-iframe" width="100%" height="250px" style="position: relative; display: initial;"></iframe>`
    setCode(HTML)
    toast({
      title: 'Generated.',
      description: 'Code has been generated. Hover the frame to copy.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom',
    });
  }

  function runCopy(){
    copy(code)
    toast({
        title: 'Copied.',
        description: 'Code has been copied.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
  }

  return (
    <Box textAlign="center" fontSize="xl">
      <Box minH="100vh" p={3}>
        <Flex w="100%" h="100vh" justifyContent={'center'} alignItems="center">
          <Box
            borderWidth={1}
            borderStyle="solid"
            borderColor={useColorModeValue('gray.300', 'gray.700')}
            p={5}
            rounded="md"
            w={600}
          >
            <Box
              w="100%"
              h={250}
              rounded="md"
              overflow={'hidden'}
              pos="relative"
              role="group"
            >
              <Iframe
                url="http://www.youtube.com/embed/xDMP3i36naA"
                width="100%"
                height="250px"
                id="c-iframe"
                display="initial"
                position="relative"
              />
              {valid && (
                <Flex
                  pos="absolute"
                  top="0"
                  left="0"
                  bg="rgba(121, 80, 242, .95)"
                  h={250}
                  w="100%"
                  display="none"
                  _groupHover={{ display: 'flex' }}
                  justifyContent="center"
                  alignItems={'center'}
                >
                    <Button colorScheme={'purple'} onClick={() => runCopy()}>Copy Code</Button>
                </Flex>
              )}
            </Box>
            <Flex mt={5}>
              <ColorModeSwitcher />
              <Input
                w="100%"
                mx={2}
                variant="filled"
                placeholder="Paste your link here..."
                borderColor={useColorModeValue('gray.300', 'gray.700')}
                value={value}
                onChange={e => changeValue(e)}
              />
              <Button
                colorScheme="blue"
                isDisabled={!valid}
                onClick={() => generate()}
              >
                Generate
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default Generator;
