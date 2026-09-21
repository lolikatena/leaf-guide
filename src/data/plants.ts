export type Disease = {
  id: string;
  name: string;
  description: string;
  symptoms: string;
  treatment: string;
};

export type Plant = {
  id: string;
  name: string;
  diseases: Disease[];
};

// пока заглушки, настоящие данные добавим позже
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

export const plants: Plant[] = [
  { id: 'tomato', name: 'Томат', diseases: placeholderDiseases },
  { id: 'potato', name: 'Картофель', diseases: placeholderDiseases },
  { id: 'cucumber', name: 'Огурец', diseases: placeholderDiseases },
  { id: 'apple', name: 'Яблоня', diseases: placeholderDiseases },
  { id: 'grape', name: 'Виноград', diseases: placeholderDiseases },
  { id: 'rose', name: 'Роза', diseases: placeholderDiseases },
];

// ищем растение по id из адреса страницы
export function findPlant(id: string | undefined) {
  return plants.find((plant) => plant.id === id);
}
