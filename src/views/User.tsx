import { Container, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import User from '@/user/components/User';

export default function StocksView() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'user.view',
  });

  return (
    <Container as="main">
      <Heading as="h1" mb="8">
        {t('title')}
      </Heading>

      <User />
    </Container>
  );
}
