import React, { useEffect } from "react";

import { getEmptyImage } from "react-dnd-html5-backend";
import { Avatar } from "@mui/material";
import { useDrag } from "react-dnd";

import { taskStatus, taskType } from "../types/types";

import "./KanbanCard.scss";

interface IKanbanCard {
  task: taskType;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    column: taskStatus,
    task: taskType
  ) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (
    e: React.DragEvent<HTMLDivElement>,
    column: taskStatus,
    task: taskType
  ) => void;
  column: taskStatus;
  onClick?: (id: number) => void;
}

const KanbanCard: React.FC<IKanbanCard> = ({
  task,
  onDragEnd,
  onDragOver,
  onDragStart,
  onDrop,
  column,
  onClick,
}) => {
  const dragStartHandle = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(e, column, task);
  };

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "CARD",
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleCardClick = () => onClick && onClick(task.id);

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div
      ref={dragPreview}
      className={`kanban-card__${
        isDragging ? "drag-preview-active" : "drag-preview"
      }`}
    >
      <div
        ref={drag}
        style={{ opacity: isDragging ? 0 : 1 }}
        className="kanban-card__container"
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragStart={dragStartHandle}
        onDrop={(e: React.DragEvent<HTMLDivElement>) => onDrop(e, column, task)}
        onClick={handleCardClick}
        draggable
      >
        <div className="kanban-card__title">{task.title}</div>
        <div className="kanban-card__content">
          <div className="kanban-card__subtitle-container">
              <Avatar
                src={task.executor?.imageUrl && require(`../assets/images/${task.executor?.imageUrl}`)}
              />
            <p className="kanban-card__user-name">
              {task.executor?.name || "No executor"}
            </p>
          </div>
          <div className="kanban-card__info-block">
            <div className="kanban-card__duration-section">
              <p>{task?.date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
