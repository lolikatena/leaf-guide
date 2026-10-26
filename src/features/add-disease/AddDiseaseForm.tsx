import { useState, type FormEvent } from 'react';
import { Button, Group, TextInput, Textarea, Title } from '@mantine/core';
import type { Disease } from '../../entities/plant/types';

type Props = {
  onAdd: (disease: Disease) => void;
  onCancel: () => void;
};

// ошибки для каждого поля, пустая строка = ошибки нет
type Errors = {
  name: string;
  symptoms: string;
};

export default function AddDiseaseForm({ onAdd, onCancel }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [treatment, setTreatment] = useState('');
  const [errors, setErrors] = useState<Errors>({ name: '', symptoms: '' });

  // проверяем поля и возвращаем объект с ошибками
  function validate(): Errors {
    return {
      name:
        name.trim().length === 0
          ? 'Введите название болезни'
          : name.trim().length < 3
            ? 'Название слишком короткое, минимум 3 символа'
            : '',
      symptoms: symptoms.trim().length === 0 ? 'Опишите симптомы на листьях' : '',
    };
  }

  function handleSubmit(event: FormEvent) {
    // без этого браузер перезагрузит страницу
    event.preventDefault();

    const found = validate();
    setErrors(found);

    // если хоть одна ошибка не пустая - не отправляем
    if (found.name || found.symptoms) return;

    onAdd({
      id: 'disease-' + Date.now(),
      name: name.trim(),
      description: description.trim() || 'Описание пока не заполнено',
      symptoms: symptoms.trim(),
      treatment: treatment.trim() || 'Лечение пока не заполнено',
    });
  }

  return (
    <form className="label-card form-card appear" onSubmit={handleSubmit}>
      <Title order={3} size="h4" mb={16}>
        Новая болезнь
      </Title>

      <TextInput
        label="Название"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        error={errors.name}
        mb={12}
      />

      <Textarea
        label="Описание"
        value={description}
        onChange={(event) => setDescription(event.currentTarget.value)}
        autosize
        minRows={2}
        mb={12}
      />

      <Textarea
        label="Симптомы на листьях"
        value={symptoms}
        onChange={(event) => setSymptoms(event.currentTarget.value)}
        error={errors.symptoms}
        autosize
        minRows={2}
        mb={12}
      />

      <Textarea
        label="Как лечить"
        value={treatment}
        onChange={(event) => setTreatment(event.currentTarget.value)}
        autosize
        minRows={2}
        mb={20}
      />

      <Group>
        <Button type="submit">Добавить</Button>
        <Button variant="subtle" onClick={onCancel}>
          Отмена
        </Button>
      </Group>
    </form>
  );
}
