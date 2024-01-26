import React from "react";

import { ConnectDropTarget, DropTargetMonitor, useDrop } from "react-dnd";

import "./KanbanColumn.scss";

interface IKanbanColumn {
  header: string;
  content: React.ReactNode[];
  variant?: string;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragging: boolean;
}

const KanbanColumn: React.FC<IKanbanColumn> = ({ header, content, onDrop, onDragOver, isDragging }) => {
  const [, drop]: [Record<string, unknown>, ConnectDropTarget] = useDrop(() => ({
    accept: "CARD",
    colect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div className={`kanban-column__container`} ref={drop} onDrop={onDrop} onDragOver={onDragOver}>
      <div className="kanban-column__header">
        {header}
        <p className="kanban-column__counter">{`(${content.length})`}</p>
      </div>
      <div className={isDragging ? "dragging-mask" : "not-display"} />
      <div className={`kanban-column__content ${!content.length ? "centered" : ""}`}>
        {content.length ? content : "No tasks yet"}
      </div>
    </div>
  );
};

export default KanbanColumn;
