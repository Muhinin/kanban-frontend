import { XYCoord } from "react-dnd";

export const getCustomDragLayerStyles = (
    initialOffset: XYCoord | null,
    currentOffset: XYCoord | null,
  ) => {
    if (!initialOffset || !currentOffset) {
      return {
        display: "none",
      };
    }
  
    let { x, y } = currentOffset;
  
    const transform = `translate(${x}px, ${y}px)`;
  
    return {
      transform,
      WebkitTransform: transform,
    };
  };
  