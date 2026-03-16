"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { GripVertical, Move, Check, X, AlertCircle, Plus } from "lucide-react";

interface DraggableItem {
  id: string;
  content: ReactNode;
  data?: any;
}

interface DragDropProps {
  items: DraggableItem[];
  onReorder?: (items: DraggableItem[]) => void;
  onDrop?: (item: DraggableItem, targetId: string) => void;
  columns?: Array<{
    id: string;
    title: string;
    color: string;
    acceptTypes?: string[];
  }>;
  className?: string;
}

export function DragDropList({
  items: initialItems,
  onReorder,
  className = "",
}: DragDropProps) {
  const [items, setItems] = useState<DraggableItem[]>(initialItems);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragStartPos = useRef<number>(0);
  const dragCurrentPos = useRef<number>(0);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    setDraggingId(id);
    dragStartPos.current = e.clientY;
    
    // Add visual feedback
    e.currentTarget.classList.add("opacity-50", "scale-95");
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    setDragOverId(id);
    dragCurrentPos.current = e.clientY;
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    
    if (draggedId && draggedId !== targetId) {
      const draggedIndex = items.findIndex(item => item.id === draggedId);
      const targetIndex = items.findIndex(item => item.id === targetId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newItems = [...items];
        const [draggedItem] = newItems.splice(draggedIndex, 1);
        
        // Determine drop position (above or below)
        const shouldInsertAbove = dragCurrentPos.current < dragStartPos.current;
        const insertIndex = shouldInsertAbove ? targetIndex : targetIndex + 1;
        
        newItems.splice(insertIndex, 0, draggedItem);
        
        setItems(newItems);
        onReorder?.(newItems);
      }
    }
    
    setDraggingId(null);
    setDragOverId(null);
    
    // Remove visual feedback
    const draggedElement = document.querySelector(`[data-drag-id="${draggedId}"]`);
    draggedElement?.classList.remove("opacity-50", "scale-95");
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverId(null);
    
    // Remove visual feedback from all elements
    document.querySelectorAll("[data-drag-id]").forEach(el => {
      el.classList.remove("opacity-50", "scale-95");
    });
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => {
        const isDragging = item.id === draggingId;
        const isDragOver = item.id === dragOverId;
        const isAfterDragOver = dragOverId && items.findIndex(i => i.id === item.id) > items.findIndex(i => i.id === dragOverId);

        return (
          <div
            key={item.id}
            data-drag-id={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragOver={(e) => handleDragOver(e, item.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, item.id)}
            onDragEnd={handleDragEnd}
            className={`
              relative group
              transition-all duration-200 ease-out
              ${isDragging ? "opacity-50 scale-95" : ""}
              ${isDragOver ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-900" : ""}
            `}
          >
            {/* Drop indicator above */}
            {isDragOver && dragCurrentPos.current < dragStartPos.current && (
              <div className="absolute -top-1 left-0 right-0 h-1 bg-blue-500 rounded-full animate-pulse" />
            )}

            <div className={`
              flex items-center gap-3 p-4 rounded-xl border
              bg-slate-800/30 border-slate-700/50
              hover:bg-slate-800/40 hover:border-slate-600
              transition-all duration-200
              ${isDragging ? "cursor-grabbing shadow-xl" : "cursor-grab"}
            `}>
              {/* Drag handle */}
              <div className="flex-shrink-0 text-slate-500 group-hover:text-slate-400 transition-colors">
                <GripVertical className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="flex-1">{item.content}</div>

              {/* Position indicator */}
              <div className="flex-shrink-0 text-xs text-slate-500 px-2 py-1 bg-slate-800/50 rounded">
                {index + 1}
              </div>
            </div>

            {/* Drop indicator below */}
            {isDragOver && dragCurrentPos.current >= dragStartPos.current && (
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-500 rounded-full animate-pulse" />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface KanbanColumnProps {
  id: string;
  title: string;
  items: DraggableItem[];
  color: string;
  onDrop: (item: DraggableItem, columnId: string) => void;
  onAddItem?: (columnId: string) => void;
  className?: string;
}

export function KanbanColumn({
  id,
  title,
  items,
  color,
  onDrop,
  onAddItem,
  className = "",
}: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const itemId = e.dataTransfer.getData("text/plain");
    const itemData = e.dataTransfer.getData("application/json");
    
    if (itemId) {
      const item = JSON.parse(itemData);
      onDrop(item, id);
    }
  };

  return (
    <div
      className={`
        flex flex-col h-full min-h-[500px]
        rounded-xl border-2
        transition-all duration-300
        ${isDragOver ? `border-${color} bg-${color}/10 scale-[1.02]` : "border-slate-700/50 bg-slate-800/20"}
        ${className}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column header */}
      <div className={`p-4 border-b border-slate-700/50 rounded-t-xl bg-slate-800/30`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full bg-${color}`} />
            <h3 className="font-semibold text-white">{title}</h3>
            <span className="text-sm text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
              {items.length}
            </span>
          </div>
          
          {onAddItem && (
            <button
              onClick={() => onAddItem(id)}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
              title="Adicionar item"
            >
              <Plus className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {/* Column content */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
              <Move className="w-8 h-8 text-slate-500" />
            </div>
            <p className="text-slate-400">Arraste itens para aqui</p>
            <p className="text-sm text-slate-500 mt-1">Ou clique para adicionar</p>
          </div>
        ) : (
          items.map((item) => (
            <KanbanCard
              key={item.id}
              item={item}
              color={color}
            />
          ))
        )}

        {/* Drop zone indicator */}
        {isDragOver && (
          <div className="p-4 border-2 border-dashed border-slate-600 rounded-lg text-center animate-pulse">
            <p className="text-slate-400">Soltar aqui</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface KanbanCardProps {
  item: DraggableItem;
  color: string;
}

function KanbanCard({ item, color }: KanbanCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", item.id);
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    setIsDragging(true);
    
    // Add visual feedback
    e.currentTarget.classList.add("opacity-50", "scale-95");
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    // Remove visual feedback
    document.querySelectorAll("[data-kanban-card]").forEach(el => {
      el.classList.remove("opacity-50", "scale-95");
    });
  };

  return (
    <div
      data-kanban-card
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`
        p-4 rounded-lg border
        bg-slate-800/50 border-slate-700/50
        hover:bg-slate-800/70 hover:border-slate-600
        transition-all duration-200
        cursor-grab active:cursor-grabbing
        ${isDragging ? "opacity-50 scale-95 shadow-xl" : ""}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-2 h-2 rounded-full mt-1.5 bg-${color}`} />
        <div className="text-xs text-slate-500 bg-slate-800/70 px-2 py-1 rounded">
          ID: {item.id.slice(0, 8)}
        </div>
      </div>
      
      <div className="mb-4">
        {item.content}
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
        <div className="text-xs text-slate-500">
          <Move className="w-3 h-3 inline mr-1" />
          Arraste
        </div>
        <div className="flex gap-1">
          <button className="p-1 hover:bg-slate-700/50 rounded">
            <Check className="w-3 h-3 text-emerald-400" />
          </button>
          <button className="p-1 hover:bg-slate-700/50 rounded">
            <X className="w-3 h-3 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function KanbanBoard({
  columns,
  items,
  onDrop,
  onAddItem,
  className = "",
}: {
  columns: Array<{
    id: string;
    title: string;
    color: string;
  }>;
  items: Record<string, DraggableItem[]>;
  onDrop: (item: DraggableItem, columnId: string) => void;
  onAddItem?: (columnId: string) => void;
  className?: string;
}) {
  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            items={items[column.id] || []}
            color={column.color}
            onDrop={onDrop}
            onAddItem={onAddItem}
          />
        ))}
      </div>
    </div>
  );
}

// 🎯 Candidate Kanban Board
export function CandidateKanbanBoard({
  candidates,
  onStatusChange,
  className = "",
}: {
  candidates: Array<{
    id: string;
    name: string;
    position: string;
    matchScore: number;
    status: "new" | "review" | "interview" | "offer" | "rejected";
  }>;
  onStatusChange: (candidateId: string, newStatus: string) => void;
  className?: string;
}) {
  const columns = [
    { id: "new", title: "Novos", color: "blue" },
    { id: "review", title: "Em Análise", color: "yellow" },
    { id: "interview", title: "Entrevista", color: "purple" },
    { id: "offer", title: "Proposta", color: "emerald" },
    { id: "rejected", title: "Rejeitados", color: "red" },
  ];

  const itemsByColumn = columns.reduce((acc, column) => {
    acc[column.id] = candidates
      .filter(candidate => candidate.status === column.id)
      .map(candidate => ({
        id: candidate.id,
        content: (
          <div>
            <div className="font-medium text-white mb-1">{candidate.name}</div>
            <div className="text-sm text-slate-400 mb-2">{candidate.position}</div>
            <div className="flex items-center justify-between">
              <div className="text-xs px-2 py-1 bg-slate-800/70 rounded">
                Match: {candidate.matchScore}%
              </div>
              <div className="text-xs text-slate-500">
                ID: {candidate.id.slice(0, 6)}
              </div>
            </div>
          </div>
        ),
        data: candidate,
      }));
    return acc;
  }, {} as Record<string, DraggableItem[]>);

  const handleDrop = (item: DraggableItem, columnId: string) => {
    onStatusChange(item.data.id, columnId);
  };

  const handleAddItem = (columnId: string) => {
    // Implementar adição de novo candidato
    console.log(`Add item to ${columnId}`);
  };

  return (
    <div className={className}>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Pipeline de Candidatos</h3>
        <p className="text-slate-400">Arraste e solte para mover candidatos entre fases</p>
      </div>
      
      <KanbanBoard
        columns={columns}
        items={itemsByColumn}
        onDrop={handleDrop}
        onAddItem={handleAddItem}
      />
    </div>
  );
}

// 📊 Sortable List com Feedback Visual
export function SortableList({
  items,
  onSort,
  renderItem,
  className = "",
}: {
  items: any[];
  onSort: (items: any[]) => void;
  renderItem: (item: any, index: number) => ReactNode;
  className?: string;
}) {
  const [sortedItems, setSortedItems] = useState(items);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      const newItems = [...sortedItems];
      const [draggedItem] = newItems.splice(draggedIndex, 1);
      newItems.splice(dropIndex, 0, draggedItem);
      
      setSortedItems(newItems);
      onSort(newItems);
    }
    
    setDraggedIndex(null);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {sortedItems.map((item, index) => (
        <div
          key={item.id || index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          className={`
            transition-all duration-200
            ${draggedIndex === index ? "opacity-50 scale-95" : ""}
          `}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}