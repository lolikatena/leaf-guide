import { Link, useParams } from 'react-router-dom';
import { Button, Title } from '@mantine/core';
import DiseaseCard from '../components/DiseaseCard';
import { findPlant } from '../data/plants';

export default function PlantPage() {
  // достаём id растения из адреса, например /plants/tomato
  const { plantId } = useParams();
  const plant = findPlant(plantId);

  if (!plant) {
    return (
      <>
        <Title order={1} mb={16}>
          Растение не найдено
        </Title>
        <Button component={Link} to="/">
          К списку растений
        </Button>
      </>
    );
  }

  return (
    <>
      <h1 className="display">{plant.name}</h1>
      <p className="lead">Самые частые болезни этого растения.</p>

      <div className="grid-2">
        {plant.diseases.map((disease) => (
          <DiseaseCard key={disease.id} plantId={plant.id} disease={disease} />
        ))}
      </div>

      <Button component={Link} to="/" variant="subtle" mt={28}>
        Все растения
      </Button>
    </>
  );
}
