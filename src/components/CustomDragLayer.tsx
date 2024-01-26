import React, { CSSProperties } from "react";

import { useDragLayer } from "react-dnd";
import { Divider } from "@mui/material";

import { getCustomDragLayerStyles } from "../helpers/helpers";
import "./KanbanCard.scss";

const layerStyles: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
};

const CustomDragLayer: React.FC = () => {
  const { isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    initialOffset: monitor.getInitialClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || !item) return null;

  return (
    <div style={layerStyles}>
      <div
        className={`kanban-card__${
          isDragging ? "drag-preview-active" : "drag-preview"
        }`}
        style={getCustomDragLayerStyles(initialOffset, currentOffset)}
      >
        <div className="kanban-card__container-dragable">
          <div className="kanban-card__title">{item.title}</div>
          <div className="kanban-card__content">
            <div className="kanban-card__subtitle-container">
              <Divider orientation="vertical" flexItem />
              <p className="kanban-card__user-name">
                {item.executor?.name || "No executor"}
              </p>
            </div>
            <div className="kanban-card__info-block">
              <div className="kanban-card__duration-section">
                <p>{item.start_date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDragLayer;
