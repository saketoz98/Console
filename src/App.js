import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./component/HomePage/HomePage";
import NotFound from "./component/NotFound/NotFound";
import { DummyProvider } from "./context/DummyContext";

function App() {
  return (
    <div className="h-screen">
      <DummyProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DummyProvider>
    </div>
  );
}

export default App;
