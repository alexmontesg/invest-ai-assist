import { Flex, IconButton, List } from '@chakra-ui/react';
import { CiTrash } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';

import useWatchlist from '@/watchlist/hooks/useWatchlist';

export default function AssetList({ assets }: { assets: Array<string> }) {
  const { t } = useTranslation('translation', { keyPrefix: 'watchlist' });
  const { handleRemove } = useWatchlist();

  return (
    <List.Root variant="plain">
      {assets.map((asset) => (
        <List.Item key={asset} mb="4">
          <Flex gap="6" align="center" width="100%" justify="space-between">
            <span>{t(asset)}</span>
            <IconButton
              onClick={() => handleRemove(asset)}
              alignSelf="end"
              size="md"
              colorPalette="red"
              aria-label={t('button.remove', { asset })}
            >
              <CiTrash />
            </IconButton>
          </Flex>
        </List.Item>
      ))}
    </List.Root>
  );
}
