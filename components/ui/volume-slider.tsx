"use client";

import * as React from "react";
import {
  motion,
  type MotionValue,
  type MotionProps,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type VolumeSliderProps = {
  initialVolume?: number;
  min?: number;
  max?: number;
  step?: number;
  maxOverflow?: number;
  onVolumeChange?: (volume: number) => void;
  className?: string;
} & MotionProps;

type VolumeRegion = "left" | "middle" | "right";

const calculateDecay = (value: number, max: number): number => {
  if (max === 0) return 0;

  const entry = value / max;
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);

  return sigmoid * max;
};

type VolumeIconProps = {
  icon: React.ReactNode;
  isActive: boolean;
  getOffset: () => number;
};

const VolumeIcon = ({ icon, isActive, getOffset }: VolumeIconProps) => {
  return (
    <motion.div
      animate={{
        scale: isActive ? [1, 1.4, 1] : 1,
        transition: { duration: 0.25 },
      }}
      style={{
        x: useTransform(getOffset),
      }}
    >
      {icon}
    </motion.div>
  );
};

type SliderContainerProps = {
  children: React.ReactNode;
  isInteracting: boolean;
  setIsInteracting: React.Dispatch<React.SetStateAction<boolean>>;
  clientX: MotionValue<number>;
  overflow: MotionValue<number>;
};

const SliderContainer = React.forwardRef<HTMLDivElement, SliderContainerProps>(
  ({ children, setIsInteracting, clientX, overflow }, ref) => {
    return (
      <div
        ref={ref}
        className="relative flex w-full max-w-[200px] grow cursor-grab touch-none select-none items-center py-4 active:cursor-grabbing"
        onPointerDown={() => setIsInteracting(true)}
        onPointerUp={() => setIsInteracting(false)}
        onPointerMove={(e) => {
          if (e.buttons > 0) {
            clientX.jump(e.clientX);
          }
        }}
        onLostPointerCapture={() => {
          animate(overflow, 0, { type: "spring", bounce: 0.5 });
          setIsInteracting(false);
        }}
      >
        {children}
      </div>
    );
  },
);

SliderContainer.displayName = "SliderContainer";

type VolumeTooltipProps = {
  isVisible: boolean;
  position: number;
  value: number;
};

const VolumeTooltip = ({ isVisible, position, value }: VolumeTooltipProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: -28, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.8 }}
          style={{
            left: `${position}%`,
            x: "-50%",
          }}
          className="absolute top-0 bg-emerald-900/90 px-2 py-1 rounded-md text-xs font-medium shadow-md border border-emerald-300/30 pointer-events-none text-emerald-100"
        >
          {value}%
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-emerald-900/90 rotate-45 border-r border-b border-emerald-300/30"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const VolumeSlider = React.forwardRef<HTMLDivElement, VolumeSliderProps>(
  (props, ref) => {
    const {
      className,
      initialVolume = 50,
      min = 0,
      max = 100,
      step = 0.01,
      maxOverflow = 50,
      onVolumeChange,
      ...restProps
    } = props;

    const [volume, setVolume] = React.useState(initialVolume);
    const [region, setRegion] = React.useState<VolumeRegion>("middle");
    const [isInteracting, setIsInteracting] = React.useState(false);
    const [tooltipPosition, setTooltipPosition] = React.useState(initialVolume);

    const sliderRef = React.useRef<HTMLDivElement>(null);

    const clientX = useMotionValue(0);
    const overflow = useMotionValue(0);
    const scale = useMotionValue(1);

    useMotionValueEvent(clientX, "change", (latest) => {
      if (!sliderRef.current) return;

      const { left, right } = sliderRef.current.getBoundingClientRect();
      let overflowValue = 0;

      if (latest < left) {
        setRegion("left");
        overflowValue = left - latest;
      } else if (latest > right) {
        setRegion("right");
        overflowValue = latest - right;
      } else {
        setRegion("middle");

        const sliderWidth = right - left;
        const relativeX = latest - left;
        const positionPercentage = (relativeX / sliderWidth) * 100;
        setTooltipPosition(Math.max(0, Math.min(100, positionPercentage)));
      }

      overflow.jump(calculateDecay(overflowValue, maxOverflow));
    });

    const handleVolumeChange = (values: number[]) => {
      const newVolume = Math.floor(values[0]);
      setVolume(newVolume);

      if (onVolumeChange) {
        onVolumeChange(newVolume);
      }
    };

    React.useEffect(() => {
      if (!isInteracting || region === "middle") {
        setTooltipPosition(volume);
      }
    }, [volume, isInteracting, region]);

    const getSliderScaleX = (): number => {
      if (!sliderRef.current) return 1;

      const { width } = sliderRef.current.getBoundingClientRect();
      return 1 + overflow.get() / width;
    };

    const getTransformOrigin = (): string => {
      if (!sliderRef.current) return "center";

      const { left, width } = sliderRef.current.getBoundingClientRect();
      return clientX.get() < left + width / 2 ? "right" : "left";
    };

    const getIconOffset = (side: "left" | "right"): number => {
      return side === region ? overflow.get() / scale.get() : 0;
    };

    const scaleOpacity = useTransform(scale, [1, 1.2], [0.7, 1]);
    const scaleY = useTransform(overflow, [0, maxOverflow], [1, 0.8]);
    const sliderHeight = useTransform(scale, [1, 1.2], [6, 12]);
    const sliderMargin = useTransform(scale, [1, 1.2], [0, -3]);
    const transformOrigin = useTransform(getTransformOrigin);

    const handleTouchStart = () => {
      setIsInteracting(true);
      animate(scale, 1.2);
    };

    const handleTouchEnd = () => {
      setIsInteracting(false);
      animate(scale, 1);
    };

    return (
      <motion.div
        ref={ref}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          scale,
          opacity: scaleOpacity,
        }}
        className={cn(
          "flex w-full touch-none select-none items-center justify-center gap-3",
          className,
        )}
        {...restProps}
      >
        <VolumeIcon
          icon={<VolumeX className="h-4 w-4 text-emerald-100/70" />}
          isActive={region === "left"}
          getOffset={() => (region === "left" ? -getIconOffset("left") : 0)}
        />

        <SliderContainer
          ref={sliderRef}
          isInteracting={isInteracting}
          setIsInteracting={setIsInteracting}
          clientX={clientX}
          overflow={overflow}
        >
          <VolumeTooltip
            isVisible={isInteracting || scale.get() > 1}
            position={tooltipPosition}
            value={volume}
          />

          <motion.div
            style={{
              scaleX: useTransform(getSliderScaleX),
              scaleY,
              transformOrigin,
              height: sliderHeight,
              marginTop: sliderMargin,
              marginBottom: sliderMargin,
            }}
            className="w-full"
          >
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              min={min}
              max={max}
              step={step}
              className="relative"
            />
          </motion.div>
        </SliderContainer>

        <VolumeIcon
          icon={<Volume2 className="h-4 w-4 text-emerald-100/70" />}
          isActive={region === "right"}
          getOffset={() => (region === "right" ? getIconOffset("right") : 0)}
        />
      </motion.div>
    );
  },
);

VolumeSlider.displayName = "VolumeSlider";

export { VolumeSlider };
