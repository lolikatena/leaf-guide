import { Link } from 'react-router-dom';
import { Text } from '@mantine/core';
import { plants } from '../data/plants';

export default function HomePage() {
  return (
    <>
      <h1 className="display">Чем болеет растение?</h1>

      <p className="lead">
        Выберите растение, чтобы посмотреть его самые частые болезни, симптомы на
        листьях и инструкции по лечению.
      </p>

      {/* карточка на каждое растение из списка */}
      <div className="grid-3">
        {plants.map((plant) => (
          <Link key={plant.id} to={'/plants/' + plant.id} className="plant-card">
            <span className="plant-card__name">{plant.name}</span>
            <Text size="sm" opacity={0.6}>
              Болезней в справочнике: {plant.diseases.length}
            </Text>
          </Link>
        ))}
      </div>
    </>
  );
}
