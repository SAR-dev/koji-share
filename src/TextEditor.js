import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from '@chakra-ui/react';

function TextEditor({ picker, setPicker, bg, setBg }) {
  const [color, setColor] = useState(bg);

  const submit = () => {
    setBg(color);
    setPicker(false);
  };

  return (
    <Modal isOpen={picker} onClose={() => setPicker(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={5}>
          <Input value={color} onChange={e => setColor(e.target.value)} />
          <Button colorScheme="blue" w="100%" mt={5} onClick={() => submit()}>
            Set Title
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TextEditor;
