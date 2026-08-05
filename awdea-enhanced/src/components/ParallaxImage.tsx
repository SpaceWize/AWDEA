import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  distance?: number;
  className?: string;
  imgClassName?: string;
}

const ParallaxImage = ({
  src,
  alt,
  distance = 40,
  className = '',
  imgClassName = '',
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const travel = prefersReducedMotion ? 0 : distance;
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel]);

  return (
    <div ref={ref} className={className}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y }}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
};

export default ParallaxImage;
