
import { useState, useRef, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface DraggableOptions {
  initialPosition?: Position;
  boundarySelector?: string;
  storageKey?: string;
}

export const useDraggable = (options: DraggableOptions = {}) => {
  const {
    initialPosition = { x: 20, y: 20 },
    boundarySelector = 'body',
    storageKey = 'widget-position'
  } = options;

  // Try to get saved position from localStorage
  const getSavedPosition = useCallback((): Position => {
    if (typeof window === 'undefined') return initialPosition;
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : initialPosition;
    } catch (e) {
      console.error('Failed to parse saved position', e);
      return initialPosition;
    }
  }, [initialPosition, storageKey]);

  const [position, setPosition] = useState<Position>(getSavedPosition);
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const startPosRef = useRef<Position>({ x: 0, y: 0 });
  const offsetRef = useRef<Position>({ x: 0, y: 0 });

  // Save position to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(position));
    }
  }, [position, storageKey]);

  // Initialize from localStorage on mount
  useEffect(() => {
    setPosition(getSavedPosition());
  }, [getSavedPosition]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    
    e.preventDefault();
    setIsDragging(true);
    
    // Record the initial mouse position
    startPosRef.current = { x: e.clientX, y: e.clientY };
    
    // Record the current position of the element
    offsetRef.current = { ...position };
    
    // Add grabbing cursor to the body
    document.body.classList.add('grabbing');
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !elementRef.current) return;
    
    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;
    
    // Calculate new position
    let newX = offsetRef.current.x + dx;
    let newY = offsetRef.current.y + dy;
    
    // Get boundary element
    const boundaryEl = document.querySelector(boundarySelector);
    if (boundaryEl && elementRef.current) {
      const boundaryRect = boundaryEl.getBoundingClientRect();
      const elementRect = elementRef.current.getBoundingClientRect();
      
      // Ensure the element stays within boundaries
      const maxX = boundaryRect.width - elementRect.width;
      const maxY = boundaryRect.height - elementRect.height;
      
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
    }
    
    setPosition({ x: newX, y: newY });
  }, [isDragging, boundarySelector]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      document.body.classList.remove('grabbing');
    }
  }, [isDragging]);

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('grabbing');
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    position,
    isDragging,
    elementRef,
    handleMouseDown,
    setPosition
  };
};
