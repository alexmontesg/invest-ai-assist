import { FormatNumber } from '@chakra-ui/react';
import { Money } from '@/domain/money';

type Props = {
  value: number | Money;
  style: 'number' | 'currency';
};

export default function OrderFieldValue({ value, style }: Props) {
  if (style === 'number') {
    return <FormatNumber value={value as number} />;
  }

  const money = Money.fromJson(value as Money);
  return (
    <FormatNumber
      value={money.amount}
      style="currency"
      currency={money.currency}
    />
  );
}
