import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { useRect } from '../hooks/useRect';
import { debounce } from '../utils';
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
  const [gridRef, {width: gridWidth, height: gridHeight}] = useRect<HTMLDivElement>();
  const [topSentinelRef, isTopSentinelInView] = useIntersectionObserver<HTMLDivElement>({rootMargin: '100px 0px 100px 0px'});
  const [bottomSentinelRef, isBottomSentinelInView] = useIntersectionObserver<HTMLDivElement>();
  const columns = (gridWidth / itemWidth) | 0;
  const rows = (list.length / columns) | 0 + 1;
  const scrollHeight = rows * itemHeight;
  const visibleRows = (gridHeight / itemHeight) | 0 + 1;

  const [cursor, setCursor] = useState(initCursor);
  const [scrollTop, setScrollTop] = useState((initCursor / columns) | 0);

  useEffect(() => {
    if (isTopSentinelInView) {
      setCursor((prevCursor) => Math.max(0, prevCursor - visibleRows * columns));
    }
  }, [isTopSentinelInView]);

  useEffect(() => {
    if (isBottomSentinelInView) {
      setCursor((prevCursor) => Math.min((rows - visibleRows * 2) * columns, prevCursor + visibleRows * columns));
    }
  }, [isBottomSentinelInView]);

  useEffect(() => {
    if ((scrollTop < topPadding) || (scrollTop > (scrollHeight - bottomPadding))) {
      setCursor(((scrollTop / itemHeight) | 0) * columns);
    }
  }, [scrollTop]);

  const start = Math.max(cursor - visibleRows * columns, 0);
  const end = cursor + visibleRows * 2 * columns;
  const filteredList = list.slice(start, end);
  const topPadding = Math.max(0, cursor / columns - visibleRows) * itemHeight;
  const bottomPadding = (rows - cursor / columns + visibleRows * 2) * itemHeight;

  const handleScroll = useCallback(() => {
    if (!gridRef.current) return;
    setScrollTop(gridRef.current.scrollTop);
  }, []);

  const debouncedHandleScroll = useMemo(() => debounce(handleScroll), []);

  return (
    <div ref={gridRef} className="recycled-grid" style={{
      gridTemplateColumns: `repeat(auto-fill, minmax(${itemWidth}px, 1fr))`,
      }} onScroll={debouncedHandleScroll}>
      <div className="scroll-content" style={{height: `${scrollHeight}px`}}>
        <div className="inner-grid-content" style={{transform: `translateY(${topPadding}px)`}}>
          <div ref={topSentinelRef} className="top-sentinel"></div>
          {filteredList.map((item, i) => <ItemComponent key={keyField ? item[keyField] : i} {...item} />)}
          <div ref={bottomSentinelRef} className="bottom-sentinel"></div>
        </div>
      </div>
    </div>
  );
}

export default RecycledGrid;
