import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PlantPage from './pages/PlantPage';
import DiseasePage from './pages/DiseasePage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <Routes>
      {/* layout это общая шапка для всех страниц */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="plants/:plantId" element={<PlantPage />} />
        <Route path="plants/:plantId/:diseaseId" element={<DiseasePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
