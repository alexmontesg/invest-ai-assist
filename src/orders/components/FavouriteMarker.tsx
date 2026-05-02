import { Box, Icon } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

export default function FavouriteMarker() {
  return (
    <Box
      position="absolute"
      top="0"
      right="0"
      w="60px"
      h="60px"
      bg="bg.emphasized"
      display="flex"
      alignItems="center"
      justifyContent="center"
      clipPath="polygon(100% 0, 0 0, 100% 100%)"
      zIndex="1"
    >
      <Icon
        as={FaStar}
        color="yellow.fg"
        boxSize="20px"
        position="absolute"
        top="10px"
        right="10px"
      />
    </Box>
  );
}
