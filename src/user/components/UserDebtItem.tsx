import { memo } from 'react';
import { AbsoluteCenter, Card, HStack, ProgressCircle } from '@chakra-ui/react';

import type { DebtItem } from '@/user/types/user';

type DebtItemProps = {
  item: DebtItem;
};

function UserDebtItem({ item }: DebtItemProps) {
  const percentagePaid = (1 - item.outstanding.value / item.total.value) * 100;

  return (
    <Card.Root w="100%">
      <Card.Header>
        <Card.Title>{item.givenName}</Card.Title>
      </Card.Header>
      <Card.Body>
        <HStack>
          <ProgressCircle.Root size="xl" value={percentagePaid}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range />
            </ProgressCircle.Circle>
            <AbsoluteCenter>
              <ProgressCircle.ValueText fontSize="xs" />
            </AbsoluteCenter>
          </ProgressCircle.Root>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}

export default memo(UserDebtItem);
