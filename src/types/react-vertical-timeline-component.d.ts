declare module 'react-vertical-timeline-component' {
  import { ComponentType, ReactNode } from 'react';

  export interface VerticalTimelineProps {
    className?: string;
    layout?: '1-column' | '2-columns';
    lineColor?: string;
    animate?: boolean;
    children?: ReactNode;
  }

  export interface VerticalTimelineElementProps {
    className?: string;
    date?: string;
    dateClassName?: string;
    iconClassName?: string;
    iconOnClick?: () => void;
    iconStyle?: React.CSSProperties;
    icon?: ReactNode;
    position?: string;
    contentStyle?: React.CSSProperties;
    contentArrowStyle?: React.CSSProperties;
    visible?: boolean;
    children?: ReactNode;
  }

  export const VerticalTimeline: ComponentType<VerticalTimelineProps>;
  export const VerticalTimelineElement: ComponentType<VerticalTimelineElementProps>;
} 