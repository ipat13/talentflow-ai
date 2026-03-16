"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

// 📊 Doughnut Chart Component
export function DoughnutChart({
  data,
  colors = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
  size = 160,
  strokeWidth = 12,
  showLegend = true,
  className = ""
}: {
  data: { label: string; value: number }[];
  colors?: string[];
  size?: number;
  strokeWidth?: number;
  showLegend?: boolean;
  className?: string;
}) {
  const [animatedValues, setAnimatedValues] = useState(data.map(() => 0));
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues(data.map(item => item.value));
    }, 100);
    return () => clearTimeout(timer);
  }, [data]);

  let accumulatedAngle = 0;
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const strokeDasharray = circumference;
            const strokeDashoffset = circumference - (animatedValues[index] / total) * circumference;
            
            const startAngle = accumulatedAngle;
            accumulatedAngle += angle;
            
            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={colors[index % colors.length]}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{
                  strokeDashoffset: strokeDashoffset,
                }}
              />
            );
          })}
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{total}</div>
            <div className="text-sm text-slate-400">Total</div>
          </div>
        </div>
      </div>
      
      {showLegend && (
        <div className="mt-4 space-y-2 w-full">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-sm text-slate-300">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">{item.value}</span>
                <span className="text-xs text-slate-400">
                  ({Math.round((item.value / total) * 100)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 📈 Bar Chart Component
export function BarChart({
  data,
  colors = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
  height = 200,
  showValues = true,
  className = ""
}: {
  data: { label: string; value: number }[];
  colors?: string[];
  height?: number;
  showValues?: boolean;
  className?: string;
}) {
  const [animatedHeights, setAnimatedHeights] = useState(data.map(() => 0));
  const maxValue = Math.max(...data.map(item => item.value));
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedHeights(data.map(item => item.value));
    }, 100);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div className={`${className}`}>
      <div className="flex items-end justify-between h-[200px] gap-2 md:gap-4">
        {data.map((item, index) => {
          const percentage = (animatedHeights[index] / maxValue) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              {showValues && (
                <div className="mb-2 text-sm font-medium text-white">
                  {item.value}
                </div>
              )}
              <div className="relative w-full flex flex-col items-center">
                <div 
                  className="w-3/4 rounded-t-lg transition-all duration-1000 ease-out"
                  style={{
                    height: `${percentage}%`,
                    backgroundColor: colors[index % colors.length],
                    minHeight: '4px',
                  }}
                />
                <div className="mt-2 text-xs text-slate-400 text-center px-1">
                  {item.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 🔥 Heatmap Component
export function Heatmap({
  data,
  labels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
  colorScale = ["#1e293b", "#334155", "#475569", "#64748b", "#94a3b8", "#cbd5e1", "#f1f5f9"],
  className = ""
}: {
  data: number[][];
  labels?: string[];
  colorScale?: string[];
  className?: string;
}) {
  const maxValue = Math.max(...data.flat());
  
  const getColor = (value: number) => {
    if (maxValue === 0) return colorScale[0];
    const index = Math.floor((value / maxValue) * (colorScale.length - 1));
    return colorScale[index];
  };

  return (
    <div className={`${className}`}>
      <div className="flex">
        <div className="flex flex-col justify-between mr-2">
          {labels.map((label, i) => (
            <div key={i} className="text-xs text-slate-400 h-8 flex items-center">
              {label}
            </div>
          ))}
        </div>
        
        <div className="flex-1 grid gap-1">
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1">
              {row.map((value, colIndex) => (
                <div
                  key={colIndex}
                  className="flex-1 aspect-square rounded-sm transition-all duration-300 hover:scale-110 hover:z-10 relative group"
                  style={{ backgroundColor: getColor(value) }}
                  title={`${value} candidatos`}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-slate-400">Menos</span>
        <div className="flex-1 h-4 mx-4 rounded-full overflow-hidden flex">
          {colorScale.map((color, index) => (
            <div key={index} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>
        <span className="text-xs text-slate-400">Mais</span>
      </div>
    </div>
  );
}

// 📊 Progress Bar with Animation
export function AnimatedProgressBar({
  value,
  max = 100,
  color = "from-indigo-500 to-purple-600",
  showLabel = true,
  height = 8,
  className = ""
}: {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
  height?: number;
  className?: string;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = Math.min((animatedValue / max) * 100, 100);
  
  return (
    <div className={`${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className="text-sm text-slate-300">Progresso</span>
          <span className="text-sm font-medium text-white">{Math.round(percentage)}%</span>
        </div>
      )}
      <div 
        className="bg-slate-700/50 rounded-full overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div 
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// 📈 Sparkline Chart
export function Sparkline({
  data,
  color = "#6366f1",
  height = 40,
  className = ""
}: {
  data: number[];
  color?: string;
  height?: number;
  className?: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className={`relative ${className}`} style={{ height: `${height}px` }}>
      <svg width="100%" height="100%" className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-500"
        />
        
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((value - min) / range) * 100;
          
          return (
            <circle
              key={index}
              cx={`${x}%`}
              cy={`${y}%`}
              r="3"
              fill={color}
              className="opacity-0 hover:opacity-100 transition-opacity"
            />
          );
        })}
      </svg>
    </div>
  );
}

// 🎯 Radar Chart for Skills
export function RadarChart({
  data,
  labels,
  maxValue = 100,
  color = "#6366f1",
  className = ""
}: {
  data: number[];
  labels: string[];
  maxValue?: number;
  color?: string;
  className?: string;
}) {
  const size = 200;
  const center = size / 2;
  const radius = size / 2 - 20;
  const sides = data.length;
  
  const points = data.map((value, index) => {
    const angle = (index * 2 * Math.PI) / sides - Math.PI / 2;
    const distance = (value / maxValue) * radius;
    const x = center + distance * Math.cos(angle);
    const y = center + distance * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');
  
  const gridPoints = [0.25, 0.5, 0.75, 1].map(scale => {
    const points = Array.from({ length: sides }).map((_, index) => {
      const angle = (index * 2 * Math.PI) / sides - Math.PI / 2;
      const distance = scale * radius;
      const x = center + distance * Math.cos(angle);
      const y = center + distance * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
    return points;
  });

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Grid circles */}
        {gridPoints.map((points, index) => (
          <polygon
            key={index}
            points={points}
            fill="none"
            stroke="#334155"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        ))}
        
        {/* Axis lines */}
        {labels.map((_, index) => {
          const angle = (index * 2 * Math.PI) / sides - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#475569"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Data polygon */}
        <polygon
          points={points}
          fill={`${color}20`}
          stroke={color}
          strokeWidth="2"
          className="transition-all duration-1000"
        />
        
        {/* Data points */}
        {data.map((value, index) => {
          const angle = (index * 2 * Math.PI) / sides - Math.PI / 2;
          const distance = (value / maxValue) * radius;
          const x = center + distance * Math.cos(angle);
          const y = center + distance * Math.sin(angle);
          
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill={color}
              className="transition-all duration-1000"
            />
          );
        })}
        
        {/* Labels */}
        {labels.map((label, index) => {
          const angle = (index * 2 * Math.PI) / sides - Math.PI / 2;
          const x = center + (radius + 20) * Math.cos(angle);
          const y = center + (radius + 20) * Math.sin(angle);
          
          const textAnchor = Math.abs(Math.cos(angle)) < 0.1 ? "middle" : 
                           Math.cos(angle) > 0 ? "start" : "end";
          
          return (
            <text
              key={index}
              x={x}
              y={y}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              className="text-xs fill-slate-400"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}