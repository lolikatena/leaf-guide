import { Link, useParams } from 'react-router-dom';
import { Button, Text, Title } from '@mantine/core';
import { findPlant } from '../data/plants';

export default function DiseasePage() {
  const { plantId, diseaseId } = useParams();
  const plant = findPlant(plantId);

  // сначала нашли растение, потом внутри него болезнь
  const disease = plant?.diseases.find((d) => d.id === diseaseId);

  if (!plant || !disease) {
    return (
      <>
        <Title order={1} mb={16}>
          Болезнь не найдена
        </Title>
        <Button component={Link} to="/">
          К списку растений
        </Button>
      </>
    );
  }

  return (
    <>
      <Text opacity={0.6} mb={8}>
        {plant.name}
      </Text>

      <h1 className="display">{disease.name}</h1>
      <p className="lead">{disease.description}</p>

      <div className="grid-2">
        <section className="label-card">
          <Title order={2} size="h4" mb={12}>
            Симптомы на листьях
          </Title>
          <Text size="sm">{disease.symptoms}</Text>
        </section>

        <section className="label-card label-card--danger">
          <Title order={2} size="h4" mb={12}>
            Как лечить
          </Title>
          <Text size="sm">{disease.treatment}</Text>
        </section>
      </div>

      <Button component={Link} to={'/plants/' + plant.id} variant="subtle" mt={28}>
        Назад к болезням растения
      </Button>
    </>
  );
}
