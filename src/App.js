import { React } from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Home } from "./layouts/Home";
import { History } from "./layouts/History";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <DndProvider backend={HTML5Backend}>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </DndProvider>
    </div>
  );
}

export default App;
