import { Link } from 'react-router-dom';
import { Button, Text, Title } from '@mantine/core';
import type { Disease } from '../plant/types';

type Props = {
  plantId: string;
  disease: Disease;
};

export default function DiseaseCard({ plantId, disease }: Props) {
  return (
    <article className="label-card appear">
      <Title order={3} size="h4" mb={8}>
        {disease.name}
      </Title>

      <Text size="sm" opacity={0.75} mb={16}>
        {disease.description}
      </Text>

      <Button
        component={Link}
        to={'/plants/' + plantId + '/' + disease.id}
        variant="light"
        size="xs"
      >
        Подробнее
      </Button>
    </article>
  );
}
