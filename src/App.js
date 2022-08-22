import "./App.css";
import VocaList from "./component/VocaList";
import Header from "./component/Header";
import Voca from "./component/Voca";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmptyPage from "./component/EmptyPage";
import CreateWord from "./component/CreateWord";
import CreateVoca from "./component/CreateVoca";

function App() {
  return (
    // JSX (JavaScript XML)
    // Routes 내부는 각각 다른 페이지, 외부는 공통
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<VocaList />} />
          <Route path="/voca/:vocaId" element={<Voca />} />
          <Route path="/create_voca" element={<CreateVoca />} />
          <Route path="*" element={<EmptyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
