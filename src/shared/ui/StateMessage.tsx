import { Button, Loader, Text, Title } from '@mantine/core';

type Props = {
  kind: 'loading' | 'error' | 'empty';
  title: string;
  text?: string;
  onRetry?: () => void;
};

// один компонент на три состояния: загрузка, ошибка, ничего не найдено
export default function StateMessage({ kind, title, text, onRetry }: Props) {
  return (
    <div className="state appear">
      {kind === 'loading' && <Loader color="olive" mb={16} />}

      <Title order={2} size="h4" mb={6}>
        {title}
      </Title>

      {text && (
        <Text size="sm" opacity={0.7} mb={16}>
          {text}
        </Text>
      )}

      {kind === 'error' && onRetry && <Button onClick={onRetry}>Повторить</Button>}
    </div>
  );
}
