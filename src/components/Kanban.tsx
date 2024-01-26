import React, { useEffect, useState } from "react";

import { taskStatus, taskType } from "../types/types";
import CustomDragLayer from "./CustomDragLayer";
import KanbanColumn from "./KanbanColumn";
import { mochTasks } from "../moch/tasks";
import KanbanCard from "./KanbanCard";

import "./Kanban.scss";

const KanbanPage: React.FC = () => {
  const [kanbanTasksList, setKanbanTasksList] = useState<taskType[]>(mochTasks);

  const [tasks, setTasks] = useState<{
    forExecution: taskType[];
    inProgress: taskType[];
    inReview: taskType[];
    complete: taskType[];
  }>({
    forExecution: [],
    inProgress: [],
    inReview: [],
    complete: [],
  });

  const [currentItem, setCurrentItem] = useState<taskType | null>(null);
  const [currentColumn, setCurrentColumn] = useState<taskStatus | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    column: taskStatus,
    item: taskType
  ) => {
    setIsDragging(true);
    setCurrentItem(item);
    setCurrentColumn(column);
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropTaskHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, column: taskStatus) => {
    e.preventDefault();
    if (currentColumn && currentItem) {
      if (currentColumn !== column && currentItem) {
        setKanbanTasksList(
          kanbanTasksList.map((item) =>
            item.id === currentItem?.id ? { ...item, status: column } : item
          )
        );
      }
    }
    onDragEnd();
  };

  useEffect(() => {
    setTasks({
      forExecution: kanbanTasksList.filter(
        (task) => task.status === taskStatus.FOR_EXECUTION
      ),
      inProgress: kanbanTasksList.filter(
        (task) => task.status === taskStatus.IN_PROGRESS
      ),
      inReview: kanbanTasksList.filter(
        (task) => task.status === taskStatus.IN_REVIEW
      ),
      complete: kanbanTasksList.filter(
        (task) => task.status === taskStatus.COMPLETE
      ),
    });
  }, [kanbanTasksList]);

  const getTasksColumnContent = (tasks: taskType[], column: taskStatus) =>
    tasks.map((task) => (
      <KanbanCard
        onDrop={onDrop}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        key={task.id}
        task={task}
        column={column}
      />
    ));

  return (
    <main>
      <div className="kanban-page__container">
        <KanbanColumn
          header="For execution"
          content={getTasksColumnContent(
            tasks.forExecution,
            taskStatus.FOR_EXECUTION
          )}
          onDrop={(e: React.DragEvent<HTMLDivElement>) =>
            onDrop(e, taskStatus.FOR_EXECUTION)
          }
          onDragOver={dropTaskHandler}
          isDragging={isDragging && currentColumn !== taskStatus.FOR_EXECUTION}
        />
        <KanbanColumn
          header="In progress"
          content={getTasksColumnContent(
            tasks.inProgress,
            taskStatus.IN_PROGRESS
          )}
          onDrop={(e: React.DragEvent<HTMLDivElement>) =>
            onDrop(e, taskStatus.IN_PROGRESS)
          }
          onDragOver={dropTaskHandler}
          isDragging={isDragging && currentColumn !== taskStatus.IN_PROGRESS}
        />
        <KanbanColumn
          header="In review"
          content={getTasksColumnContent(tasks.inReview, taskStatus.IN_REVIEW)}
          onDrop={(e: React.DragEvent<HTMLDivElement>) =>
            onDrop(e, taskStatus.IN_REVIEW)
          }
          onDragOver={dropTaskHandler}
          isDragging={isDragging && currentColumn !== taskStatus.IN_REVIEW}
        />
        <KanbanColumn
          header="Complete"
          content={getTasksColumnContent(tasks.complete, taskStatus.COMPLETE)}
          onDrop={(e: React.DragEvent<HTMLDivElement>) =>
            onDrop(e, taskStatus.COMPLETE)
          }
          onDragOver={dropTaskHandler}
          isDragging={isDragging && currentColumn !== taskStatus.COMPLETE}
        />
      </div>
      <CustomDragLayer />
    </main>
  );
};

export default KanbanPage;
