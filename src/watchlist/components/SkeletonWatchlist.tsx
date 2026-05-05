import { Stack, HStack, SkeletonText } from '@chakra-ui/react';

export default function SkeletonWatchlist() {
  return (
    <Stack>
      {new Array(3).fill(true).map((_, idx) => {
        return (
          <HStack key={idx}>
            <SkeletonText noOfLines={1} />
          </HStack>
        );
      })}
    </Stack>
  );
}
