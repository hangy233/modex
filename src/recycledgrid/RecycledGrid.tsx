import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useRect } from '../hooks/useRect';
import './RecycledGrid.css';

type RecycledGridProps<T> = {
  list: Array<T>;
  itemWidth: number;
  itemHeight: number;
  initCursor?: number;
  keyField?: string;
  ItemComponent: React.ComponentType<T>;
}

const RecycledGrid = ({list, ItemComponent, itemWidth, itemHeight, initCursor = 0, keyField} : RecycledGridProps<any>): JSX.Element => {
  const gridRef = useRef(null);
  const {width: gridWidth, height: gridHeight} = useRect(gridRef);
  const columns = (gridWidth / itemWidth) | 0;
  const rows = (list.length / columns) | 0 + 1;
  const scrollHeight = rows * itemHeight;
  const visibleRows = (gridHeight / itemHeight) | 0 + 1;

  const [cursor, setCursor] = useState(initCursor);

  useEffect(() => {
    setCursor(initCursor);
  }, [list]);

  const start = Math.max(cursor - visibleRows, 0);
  const end = cursor + visibleRows * 2 * columns;

  const filteredList = list.slice(start, end);

  return (
    <div ref={gridRef} className="recycled-grid" style={{gridTemplateColumns: `repeat(auto-fill, minmax(${itemWidth}px, 1fr))`}}>
      {filteredList.map((item, i) => <ItemComponent key={keyField ? item[keyField] : i} {...item} />)}
    </div>
  );
}

export default RecycledGrid;
