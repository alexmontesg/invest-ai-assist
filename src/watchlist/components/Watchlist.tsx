import { Container, Separator, Stack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import useWatchlist from '@/watchlist/hooks/useWatchlist';
import AssetInput from '@/watchlist/components/AssetInput';
import AssetList from '@/watchlist/components/AssetList';
import EmptyWatchlist from '@/watchlist/components/EmptyWatchlist';
import { bootstrapWatchlist } from '@/watchlist/state/bootstrap';
import SkeletonWatchlist from '@/watchlist/components/SkeletonWatchlist';

function WatchlistContent({ isLoading }: { isLoading: boolean }) {
  const { assets, handleRemove, handleAdd } = useWatchlist();

  if (isLoading) {
    return <SkeletonWatchlist />;
  }

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

export default function Watchlist() {
  const { isLoading } = useQuery({
    queryKey: ['watchlist'],
    queryFn: bootstrapWatchlist,
  });

  return (
    <Container
      as="aside"
      maxW="96"
      aria-busy={isLoading}
      aria-label="watchlist"
    >
      <WatchlistContent isLoading={isLoading} />
    </Container>
  );
}
