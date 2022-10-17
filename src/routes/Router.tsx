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
        <Route path="cards/:slug" element={<CardsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
