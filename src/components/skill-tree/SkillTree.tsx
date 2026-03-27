import { useState } from 'react';
import type { UnitWithProgress } from '../../types';
import { SkillNode } from './SkillNode';
import { PathConnector } from './PathConnector';
import { UnitPreviewSheet } from './UnitPreviewSheet';

interface SkillTreeProps {
  units: UnitWithProgress[];
}

// Zigzag pattern: center → right → center → left → repeat
const ZIGZAG_POSITIONS = ['50%', '70%', '50%', '15%', '50%', '70%', '50%', '15%'];
const NODE_VERTICAL_SPACING = 140;
const NODE_VERTICAL_OFFSET = 60; // top padding
const NODE_SIZE = 80;

// Calculate absolute pixel X for a given position string (for SVG connectors)
// We use the container width assumption of 480px (max-width)
function positionToPixels(pos: string, containerWidth: number): number {
  if (pos.endsWith('%')) {
    return (parseFloat(pos) / 100) * containerWidth;
  }
  return parseFloat(pos);
}

export function SkillTree({ units }: SkillTreeProps) {
  const [selectedUnit, setSelectedUnit] = useState<UnitWithProgress | null>(null);

  const containerWidth = 380; // approx inner width for connector calculation
  const containerHeight = Math.max(
    units.length * NODE_VERTICAL_SPACING + 200,
    1320
  );

  const nodePositions = units.map((_, index) => ({
    x: ZIGZAG_POSITIONS[index] ?? '50%',
    y: NODE_VERTICAL_OFFSET + index * NODE_VERTICAL_SPACING,
  }));

  return (
    <>
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: containerHeight,
          paddingBottom: 80,
        }}
      >
        {/* SVG connectors layer */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: containerHeight,
            pointerEvents: 'none',
            overflow: 'visible',
          }}
        >
          {units.map((unit, index) => {
            if (index === 0) return null;
            const prev = nodePositions[index - 1];
            const curr = nodePositions[index];

            const prevPixelX = positionToPixels(prev.x, containerWidth);
            const currPixelX = positionToPixels(curr.x, containerWidth);

            const fromY = prev.y + NODE_SIZE / 2;
            const toY = curr.y + NODE_SIZE / 2;
            const completed =
              units[index - 1].nodeState === 'completed';

            return (
              <PathConnector
                key={`connector-${unit.id}`}
                fromX={prevPixelX}
                fromY={fromY}
                toX={currPixelX}
                toY={toY}
                completed={completed}
              />
            );
          })}
        </svg>

        {/* Skill nodes */}
        {units.map((unit, index) => (
          <SkillNode
            key={unit.id}
            unit={unit}
            onTap={setSelectedUnit}
            position={nodePositions[index]}
          />
        ))}
      </div>

      {/* Unit preview sheet */}
      <UnitPreviewSheet
        unit={selectedUnit}
        onClose={() => setSelectedUnit(null)}
      />
    </>
  );
}
