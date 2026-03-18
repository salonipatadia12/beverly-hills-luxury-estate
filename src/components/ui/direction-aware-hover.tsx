"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const DirectionAwareHover = ({
  imageUrl,
  backgroundColor,
  defaultContent,
  children,
  childrenClassName,
  imageClassName,
  className,
  style,
}: {
  imageUrl?: string;
  backgroundColor?: string;
  defaultContent?: React.ReactNode;
  children: React.ReactNode | string;
  childrenClassName?: string;
  imageClassName?: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<
    "top" | "bottom" | "left" | "right" | string
  >("left");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!ref.current) return;
    const direction = getDirection(event, ref.current);
    switch (direction) {
      case 0:
        setDirection("top");
        break;
      case 1:
        setDirection("right");
        break;
      case 2:
        setDirection("bottom");
        break;
      case 3:
        setDirection("left");
        break;
      default:
        setDirection("left");
        break;
    }
  };

  const getDirection = (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    obj: HTMLElement
  ) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect();
    const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
    const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    return d;
  };

  return (
    <motion.div
      onMouseEnter={(e) => {
        handleMouseEnter(e);
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      ref={ref}
      className={cn(
        "bg-transparent rounded-lg overflow-hidden group/card relative h-full",
        className
      )}
      style={style}
    >
      {/* Image container with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          className="absolute inset-0 h-full w-full"
          initial="initial"
          whileHover={direction}
          exit="exit"
        >
          <motion.div
            variants={variants}
            className={cn("h-full w-full relative", imageClassName)}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            {imageUrl ? (
              <Image
                alt="image"
                className={cn("h-full w-full object-cover scale-[1.15]", imageClassName)}
                width="1000"
                height="1000"
                src={imageUrl}
              />
            ) : (
              <div className={cn("h-full w-full", imageClassName)} style={{ background: backgroundColor || '#111111' }} />
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Black overlay on hover - direct child of card */}
      <div className="group-hover/card:block hidden absolute inset-0 w-full h-full bg-black/40 z-10 transition duration-500 pointer-events-none" />

      {/* Default content (if any) */}
      {defaultContent && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 group-hover/card:opacity-0 transition-opacity duration-300 pointer-events-none">
          {defaultContent}
        </div>
      )}

      {/* Text overlay - direct child of card, appears on hover */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className={cn(
          "text-white absolute bottom-0 left-0 right-0 z-40 pointer-events-none",
          childrenClassName
        )}
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 70%, transparent 100%)',
          padding: '24px 24px 20px 24px',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const variants = {
  initial: { x: 0 },
  exit: { x: 0, y: 0 },
  top: { y: 20 },
  bottom: { y: -20 },
  left: { x: 20 },
  right: { x: -20 },
};

const textVariants = {
  initial: { y: 0, x: 0, opacity: 0 },
  exit: { y: 0, x: 0, opacity: 0 },
  top: { y: -20, opacity: 1 },
  bottom: { y: 2, opacity: 1 },
  left: { x: -2, opacity: 1 },
  right: { x: 20, opacity: 1 },
};
