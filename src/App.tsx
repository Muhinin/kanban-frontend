import React from "react";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import KanbanPage from "./components/Kanban";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <KanbanPage />
    </DndProvider>
  );
}

export default App;
