import { HStack, Separator } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import routes from '@/router/routes';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t } = useTranslation('translation', { keyPrefix: 'menu' });

  return (
    <nav>
      <HStack separator={<Separator />}>
        {routes.map((r) => (
          <Link key={r.id} to={r.path}>
            {t(r.id)}
          </Link>
        ))}
      </HStack>
    </nav>
  );
}
