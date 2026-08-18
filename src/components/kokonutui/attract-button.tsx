"use client";

/**
 * @author: @dorianbaffier
 * @description: Attract Button
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { ArrowRight } from "lucide-react";
import { motion, useAnimation } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AttractButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  particleCount?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

export default function AttractButton({
  children,
  className,
  particleCount = 12,
  ...props
}: AttractButtonProps) {
  const [isAttracting, setIsAttracting] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particlesControl = useAnimation();

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 360 - 180,
      y: Math.random() * 360 - 180,
    }));
    // Seeding state from an effect is deliberate, not an oversight. These
    // positions come from Math.random(), so computing them during render would
    // give the server and the client different inline styles and break
    // hydration. Deferring to after mount keeps the server HTML particle-free.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(newParticles);
  }, [particleCount]);

  const handleInteractionStart = useCallback(async () => {
    setIsAttracting(true);
    await particlesControl.start({
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
      },
    });
  }, [particlesControl]);

  const handleInteractionEnd = useCallback(async () => {
    setIsAttracting(false);
    await particlesControl.start((i) => ({
      x: particles[i].x,
      y: particles[i].y,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }));
  }, [particlesControl, particles]);

  return (
    <Button
      asChild={false}
      className={cn(
        "relative min-w-40 touch-none overflow-hidden rounded-full",
        "h-auto px-7 py-3.5",
        "bg-ink-900 text-paper hover:bg-ink-800",
        "transition-all duration-300",
        className
      )}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchEnd={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      {...props}
    >
      {particles.map((_, index) => (
        <motion.div
          animate={particlesControl}
          className={cn(
            "absolute h-1.5 w-1.5 rounded-full",
            "bg-flame-500",
            "transition-opacity duration-300",
            isAttracting ? "opacity-100" : "opacity-40"
          )}
          custom={index}
          initial={{ x: particles[index].x, y: particles[index].y }}
          key={index}
        />
      ))}
      <span className="relative flex w-full items-center justify-center gap-2 font-medium">
        {children}
        <ArrowRight
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            isAttracting && "translate-x-1"
          )}
        />
      </span>
    </Button>
  );
}
