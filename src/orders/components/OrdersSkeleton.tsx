import { Card, Stack, SkeletonText } from '@chakra-ui/react';

export default function OrdersSkeleton() {
  return (
    <Stack>
      {new Array(2).fill(true).map((_, idx) => {
        return (
          <Card.Root key={idx} gap={4}>
            <Card.Body>
              <SkeletonText noOfLines={3} />
            </Card.Body>
          </Card.Root>
        );
      })}
    </Stack>
  );
}
