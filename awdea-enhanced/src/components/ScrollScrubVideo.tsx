import { useEffect, useRef, useState } from 'react';
import { useReducedMotion, useScroll } from 'framer-motion';
import type { UseScrollOptions } from 'framer-motion';

interface ScrollScrubVideoProps {
  /** Path under the public dir, e.g. "media/clip.mp4" — no leading slash. */
  src: string;
  /**
   * What the footage shows. This becomes the accessible name, so write it the
   * way you'd write alt text: describe the scene, not the fact it's a video.
   */
  label: string;
  /** Aspect-ratio utility matching the clip's native ratio, to avoid cropping. */
  aspect?: string;
  className?: string;
  /** Frame to hold when motion is reduced, as a fraction of the duration. */
  stillAt?: number;
  /**
   * Scroll range the clip is mapped across. The default spans the element's
   * full travel through the viewport, which is the slowest possible scrub — but
   * a section near the bottom of the page runs out of scroll before the clip
   * finishes, so those need a range that completes earlier.
   */
  offset?: UseScrollOptions['offset'];
  /**
   * Fraction to trim off the right and bottom edges, by scaling the frame up
   * from its top-left corner. The generated clips carry a watermark down in
   * the bottom-right; this pushes it outside the container. Set to 0 once the
   * clips are replaced with clean exports.
   */
  trimCorner?: number;
}

/**
 * A short clip whose playhead is driven by scroll position rather than by
 * playback — the footage advances as the section travels through the viewport
 * and stops when the user stops.
 *
 * Two things make this safe for the audience this site serves:
 *  - Under `prefers-reduced-motion` it never scrubs. It holds a single frame
 *    and behaves exactly like a photograph.
 *  - The clip is silent and decorative-adjacent, so the wrapper carries
 *    role="img" with a descriptive label and the <video> is hidden from the
 *    accessibility tree. A screen reader announces one image, not a media
 *    player it can't operate.
 */
const ScrollScrubVideo = ({
  src,
  label,
  aspect = 'aspect-video',
  className = '',
  stillAt = 0.45,
  offset = ['start end', 'end start'],
  trimCorner = 0,
}: ScrollScrubVideoProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  // These clips are large, so the file isn't requested until the section is
  // nearly on screen. Nothing downloads for a visitor who never scrolls here.
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '700px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready) return;

    if (reduceMotion) {
      video.currentTime = video.duration * stillAt;
      return;
    }

    // Seeks are coalesced into one per frame: scroll fires far more often than
    // the decoder can serve, and queueing every event makes it fall behind.
    let frame = 0;
    let progress = scrollYProgress.get();

    const seek = () => {
      frame = 0;
      const target = progress * video.duration;
      if (Math.abs(video.currentTime - target) > 0.02) video.currentTime = target;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(seek);
    };

    const unsubscribe = scrollYProgress.on('change', (value) => {
      progress = Math.min(Math.max(value, 0), 1);
      schedule();
    });

    schedule(); // land on the right frame for wherever the page already is
    return () => {
      unsubscribe();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ready, reduceMotion, scrollYProgress, stillAt]);

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label={label}
      className={`relative overflow-hidden rounded-3xl bg-slate-200 ${aspect} ${className}`}
    >
      {near && (
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}${src}`}
          onLoadedMetadata={() => setReady(true)}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          style={
            trimCorner
              ? {
                  transform: `scale(${(1 / (1 - trimCorner)).toFixed(4)})`,
                  transformOrigin: 'top left',
                }
              : undefined
          }
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
};

export default ScrollScrubVideo;
