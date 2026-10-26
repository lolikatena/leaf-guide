import { Link } from 'react-router-dom';
import { Text } from '@mantine/core';
import type { Plant } from './types';

type Props = {
  plant: Plant;
};

export default function PlantCard({ plant }: Props) {
  return (
    <Link to={'/plants/' + plant.id} className="plant-card appear">
      <span className="plant-card__name">{plant.name}</span>
      <Text size="sm" opacity={0.6}>
        Болезней в справочнике: {plant.diseases.length}
      </Text>
    </Link>
  );
}
