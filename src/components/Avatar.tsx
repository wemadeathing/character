import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Ellipse, Rect, Path, G } from 'react-native-svg';
import { AvatarConfig } from '../types';

interface AvatarProps {
  config: AvatarConfig;
  size?: number;
}

export default function Avatar({ config, size = 120 }: AvatarProps) {
  const scale = size / 120; // Base size is 120

  // Body shapes (different body types)
  const renderBody = () => {
    const bodyShapes = [
      // Body 0: Circle (default)
      <Circle
        cx={60}
        cy={80}
        r={35}
        fill={config.outfitColor}
        stroke="#000"
        strokeWidth={2}
      />,
      // Body 1: Rectangle (athletic)
      <Rect
        x={30}
        y={50}
        width={60}
        height={60}
        rx={8}
        fill={config.outfitColor}
        stroke="#000"
        strokeWidth={2}
      />,
      // Body 2: Rounded (stocky)
      <Ellipse
        cx={60}
        cy={80}
        rx={38}
        ry={35}
        fill={config.outfitColor}
        stroke="#000"
        strokeWidth={2}
      />,
    ];

    return bodyShapes[config.body % bodyShapes.length];
  };

  // Hair styles
  const renderHair = () => {
    const hairStyles = [
      // Hair 0: Short
      <Path
        d="M 45 35 Q 40 25, 45 20 Q 60 15, 75 20 Q 80 25, 75 35"
        fill={config.hairColor}
        stroke="#000"
        strokeWidth={2}
      />,
      // Hair 1: Long
      <Path
        d="M 40 35 Q 35 20, 45 15 Q 60 10, 75 15 Q 85 20, 80 35 L 85 50 Q 85 55, 80 55 L 75 40 L 65 40 L 55 40 L 45 40 L 40 55 Q 35 55, 35 50 Z"
        fill={config.hairColor}
        stroke="#000"
        strokeWidth={2}
      />,
      // Hair 2: Spiky
      <Path
        d="M 45 35 L 42 20 L 48 25 L 50 15 L 55 25 L 60 10 L 65 25 L 70 15 L 72 25 L 78 20 L 75 35"
        fill={config.hairColor}
        stroke="#000"
        strokeWidth={2}
      />,
    ];

    return hairStyles[config.hair % hairStyles.length];
  };

  // Eye styles
  const renderEyes = () => {
    const eyeStyles = [
      // Eyes 0: Simple dots
      <G>
        <Circle cx={50} cy={45} r={4} fill={config.eyeColor} />
        <Circle cx={70} cy={45} r={4} fill={config.eyeColor} />
      </G>,
      // Eyes 1: Large anime
      <G>
        <Circle cx={50} cy={45} r={6} fill={config.eyeColor} stroke="#000" strokeWidth={1} />
        <Circle cx={50} cy={43} r={2} fill="#FFF" />
        <Circle cx={70} cy={45} r={6} fill={config.eyeColor} stroke="#000" strokeWidth={1} />
        <Circle cx={70} cy={43} r={2} fill="#FFF" />
      </G>,
      // Eyes 2: Narrow
      <G>
        <Ellipse cx={50} cy={45} rx={5} ry={3} fill={config.eyeColor} />
        <Ellipse cx={70} cy={45} rx={5} ry={3} fill={config.eyeColor} />
      </G>,
    ];

    return eyeStyles[config.eyes % eyeStyles.length];
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 120 120">
        <G transform={`scale(${scale})`}>
          {/* Body/Outfit Layer */}
          {renderBody()}

          {/* Head */}
          <Circle
            cx={60}
            cy={40}
            r={25}
            fill={config.skinTone}
            stroke="#000"
            strokeWidth={2}
          />

          {/* Hair Layer */}
          {renderHair()}

          {/* Eyes Layer */}
          {renderEyes()}

          {/* Mouth */}
          <Path
            d="M 52 52 Q 60 56, 68 52"
            fill="none"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </G>
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
