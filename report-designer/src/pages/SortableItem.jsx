/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (props.isNew) {
      setIsNew(true);
    }
  }, [props.isNew]);

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition ? `${transition}, opacity 250ms ease` : undefined,
    opacity: transition ? 0.5 : 1,
    animation: isNew ? "appear 500ms ease-out" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  );
}
