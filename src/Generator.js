import { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  Button,
  useToast,
  IconButton,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import Iframe from 'react-iframe';
import { AiOutlineReload } from 'react-icons/ai';
import { MdColorLens, MdTextFields } from 'react-icons/md';
import { useCopyToClipboard } from 'usehooks-ts';
import ColorPicker from './ColorPicker';
import TextEditor from './TextEditor';
import axios from 'axios';

const frameH = 450;
const frameW = 800;
const apiUrl = "http://localhost:3001"

function Generator() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, copy] = useCopyToClipboard();

  const [picker, setPicker] = useState(false);
  const [bg, setBg] = useState('#4C6EF5');

  const [editor, setEditor] = useState(false);
  const [text, setText] = useState('Koji Me');

  const [id, setId] = useState(null);

  const toast = useToast();

  function drop() {
    setId(null)
    navigator.clipboard
      .readText()
      .then(text => {
        setUrl(text);
      })
      .catch(err => {
        console.error('Failed to read clipboard contents: ', err);
      });
  }

  const onSubmit = async e => {
    setId(null)
    setLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/generate?url=${url}&bg=${bg}&text=${text}`,
        ''
      );
      setId(res.data.data.id);
      setLoading(false);
    } catch (e) {
      toast({
        title: 'Sorry!',
        description: 'Error occured.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  function runCopy() {
    if (id) {
      copy(
        `<iframe src="${apiUrl}/generate?id=${id}" title="description" scrolling="no" height="450" width="800"></iframe>`
      );
      toast({
        title: 'Copied.',
        description: 'Code has been copied.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
    } else {
      toast({
        title: 'Sorry!',
        description: 'Generate a thumbnail first.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
    }
  }

  return (
    <Box textAlign="center" fontSize="xl">
      <Box minH="100vh" p={3}>
        <Flex w="100%" h="100vh" justifyContent={'center'} alignItems="center">
          <Flex
            borderWidth={1}
            borderStyle="solid"
            borderColor="gray.300"
            pl={5}
            rounded="md"
            pos="relative"
          >
            <Box py={5}>
              <Box
                h={frameH}
                w={frameW}
                rounded="md"
                overflow={'hidden'}
                pos="relative"
                bg="gray.300"
              >
                {id && (
                  <Iframe
                    url={`${apiUrl}/generate?id=${id}`}
                    width={`${frameW}px`}
                    height={`${frameH}px`}
                    id="c-iframe"
                    display="initial"
                    position="relative"
                    scrolling='no'
                  />
                )}
                <Button
                  pos="absolute"
                  top="0"
                  right="0"
                  m={10}
                  size="sm"
                  bg="gray.900"
                  color="white"
                  _hover={{ bg: 'gray.800' }}
                  _focus={{ bg: 'gray.800' }}
                  _active={{ bg: 'gray.800' }}
                  zIndex={2}
                  onClick={() => runCopy()}
                >
                  Get the code
                </Button>
                {!id && (
                <Flex
                  pos="absolute"
                  top="0"
                  left="0"
                  bg="rgba(193, 194, 197, .5)"
                  h={frameH}
                  w="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems={'center'}
                >
                  <Button
                    bg={bg}
                    color="white"
                    _hover={{ bg: bg }}
                    _focus={{ bg: bg }}
                    _active={{ bg: bg }}
                  >
                    {text}
                  </Button>
                </Flex>
                )}
              </Box>
              <Flex mt={5}>
                <Input
                  w="100%"
                  mr={2}
                  variant="filled"
                  placeholder="Paste your link here..."
                  borderColor="gray.300"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                />
                <Button
                  bg="gray.900"
                  color="white"
                  _hover={{ bg: 'gray.800' }}
                  _focus={{ bg: 'gray.800' }}
                  _active={{ bg: 'gray.800' }}
                  onClick={() => drop()}
                  w="250px"
                >
                  Drop Your Koji Link
                </Button>
              </Flex>
            </Box>
            <Box
              p={5}
              ml={5}
              borderLeftWidth={1}
              borderStyle="solid"
              borderColor="gray.300"
            >
              <SimpleGrid columns={1} spacing={5}>
                <IconButton
                  bg={bg}
                  color="white"
                  _hover={{ bg: bg }}
                  _focus={{ bg: bg }}
                  _active={{ bg: bg }}
                  icon={<MdColorLens />}
                  onClick={() => setPicker(true)}
                />
                <IconButton
                  bg="gray.900"
                  color="white"
                  _hover={{ bg: 'gray.800' }}
                  _focus={{ bg: 'gray.800' }}
                  _active={{ bg: 'gray.800' }}
                  icon={<MdTextFields />}
                  onClick={() => setEditor(true)}
                />
                <IconButton
                  bg="gray.900"
                  color="white"
                  _hover={{ bg: 'gray.800' }}
                  _focus={{ bg: 'gray.800' }}
                  _active={{ bg: 'gray.800' }}
                  icon={<AiOutlineReload />}
                  onClick={() => onSubmit()}
                />
              </SimpleGrid>
            </Box>
            {loading && (
            <Flex
              pos="absolute"
              top="0"
              left="0"
              justifyContent="center"
              alignItems="center"
              w="100%"
              h="100%"
              bg="rgba(0, 0, 0, 1)"
              rounded="md"
              zIndex={10}
            >
              <Box>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
              <Text color="white" mt={3}>Wait for a while...</Text>
              </Box>
            </Flex>
           )}
          </Flex>
        </Flex>
      </Box>
      <ColorPicker
        picker={picker}
        setPicker={setPicker}
        bg={bg}
        setBg={setBg}
      />
      <TextEditor
        picker={editor}
        setPicker={setEditor}
        bg={text}
        setBg={setText}
      />
    </Box>
  );
}

export default Generator;
