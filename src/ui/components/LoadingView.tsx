import { Flex, Spinner } from '@chakra-ui/react';

export default function LoadingView() {
  return (
    <Flex flex="1" align="center" justify="center">
      <Spinner size="xl" />
    </Flex>
  );
}
