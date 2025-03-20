
import React from 'react';
import { cn } from '@/lib/utils';
import { GripVertical, X, Maximize2, Minimize2 } from 'lucide-react';

interface DraggableHeaderProps {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  title: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onClose?: () => void;
  className?: string;
}

const DraggableHeader: React.FC<DraggableHeaderProps> = ({
  onMouseDown,
  title,
  isExpanded,
  onToggleExpand,
  onClose,
  className
}) => {
  return (
    <div 
      onMouseDown={onMouseDown}
      className={cn(
        "h-10 flex items-center justify-between px-3 rounded-t-lg",
        "bg-widget-accent text-white cursor-grab select-none",
        "transition-all duration-300 ease-in-out",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <GripVertical size={16} className="text-white/80" />
        <h3 className="text-sm font-medium truncate max-w-[160px]">
          {title}
        </h3>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={onToggleExpand}
          className="p-1 rounded-full hover:bg-white/20 transition-colors"
          aria-label={isExpanded ? "Minimize" : "Maximize"}
        >
          {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
        
        {onClose && (
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default DraggableHeader;
