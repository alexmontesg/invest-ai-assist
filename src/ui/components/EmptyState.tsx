import { EmptyState as ChakraEmptyState, VStack } from '@chakra-ui/react';
import type { ElementType } from 'react';
import { useTranslation } from 'react-i18next';

type EmptyStateParams = {
  keyPrefix: string;
  Icon: ElementType;
};

export default function EmptyState({ keyPrefix, Icon }: EmptyStateParams) {
  const { t } = useTranslation('translation', { keyPrefix });

  return (
    <ChakraEmptyState.Root role="status" aria-label="empty-watchlist">
      <ChakraEmptyState.Content>
        <ChakraEmptyState.Indicator>
          <Icon />
        </ChakraEmptyState.Indicator>

        <VStack textAlign="center">
          <ChakraEmptyState.Title>{t('empty.title')}</ChakraEmptyState.Title>
          <ChakraEmptyState.Description>
            {t('empty.description')}
          </ChakraEmptyState.Description>
        </VStack>
      </ChakraEmptyState.Content>
    </ChakraEmptyState.Root>
  );
}
