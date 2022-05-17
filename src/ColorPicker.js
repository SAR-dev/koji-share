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
} from '@chakra-ui/react';
import { SketchPicker } from 'react-color';

function ColorPicker({ picker, setPicker, bg, setBg }) {
  const [color, setColor] = useState(bg);

  const handleChangeComplete = c => {
    setColor(c.hex);
  };

  const submit = () => {
    setBg(color);
    setPicker(false);
  };

  return (
    <Modal isOpen={picker} onClose={() => setPicker(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={5}>
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
          <Button colorScheme="blue" w="100%" mt={5} onClick={() => submit()}>
            Set Color
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ColorPicker;
