// типы всех данных приложения, лежат в одном месте

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

// состояние загрузки данных
export type Status = 'loading' | 'error' | 'ready';
