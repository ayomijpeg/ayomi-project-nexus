import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <Routes>
        {/* The Home Page (List of Products) */}
        <Route path="/" element={<Catalog />} />
        
        {/* The Detail Page (Specific Product) */}
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
