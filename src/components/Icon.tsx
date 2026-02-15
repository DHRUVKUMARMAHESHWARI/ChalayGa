import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Line, Polyline, Rect } from 'react-native-svg';
import { COLORS } from '../constants/theme';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: any;
}

export default function Icon({ 
  name, 
  size = 24, 
  color = COLORS.textSecondary,
  strokeWidth = 2,
  style
}: IconProps) {
  const renderIcon = () => {
    switch (name) {
      case 'user':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle 
              cx="12" cy="7" r="4"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      case 'mail':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Polyline 
              points="22,6 12,13 2,6"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      case 'lock':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Rect 
              x="3" y="11" width="18" height="11" rx="2" ry="2"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path 
              d="M7 11V7a5 5 0 0 1 10 0v4"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      case 'at-sign':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle 
              cx="12" cy="12" r="4"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path 
              d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      case 'hash':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Line x1="4" y1="9" x2="20" y2="9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
            <Line x1="4" y1="15" x2="20" y2="15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
            <Line x1="10" y1="3" x2="8" y2="21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
            <Line x1="16" y1="3" x2="14" y2="21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        );
      // Navigation Icons
      case 'home':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" 
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Polyline 
              points="9 22 9 12 15 12 15 22" 
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      case 'calendar':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Rect 
              x="3" y="4" width="18" height="18" rx="2" ry="2"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line 
              x1="16" y1="2" x2="16" y2="6"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line 
              x1="8" y1="2" x2="8" y2="6"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line 
              x1="3" y1="10" x2="21" y2="10"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      case 'plus-circle':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle 
              cx="12" cy="12" r="10"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line 
              x1="12" y1="8" x2="12" y2="16"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line 
              x1="8" y1="12" x2="16" y2="12"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      case 'message-circle':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      case 'user-circle':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle 
              cx="12" cy="12" r="10"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle 
              cx="12" cy="10" r="3"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path 
              d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      // Action Icons
      case 'search':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle 
              cx="11" cy="11" r="8"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line 
              x1="21" y1="21" x2="16.65" y2="16.65"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      case 'arrow-left':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Line 
              x1="19" y1="12" x2="5" y2="12"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Polyline 
              points="12 19 5 12 12 5"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      case 'users':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle 
              cx="9" cy="7" r="4"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path 
              d="M23 21v-2a4 4 0 0 0-3-3.87"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path 
              d="M16 3.13a4 4 0 0 1 0 7.75"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      case 'map-pin':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle 
              cx="12" cy="10" r="3"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      case 'clock':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle 
              cx="12" cy="12" r="10"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Polyline 
              points="12 6 12 12 16 14"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      // Category Icons
      case 'utensils':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path 
              d="M7 2v20"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path 
              d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      case 'coffee':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M18 8h1a4 4 0 0 1 0 8h-1"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path 
              d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line 
              x1="6" y1="1" x2="6" y2="4"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line 
              x1="10" y1="1" x2="10" y2="4"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line 
              x1="14" y1="1" x2="14" y2="4"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      case 'footprints':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path 
              d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      // Status Icons
      case 'check':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Polyline 
              points="20 6 9 17 4 12"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      case 'x':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Line 
              x1="18" y1="6" x2="6" y2="18"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line 
              x1="6" y1="6" x2="18" y2="18"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      case 'help-circle':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle 
              cx="12" cy="12" r="10"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path 
              d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Circle cx="12" cy="17" r="0.5" fill={color} />
          </Svg>
        );
      
      case 'star':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      case 'arrow-right':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Line 
              x1="5" y1="12" x2="19" y2="12"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Polyline 
              points="12 5 19 12 12 19"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      case 'phone':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      case 'log-out':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Polyline 
              points="16 17 21 12 16 7"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line 
              x1="21" y1="12" x2="9" y2="12"
              stroke={color} 
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      
      default:
        return null;
    }
  };

  return <View style={[styles.container, style]}>{renderIcon()}</View>;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
