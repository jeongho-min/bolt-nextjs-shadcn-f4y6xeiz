import type { MotionValue, Target } from "framer-motion";

declare module "framer-motion" {
  export interface MotionStyle extends Record<string, any> {
    x?: number | string | MotionValue<number | string>;
    y?: number | string | MotionValue<number | string>;
    scale?: number | MotionValue<number>;
    opacity?: number | MotionValue<number>;
    filter?: string | MotionValue<string>;
  }

  export interface AnimationProps {
    animate?: Target;
  }
}
