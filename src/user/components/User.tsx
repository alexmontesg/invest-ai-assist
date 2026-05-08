import { memo } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import UserDebt from '@/user/components/UserDebt';

function User() {
  return (
    <Grid as="section" templateColumns={{ base: '1fr', md: '1fr 1fr' }}>
      <GridItem>
        <UserDebt />
      </GridItem>
    </Grid>
  );
}

export default memo(User);
