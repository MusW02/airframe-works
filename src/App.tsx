import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AirplaneProvider } from './context/AirplaneContext';
import Header from './components/common/Header';
import CatalogPage from './pages/Catalog';
import AirplaneDetailPage from './pages/AirplaneDetail';
import ComparisonPage from './pages/Comparison';
import HomePage from './pages/Home';
import './App.css';

function App() {
  return (
    <AirplaneProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/airplane/:id" element={<AirplaneDetailPage />} />
              <Route path="/compare" element={<ComparisonPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AirplaneProvider>
  );
}

export default App;
