import { useState } from 'react';
import PlantCard from '../entities/plant/PlantCard';
import SearchPlants from '../features/search-plants/SearchPlants';
import StateMessage from '../shared/ui/StateMessage';
import type { Plant, Status } from '../entities/plant/types';

type Props = {
  plants: Plant[];
  status: Status;
  onRetry: () => void;
};

export default function HomePage({ plants, status, onRetry }: Props) {
  const [query, setQuery] = useState('');

  // фильтруем прямо при отрисовке, отдельное состояние не нужно
  const visible = plants.filter((plant) =>
    plant.name.toLowerCase().includes(query.toLowerCase().trim())
  );

  return (
    <>
      <h1 className="display">Чем болеет растение?</h1>

      <p className="lead">
        Выберите растение, чтобы посмотреть его самые частые болезни, симптомы на
        листьях и инструкции по лечению.
      </p>

      {status === 'loading' && <StateMessage kind="loading" title="Загружаем справочник" />}

      {status === 'error' && (
        <StateMessage
          kind="error"
          title="Не удалось загрузить данные"
          text="Проверьте подключение и попробуйте ещё раз."
          onRetry={onRetry}
        />
      )}

      {status === 'ready' && (
        <>
          <SearchPlants value={query} onChange={setQuery} />

          {visible.length === 0 ? (
            <StateMessage
              kind="empty"
              title="Ничего не нашлось"
              text="Попробуйте другое название, например «томат»."
            />
          ) : (
            <div className="grid-3">
              {visible.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
