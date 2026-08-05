import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import StaggerContainer, { staggerChild } from './StaggerContainer';

const steps = [
  {
    num: '01',
    title: 'Sign Up',
    description: 'Create your free AWDEA account.',
    note: 'Eligibility is restricted to disabled adults aged 19+.',
  },
  {
    num: '02',
    title: 'Register for an Event',
    description: "Browse what's available on the Raffle Events page and enter.",
  },
  {
    num: '03',
    title: 'Wait for the Raffle',
    description: 'Draws happen two weeks before each event date.',
  },
  {
    num: '04',
    title: 'Receive Your Tickets',
    description:
      'Winners get an email with their tickets roughly two weeks before the event.',
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="bg-[var(--color-mist)] px-6 py-24 md:px-12">
    <div className="mx-auto max-w-6xl">
      <ScrollReveal className="mb-16 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-brand)]">
          Coming soon
        </p>
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          How it works
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          Four steps between you and a night out.
        </p>
      </ScrollReveal>

      <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, idx) => (
          <motion.article
            key={step.num}
            variants={staggerChild}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ y: -6 }}
            className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-xl"
          >
            <span
              aria-hidden="true"
              className="mb-5 block text-3xl font-extrabold tracking-tight text-[var(--color-brand)]/25"
            >
              {step.num}
            </span>
            <h3 className="mb-3 text-xl font-bold text-slate-900">{step.title}</h3>
            <p className="text-base leading-relaxed text-slate-700">
              {step.description}
            </p>
            {step.note && (
              <p className="mt-4 text-sm text-slate-500">{step.note}</p>
            )}

            {idx < steps.length - 1 && (
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 + idx * 0.12 }}
                style={{ originX: 0 }}
                className="absolute top-14 hidden h-0.5 w-6 bg-slate-300 lg:-right-6 lg:block"
              />
            )}
          </motion.article>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default HowItWorks;
