import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import CardsPage from "pages/CardsPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="cards" element={<CardsPage />} />
        <Route path="cards/:slugs" element={<CardsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
