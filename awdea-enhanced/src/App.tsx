import { AnimatePresence, motion } from 'framer-motion';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import { Link, useRouter } from './lib/router';
import Donate from './pages/Donate';
import Donors from './pages/Donors';
import Home from './pages/Home';
import OurTeam from './pages/OurTeam';

const routes: Record<string, { title: string; element: React.ReactNode }> = {
  '/': { title: 'AWDEA — Accessible Entertainment for All', element: <Home /> },
  '/bios': { title: 'Our Team — AWDEA', element: <OurTeam /> },
  '/donate': { title: 'How to Donate — AWDEA', element: <Donate /> },
  '/donors': { title: 'Our Donors — AWDEA', element: <Donors /> },
};

const NotFound = () => (
  <section className="grid min-h-screen place-items-center px-6 pt-24">
    <div className="text-center">
      <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mb-8 text-lg text-slate-600">
        That page doesn’t exist yet.
      </p>
      <Link
        to="/"
        className="inline-grid min-h-12 place-items-center rounded-full bg-[var(--color-brand)] px-8 font-semibold text-white"
      >
        Back to home
      </Link>
    </div>
  </section>
);

const App = () => {
  const { path } = useRouter();
  const route = routes[path];

  document.title = route?.title ?? 'AWDEA';

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <Navigation />

      <main id="main">
        {/* Slow cross-fade between pages. mode="wait" lets the old page finish
            leaving before the new one arrives. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={path}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {route?.element ?? <NotFound />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
};

export default App;
