import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Title } from '@mantine/core';
import DiseaseCard from '../entities/disease/DiseaseCard';
import AddDiseaseForm from '../features/add-disease/AddDiseaseForm';
import StateMessage from '../shared/ui/StateMessage';
import { findPlant } from '../entities/plant/api';
import type { Disease, Plant, Status } from '../entities/plant/types';

type Props = {
  plants: Plant[];
  status: Status;
  onRetry: () => void;
  onAdd: (plantId: string, disease: Disease) => void;
};

export default function PlantPage({ plants, status, onRetry, onAdd }: Props) {
  // достаём id растения из адреса, например /plants/tomato
  const { plantId } = useParams();
  const [formOpen, setFormOpen] = useState(false);

  if (status === 'loading') {
    return <StateMessage kind="loading" title="Загружаем растение" />;
  }

  if (status === 'error') {
    return (
      <StateMessage
        kind="error"
        title="Не удалось загрузить данные"
        onRetry={onRetry}
      />
    );
  }

  const plant = findPlant(plants, plantId);

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

  // добавляем болезнь и сразу закрываем форму
  function handleAdd(disease: Disease) {
    if (!plant) return;
    onAdd(plant.id, disease);
    setFormOpen(false);
  }

  return (
    <>
      <h1 className="display">{plant.name}</h1>
      <p className="lead">Самые частые болезни этого растения.</p>

      {!formOpen && (
        <Button mb={24} onClick={() => setFormOpen(true)}>
          Добавить болезнь
        </Button>
      )}

      {formOpen && <AddDiseaseForm onAdd={handleAdd} onCancel={() => setFormOpen(false)} />}

      {plant.diseases.length === 0 ? (
        <StateMessage
          kind="empty"
          title="Болезней пока нет"
          text="Добавьте первую через кнопку выше."
        />
      ) : (
        <div className="grid-2">
          {plant.diseases.map((disease) => (
            <DiseaseCard key={disease.id} plantId={plant.id} disease={disease} />
          ))}
        </div>
      )}

      <Button component={Link} to="/" variant="subtle" mt={28}>
        Все растения
      </Button>
    </>
  );
}
