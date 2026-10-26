import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../shared/ui/Layout';
import HomePage from '../pages/HomePage';
import PlantPage from '../pages/PlantPage';
import DiseasePage from '../pages/DiseasePage';
import AboutPage from '../pages/AboutPage';
import { fetchPlants } from '../entities/plant/api';
import type { Disease, Plant, Status } from '../entities/plant/types';

export default function App() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  // грузим данные, вынесла в функцию чтобы кнопка «повторить» вызывала её же
  function loadPlants() {
    setStatus('loading');

    fetchPlants()
      .then((data) => {
        setPlants(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }

  // пустой массив = выполнить один раз при запуске
  useEffect(() => {
    loadPlants();
  }, []);

  // добавляем болезнь нужному растению
  function addDisease(plantId: string, disease: Disease) {
    setPlants(
      plants.map((plant) =>
        plant.id === plantId ? { ...plant, diseases: [...plant.diseases, disease] } : plant
      )
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage plants={plants} status={status} onRetry={loadPlants} />} />
        <Route
          path="plants/:plantId"
          element={
            <PlantPage plants={plants} status={status} onRetry={loadPlants} onAdd={addDisease} />
          }
        />
        <Route
          path="plants/:plantId/:diseaseId"
          element={<DiseasePage plants={plants} status={status} />}
        />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<HomePage plants={plants} status={status} onRetry={loadPlants} />} />
      </Route>
    </Routes>
  );
}
