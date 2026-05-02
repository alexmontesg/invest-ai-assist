import { Container, Separator, Stack } from '@chakra-ui/react';

import useWatchlist from '@/watchlist/hooks/useWatchlist';
import AssetInput from '@/watchlist/components/AssetInput';
import AssetList from '@/watchlist/components/AssetList';
import EmptyWatchlist from '@/watchlist/components/EmptyWatchlist';

export default function Watchlist() {
  const { assets, handleRemove, handleAdd } = useWatchlist();

  return (
    <Container as="aside" maxW="96">
      <Stack gap="4">
        {assets && assets.length ? (
          <AssetList assets={assets} handleRemove={handleRemove} />
        ) : (
          <EmptyWatchlist />
        )}

        <Separator />

        <AssetInput handleAdd={handleAdd} />
      </Stack>
    </Container>
  );
}
