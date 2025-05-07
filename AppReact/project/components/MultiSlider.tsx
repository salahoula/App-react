import React from 'react';
import { View, StyleSheet, PanResponder, Animated } from 'react-native';

interface MultiSliderProps {
  values: [number, number];
  min: number;
  max: number;
  step: number;
  onValuesChange: (values: [number, number]) => void;
  trackStyle?: any;
  selectedStyle?: any;
  markerStyle?: any;
}

const MultiSlider: React.FC<MultiSliderProps> = ({
  values,
  min,
  max,
  step,
  onValuesChange,
  trackStyle,
  selectedStyle,
  markerStyle
}) => {
  const [width, setWidth] = React.useState(0);
  const leftPos = React.useRef(new Animated.Value(0)).current;
  const rightPos = React.useRef(new Animated.Value(0)).current;

  const updatePositions = React.useCallback(() => {
    const valuesRatio = [
      (values[0] - min) / (max - min),
      (values[1] - min) / (max - min),
    ];
    
    leftPos.setValue(valuesRatio[0] * width);
    rightPos.setValue(valuesRatio[1] * width);
  }, [width, values, min, max, leftPos, rightPos]);

  React.useEffect(() => {
    updatePositions();
  }, [updatePositions, width]);

  const handleLayout = (event: any) => {
    const { width: layoutWidth } = event.nativeEvent.layout;
    setWidth(layoutWidth);
  };

  const normalizeValue = (value: number): number => {
    const normalized = Math.max(min, Math.min(max, value));
    const steps = Math.round((normalized - min) / step);
    return min + (steps * step);
  };

  const leftPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      let newPos = gesture.moveX;
      
      // Constraint to not go beyond right slider or min value
      newPos = Math.max(0, Math.min(newPos, rightPos._value - 20));
      
      leftPos.setValue(newPos);
      
      const ratio = newPos / width;
      const newValue = normalizeValue(min + ratio * (max - min));
      
      onValuesChange([newValue, values[1]]);
    },
  });

  const rightPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      let newPos = gesture.moveX;
      
      // Constraint to not go beyond left slider or max value
      newPos = Math.min(width, Math.max(newPos, leftPos._value + 20));
      
      rightPos.setValue(newPos);
      
      const ratio = newPos / width;
      const newValue = normalizeValue(min + ratio * (max - min));
      
      onValuesChange([values[0], newValue]);
    },
  });

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <View style={[styles.track, trackStyle]} />
      <Animated.View
        style={[
          styles.selectedTrack,
          selectedStyle,
          {
            left: leftPos,
            width: Animated.subtract(rightPos, leftPos),
          },
        ]}
      />
      <Animated.View
        style={[styles.marker, markerStyle, { left: leftPos }]}
        {...leftPanResponder.panHandlers}
      />
      <Animated.View
        style={[styles.marker, markerStyle, { left: rightPos }]}
        {...rightPanResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E5EA',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  selectedTrack: {
    height: 4,
    backgroundColor: '#0066CC',
    position: 'absolute',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0066CC',
    position: 'absolute',
    top: 10,
    marginLeft: -10,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default MultiSlider;