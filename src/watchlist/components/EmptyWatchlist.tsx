import { EmptyState, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { AiOutlineStock } from 'react-icons/ai';

export default function EmptyWatchlist() {
  const { t } = useTranslation('translation', { keyPrefix: 'watchlist' });

  return (
    <EmptyState.Root role="status" aria-label="empty-watchlist">
      <EmptyState.Content>
        <EmptyState.Indicator>
          <AiOutlineStock />
        </EmptyState.Indicator>

        <VStack textAlign="center">
          <EmptyState.Title>{t('empty.title')}</EmptyState.Title>
          <EmptyState.Description>
            {t('empty.description')}
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
