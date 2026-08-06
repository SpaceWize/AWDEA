import { motion, useReducedMotion } from 'framer-motion';
import { Link } from '../lib/router';
import { smoothScrollToId } from '../lib/smoothScroll';
import { outlineButton, primaryButton } from '../lib/styles';

const words = ['Entertainment', 'without', 'exclusion.'];

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-[var(--color-mist)] px-6 pt-28 pb-20 md:px-12"
    >
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute -right-24 top-1/4 h-[520px] w-[520px] rounded-full bg-[var(--color-brand)]/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-brand)]"
        >
          Adults With Disabilities Entertainment Association
        </motion.p>

        {/* Fluid size: "Entertainment" is one long unbreakable word, so a fixed
            48px overflows a 320px viewport (WCAG 1.4.10 reflow). */}
        <h1 className="mb-8 text-[clamp(2rem,8vw,5rem)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.2 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mr-4 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-700 md:text-xl"
        >
          We connect disabled adults across British Columbia with free and discounted
          tickets to concerts, festivals, and sporting events.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="flex flex-wrap gap-4"
        >
          <Link to="/donate" className={primaryButton}>
            Support our mission
          </Link>
          <a
            href="#how-it-works"
            onClick={(event) => {
              event.preventDefault();
              smoothScrollToId('how-it-works');
            }}
            className={outlineButton}
          >
            See how it works
          </a>
        </motion.div>
      </div>

      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-600">
            Scroll to explore
          </span>
          <span className="grid h-10 w-6 place-items-start rounded-full border-2 border-slate-400 pt-2">
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="mx-auto h-1.5 w-1.5 rounded-full bg-slate-500"
            />
          </span>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
