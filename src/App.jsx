import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Layout />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/product/:id"
          element={<ProductPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;