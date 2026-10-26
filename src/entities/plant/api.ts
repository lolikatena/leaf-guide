import { LOAD_DELAY, SIMULATE_ERROR } from '../../shared/config';
import type { Disease, Plant } from './types';

// пока заглушки, настоящие данные придут с бэкенда
const placeholderDiseases: Disease[] = [
  {
    id: 'disease-1',
    name: 'Болезнь 1',
    description: 'Описание болезни 1',
    symptoms: 'Симптомы 1',
    treatment: 'Лечение 1',
  },
  {
    id: 'disease-2',
    name: 'Болезнь 2',
    description: 'Описание болезни 2',
    symptoms: 'Симптомы 2',
    treatment: 'Лечение 2',
  },
  {
    id: 'disease-3',
    name: 'Болезнь 3',
    description: 'Описание болезни 3',
    symptoms: 'Симптомы 3',
    treatment: 'Лечение 3',
  },
];

const demoPlants: Plant[] = [
  { id: 'tomato', name: 'Томат', diseases: placeholderDiseases },
  { id: 'potato', name: 'Картофель', diseases: placeholderDiseases },
  { id: 'cucumber', name: 'Огурец', diseases: placeholderDiseases },
  { id: 'apple', name: 'Яблоня', diseases: placeholderDiseases },
  { id: 'grape', name: 'Виноград', diseases: placeholderDiseases },
  // у розы специально нет болезней, чтобы показать пустой экран
  { id: 'rose', name: 'Роза', diseases: [] },
];

// делаем вид, что данные приходят с сервера: с задержкой и через промис
export function fetchPlants(): Promise<Plant[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (SIMULATE_ERROR) {
        reject(new Error('не удалось загрузить данные'));
      } else {
        resolve(demoPlants);
      }
    }, LOAD_DELAY);
  });
}

export function findPlant(plants: Plant[], id: string | undefined) {
  return plants.find((plant) => plant.id === id);
}
