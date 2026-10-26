import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Text, Title } from '@mantine/core';
import StateMessage from '../shared/ui/StateMessage';
import { findPlant } from '../entities/plant/api';
import type { Plant, Status } from '../entities/plant/types';

type Props = {
  plants: Plant[];
  status: Status;
};

// какая вкладка открыта
type Tab = 'symptoms' | 'treatment';

export default function DiseasePage({ plants, status }: Props) {
  const { plantId, diseaseId } = useParams();
  const [tab, setTab] = useState<Tab>('symptoms');

  if (status === 'loading') {
    return <StateMessage kind="loading" title="Загружаем болезнь" />;
  }

  const plant = findPlant(plants, plantId);
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

      {/* переключатель вкладок, текст под ним меняется */}
      <div className="tabs">
        <button
          className={tab === 'symptoms' ? 'tabs__item tabs__item--active' : 'tabs__item'}
          onClick={() => setTab('symptoms')}
        >
          Симптомы
        </button>
        <button
          className={tab === 'treatment' ? 'tabs__item tabs__item--active' : 'tabs__item'}
          onClick={() => setTab('treatment')}
        >
          Как лечить
        </button>
      </div>

      {/* key нужен чтобы блок перерисовывался и анимация повторялась */}
      <section
        key={tab}
        className={tab === 'treatment' ? 'label-card label-card--danger appear' : 'label-card appear'}
      >
        <Text size="sm">{tab === 'symptoms' ? disease.symptoms : disease.treatment}</Text>
      </section>

      <Button component={Link} to={'/plants/' + plant.id} variant="subtle" mt={28}>
        Назад к болезням растения
      </Button>
    </>
  );
}
