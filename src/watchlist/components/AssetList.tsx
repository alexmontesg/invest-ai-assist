import { memo } from 'react';
import { Flex, IconButton, List } from '@chakra-ui/react';
import { CiTrash } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';

type AssetListProps = {
  assets: Array<string>;
  handleRemove: (asset: string) => void;
};

function AssetList({ assets, handleRemove }: AssetListProps) {
  const { t } = useTranslation('translation');

  return (
    <List.Root variant="plain" aria-label="watchlist-assets">
      {assets.map((asset) => (
        <List.Item key={asset} mb="4">
          <Flex gap="6" align="center" width="100%" justify="space-between">
            <span>{t(asset)}</span>
            <IconButton
              onClick={() => handleRemove(asset)}
              alignSelf="end"
              size="md"
              colorPalette="red"
              aria-label={t('watchlist.button.remove', { asset })}
            >
              <CiTrash />
            </IconButton>
          </Flex>
        </List.Item>
      ))}
    </List.Root>
  );
}

export default memo(AssetList);
