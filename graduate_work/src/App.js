import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/Routes";
import MainPage from "./pages/MainPage/MainPage";


import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.MAIN_PAGE} element={<MainPage />} />
    </Routes>
  );
}

export default App;
