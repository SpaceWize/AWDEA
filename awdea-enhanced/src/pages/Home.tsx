import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import ScrollScrubVideo from '../components/ScrollScrubVideo';
import ScrollReveal from '../components/ScrollReveal';
import StaggerContainer, { staggerChild } from '../components/StaggerContainer';
import { Link } from '../lib/router';
import { outlineButton, primaryButton, sectionTitle } from '../lib/styles';

const offers = [
  { title: 'Concerts', body: 'Live music from local venues to arena headliners.' },
  {
    title: 'Festivals',
    body: 'Seasonal and cultural festivals across the Lower Mainland.',
  },
  {
    title: 'Sporting Events',
    body: 'Games and matches with accessible seating arrangements.',
  },
];

const Home = () => (
  <>
    <Hero />

    <section id="about" className="px-6 py-24 md:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <ScrollReveal direction="left">
          <h2 className={`mb-6 ${sectionTitle}`}>What we are about</h2>
          <p className="mb-8 text-lg leading-relaxed text-slate-700">
            AWDEA was conceptualized by James Willetts, a quadriplegic, who
            recognized that many in the disabled community are shut out of the
            entertainment happening all around them. We exist to close that gap.
          </p>
          <Link to="/bios" className={outlineButton}>
            Meet our team
          </Link>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.15}>
          <ScrollScrubVideo
            src="media/about-conversation.mp4"
            poster="media/about-conversation-poster.jpg"
            label="People seated together in an accessible seating area at a live event, talking and smiling"
            aspect="aspect-video"
            trimCorner={0.2}
          />
        </ScrollReveal>
      </div>
    </section>

    <section className="bg-slate-900 px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mb-14 max-w-2xl">
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
            What we offer
          </h2>
          <p className="text-lg leading-relaxed text-slate-300">
            Register with AWDEA and you can win{' '}
            <span className="font-semibold text-[var(--color-accent)]">
              free and discounted tickets
            </span>{' '}
            to entertainment events near you.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <motion.article
              key={offer.title}
              variants={staggerChild}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors duration-500 hover:border-[var(--color-accent)]/60"
            >
              <h3 className="mb-3 text-xl font-bold">{offer.title}</h3>
              <p className="leading-relaxed text-slate-300">{offer.body}</p>
            </motion.article>
          ))}
        </StaggerContainer>
      </div>
    </section>

    <HowItWorks />

    <section className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <h2 className={`mb-6 ${sectionTitle}`}>Get involved</h2>
          <p className="mb-10 text-lg leading-relaxed text-slate-700">
            Support our mission by donating tickets, making a financial
            contribution, or simply spreading the word.
          </p>
          <Link to="/donate" className={primaryButton}>
            How to donate
          </Link>
        </ScrollReveal>
      </div>
    </section>

    <section className="bg-[var(--color-mist)] px-6 py-24 md:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <ScrollReveal direction="left">
          <ScrollScrubVideo
            src="media/ramp-wheelchair.mp4"
            poster="media/ramp-wheelchair-poster.jpg"
            label="A wheelchair user propelling themselves along a wooden boardwalk, gloved hand gripping the wheel rim"
            aspect="aspect-square"
            className="mx-auto w-full max-w-md"
            // Last section on the page — the default range would leave the
            // final third of the clip unreachable before the footer stops us.
            endAt="center"
            trimCorner={0.12}
          />
        </ScrollReveal>
        <ScrollReveal direction="right" delay={0.15}>
          <h2 className={`mb-6 ${sectionTitle}`}>Accessible venues</h2>
          <p className="text-lg leading-relaxed text-slate-700">
            Exploring accessible venues and locations for disabled adults opens up
            a world of inclusive opportunity.
          </p>
        </ScrollReveal>
      </div>
    </section>
  </>
);

export default Home;
