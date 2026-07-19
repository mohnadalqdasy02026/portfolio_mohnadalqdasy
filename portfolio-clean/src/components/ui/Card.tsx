"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className, hover = true, glow = false }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
      className={cn(
        "relative rounded-2xl bg-card text-card-foreground border border-border/50",
        "backdrop-blur-sm overflow-hidden",
        glow && "hover:shadow-glow-lg",
        className
      )}
    >
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
