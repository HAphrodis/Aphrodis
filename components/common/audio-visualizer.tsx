/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AudioVisualizerProps {
  audioElement: HTMLAudioElement | null;
  audioContext?: AudioContext | null;
  analyser?: AnalyserNode | null;
  isPlaying: boolean;
  className?: string;
  visualizerType?: "bars" | "wave" | "circular";
}

export default function AudioVisualizer({
  audioElement,
  audioContext,
  analyser,
  isPlaying,
  className = "",
  visualizerType = "bars",
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataArray, setDataArray] = useState<Uint8Array | null>(null);
  const animationRef = useRef<number | null>(null);
  const localAnalyserRef = useRef<AnalyserNode | null>(null);

  // Use provided analyser or create a local one if needed
  useEffect(() => {
    if (!audioElement) return;

    // If we already have an analyser from props, use that
    if (analyser) {
      localAnalyserRef.current = analyser;
      const bufferLength = analyser.frequencyBinCount;
      setDataArray(new Uint8Array(bufferLength));
      return;
    }

    // Otherwise, don't create a new audio context - this prevents the error
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioElement, analyser, audioContext]);

  // Draw visualization based on the selected type
  useEffect(() => {
    if (
      !localAnalyserRef.current ||
      !dataArray ||
      !canvasRef.current ||
      !isPlaying
    ) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      if (!localAnalyserRef.current || !dataArray || !ctx) return;

      // Get canvas dimensions
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Get frequency data
      localAnalyserRef.current.getByteFrequencyData(dataArray);

      if (visualizerType === "bars") {
        drawBars(ctx, dataArray, width, height);
      } else if (visualizerType === "wave") {
        drawWave(ctx, dataArray, width, height);
      } else if (visualizerType === "circular") {
        drawCircular(ctx, dataArray, width, height);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [localAnalyserRef.current, dataArray, isPlaying, visualizerType]);

  // Resize canvas on window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const container = canvas.parentElement;
        if (container) {
          canvas.width = container.clientWidth;
          canvas.height = container.clientHeight;
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Draw bar visualization
  const drawBars = (
    ctx: CanvasRenderingContext2D,
    dataArray: Uint8Array,
    width: number,
    height: number,
  ) => {
    const barCount = Math.min(dataArray.length, 64); // Limit to 64 bars for performance
    const barWidth = width / barCount;
    const barSpacing = barWidth * 0.2;
    const adjustedBarWidth = barWidth - barSpacing;

    for (let i = 0; i < barCount; i++) {
      const barHeight = (dataArray[i] / 255) * height * 0.8;

      // Create gradient for each bar
      const gradient = ctx.createLinearGradient(
        0,
        height - barHeight,
        0,
        height,
      );
      gradient.addColorStop(0, "rgba(16, 185, 129, 0.9)"); // emerald-500
      gradient.addColorStop(0.6, "rgba(5, 150, 105, 0.7)"); // emerald-600
      gradient.addColorStop(1, "rgba(4, 120, 87, 0.5)"); // emerald-700

      ctx.fillStyle = gradient;

      // Draw rounded top bar
      const x = i * barWidth;
      const y = height - barHeight;

      ctx.beginPath();
      ctx.moveTo(x + barSpacing / 2, height);
      ctx.lineTo(x + barSpacing / 2, y + 2);
      ctx.quadraticCurveTo(x + barSpacing / 2, y, x + barSpacing / 2 + 2, y);
      ctx.lineTo(x + adjustedBarWidth + barSpacing / 2 - 2, y);
      ctx.quadraticCurveTo(
        x + adjustedBarWidth + barSpacing / 2,
        y,
        x + adjustedBarWidth + barSpacing / 2,
        y + 2,
      );
      ctx.lineTo(x + adjustedBarWidth + barSpacing / 2, height);
      ctx.fill();

      // Add glow effect
      ctx.shadowColor = "rgba(16, 185, 129, 0.5)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
  };

  // Draw wave visualization
  const drawWave = (
    ctx: CanvasRenderingContext2D,
    dataArray: Uint8Array,
    width: number,
    height: number,
  ) => {
    const sliceWidth = width / dataArray.length;

    ctx.beginPath();
    ctx.moveTo(0, height / 2);

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "rgba(16, 185, 129, 0.2)");
    gradient.addColorStop(0.5, "rgba(16, 185, 129, 0.8)");
    gradient.addColorStop(1, "rgba(16, 185, 129, 0.2)");

    ctx.strokeStyle = "rgba(16, 185, 129, 0.8)";
    ctx.lineWidth = 2;

    for (let i = 0; i < dataArray.length; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * height) / 2;

      if (i === 0) {
        ctx.moveTo(0, y);
      } else {
        ctx.lineTo(i * sliceWidth, y);
      }
    }

    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Fill the area under the wave
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Add glow effect
    ctx.shadowColor = "rgba(16, 185, 129, 0.5)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
  };

  // Draw circular visualization
  const drawCircular = (
    ctx: CanvasRenderingContext2D,
    dataArray: Uint8Array,
    width: number,
    height: number,
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.1, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(16, 185, 129, 0.8)";
    ctx.fill();

    // Add inner glow
    ctx.shadowColor = "rgba(16, 185, 129, 0.8)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    const barCount = Math.min(dataArray.length, 128);
    const angleStep = (Math.PI * 2) / barCount;

    for (let i = 0; i < barCount; i++) {
      const amplitude = dataArray[i] / 255;
      const barHeight = radius * 0.3 + radius * 0.6 * amplitude;

      const angle = i * angleStep;

      const x1 = centerX + Math.cos(angle) * radius * 0.3;
      const y1 = centerY + Math.sin(angle) * radius * 0.3;
      const x2 = centerX + Math.cos(angle) * barHeight;
      const y2 = centerY + Math.sin(angle) * barHeight;

      // Create gradient for each line
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, "rgba(16, 185, 129, 0.2)");
      gradient.addColorStop(1, "rgba(16, 185, 129, 0.8)");

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Add small circle at the end of each line
      if (amplitude > 0.5) {
        ctx.beginPath();
        ctx.arc(x2, y2, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(16, 185, 129, 0.8)";
        ctx.fill();
      }
    }

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
      {!isPlaying && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-emerald-400/50 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Play to visualize
        </motion.div>
      )}
    </div>
  );
}
