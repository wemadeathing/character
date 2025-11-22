import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polygon, Line, Circle, G, Text as SvgText } from 'react-native-svg';
import { Stats, STAT_CONFIG } from '../types';

interface HexagonChartProps {
  stats: Stats;
  size?: number;
  showLabels?: boolean;
}

export default function HexagonChart({
  stats,
  size = 200,
  showLabels = true,
}: HexagonChartProps) {
  const center = size / 2;
  const maxRadius = (size / 2) * 0.7; // Leave space for labels
  const levels = 5; // 5 levels matching 1-5 stat scale

  // The 6 stats in order (clockwise from top)
  const statOrder: (keyof Stats)[] = [
    'strength',
    'intellect',
    'spirit',
    'charisma',
    'heart',
    'discipline',
  ];

  // Calculate point position on hexagon
  const getPoint = (index: number, radius: number) => {
    // Start from top and go clockwise
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Generate hexagon grid lines (background)
  const gridLines = [];
  for (let level = 1; level <= levels; level++) {
    const radius = (maxRadius / levels) * level;
    const points = statOrder
      .map((_, index) => {
        const point = getPoint(index, radius);
        return `${point.x},${point.y}`;
      })
      .join(' ');

    gridLines.push(
      <Polygon
        key={`grid-${level}`}
        points={points}
        fill="none"
        stroke={level === levels ? '#E0E0E0' : '#F0F0F0'}
        strokeWidth={level === levels ? 2 : 1}
      />
    );
  }

  // Generate axis lines from center to vertices
  const axisLines = statOrder.map((stat, index) => {
    const point = getPoint(index, maxRadius);
    return (
      <Line
        key={`axis-${stat}`}
        x1={center}
        y1={center}
        x2={point.x}
        y2={point.y}
        stroke="#E0E0E0"
        strokeWidth={1}
      />
    );
  });

  // Generate data polygon (user's stats)
  const dataPoints = statOrder.map((stat, index) => {
    const value = stats[stat];
    const radius = (maxRadius / levels) * value;
    return getPoint(index, radius);
  });

  const dataPolygonPoints = dataPoints
    .map((point) => `${point.x},${point.y}`)
    .join(' ');

  // Generate labels
  const labels = showLabels
    ? statOrder.map((stat, index) => {
        const labelRadius = maxRadius + 25;
        const point = getPoint(index, labelRadius);
        const config = STAT_CONFIG[stat];

        return (
          <G key={`label-${stat}`}>
            <SvgText
              x={point.x}
              y={point.y - 8}
              fill="#333"
              fontSize="11"
              fontWeight="600"
              textAnchor="middle"
            >
              {config.icon}
            </SvgText>
            <SvgText
              x={point.x}
              y={point.y + 8}
              fill="#666"
              fontSize="9"
              textAnchor="middle"
            >
              {config.label}
            </SvgText>
            <SvgText
              x={point.x}
              y={point.y + 20}
              fill={config.color}
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              {stats[stat]}
            </SvgText>
          </G>
        );
      })
    : null;

  // Generate data points (circles at each vertex)
  const dataCircles = dataPoints.map((point, index) => {
    const stat = statOrder[index];
    const config = STAT_CONFIG[stat];
    return (
      <Circle
        key={`point-${stat}`}
        cx={point.x}
        cy={point.y}
        r={4}
        fill={config.color}
        stroke="#FFF"
        strokeWidth={2}
      />
    );
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background grid */}
        <G>{gridLines}</G>

        {/* Axis lines */}
        <G>{axisLines}</G>

        {/* User's data polygon */}
        <Polygon
          points={dataPolygonPoints}
          fill="rgba(74, 144, 226, 0.2)"
          stroke="#4A90E2"
          strokeWidth={2}
        />

        {/* Data point circles */}
        <G>{dataCircles}</G>

        {/* Labels */}
        {labels}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
