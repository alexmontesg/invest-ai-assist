import { memo, useState } from 'react';
import { Container, List } from '@chakra-ui/react';

import userDebt from '@/user/mocks/userDebt.json';
import type { UserDebt } from '@/user/types/user';
import UserDebtItem from '@/user/components/UserDebtItem';

function UserDebt() {
  const [debt] = useState<UserDebt>(userDebt);

  return (
    <Container as="section">
      <List.Root variant="plain" gap={8}>
        {debt.items.map((item) => {
          return (
            <List.Item key={item.id}>
              <UserDebtItem item={item} />
            </List.Item>
          );
        })}
      </List.Root>
    </Container>
  );
}

export default memo(UserDebt);
