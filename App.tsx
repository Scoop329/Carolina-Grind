/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Rocket, Globe, Zap, Mic2, Briefcase, Menu, X, MapPin, Play, ChevronLeft, ChevronRight, TrendingUp, Users, Star } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ArtistCard from './components/ArtistCard';
import AIChat from './components/AIChat'; // Added back AIChat import
import { SpotlightProfile } from './types';

// Dummy Data for Carolina Grind
const SPOTLIGHTS: SpotlightProfile[] = [
  { 
    id: '1', 
    name: 'Upcoming Artist', 
    category: 'Music', 
    location: '', 
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
    tagline: 'Lyrical Precision',
    description: 'Redefining the Charlotte sound with intricate flows and soulful samples that speak to the heart of the 704.'
  },
  { 
    id: '2', 
    name: 'Business Entrepreneur Spot Light', 
    category: 'Business', 
    location: '', 
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop',
    tagline: 'Innovation Hub',
    description: 'A startup incubator connecting coastal visionaries with global capital. Building the silicon harbor.'
  },
  { 
    id: '3', 
    name: 'Carolina Models', 
    category: 'Business', 
    location: '', 
    image: 'https://images.unsplash.com/photo-1595867905183-b78912d8a573?q=80&w=1000&auto=format&fit=crop',
    tagline: 'Runway Ready',
    description: 'Premier modeling agency representing the finest diverse talent in the Carolinas. Fashion, print, and runway.'
  },
  { 
    id: '4', 
    name: 'Latora Apparel', 
    category: 'Business', 
    location: 'Greenville, NC', 
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop',
    tagline: 'Streetwear Luxury',
    description: 'High-end streetwear manufacturing rooted in textile tradition, designed for the modern hustle.'
  },
  { 
    id: '5', 
    name: 'Podcast', 
    category: 'Music', 
    location: '', 
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop',
    tagline: 'Underground King',
    description: 'Gritty, authentic hip-hop production that pays homage to the history of Durham while pushing sonic boundaries.'
  },
  { 
    id: '6', 
    name: 'Cola Creatives', 
    category: 'Business', 
    location: 'Columbia, SC', 
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop',
    tagline: 'Digital Agency',
    description: 'Full-service branding agency helping local artists and small businesses scale their digital footprint.'
  },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<SpotlightProfile | null>(null);
  
  const [submittingIndex, setSubmittingIndex] = useState<number | null>(null);
  const [submittedIndex, setSubmittedIndex] = useState<number | null>(null);

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProfile) return;
      if (e.key === 'ArrowLeft') navigateProfile('prev');
      if (e.key === 'ArrowRight') navigateProfile('next');
      if (e.key === 'Escape') setSelectedProfile(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProfile]);

  const handleSubmit = (index: number) => {
    setSubmittingIndex(index);
    setTimeout(() => {
      setSubmittingIndex(null);
      setSubmittedIndex(index);
    }, 2000);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateProfile = (direction: 'next' | 'prev') => {
    if (!selectedProfile) return;
    const currentIndex = SPOTLIGHTS.findIndex(a => a.id === selectedProfile.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % SPOTLIGHTS.length;
    } else {
      nextIndex = (currentIndex - 1 + SPOTLIGHTS.length) % SPOTLIGHTS.length;
    }
    setSelectedProfile(SPOTLIGHTS[nextIndex]);
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-[#fbbf24] selection:text-black cursor-auto md:cursor-none overflow-x-hidden font-sans">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50">CAROLINA GRIND</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {['Spotlight', 'Why Join', 'Submit'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
              className="hover:text-[#fbbf24] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        <button 
          onClick={() => scrollToSection('submit')}
          className="hidden md:inline-block border border-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer bg-transparent"
          data-hover="true"
        >
          Get Featured
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Spotlight', 'Why Join', 'Submit'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="text-4xl font-heading font-bold text-white hover:text-[#fbbf24] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('submit')}
              className="mt-8 bg-[#fbbf24] px-10 py-4 text-sm font-bold tracking-widest uppercase text-black border-none"
            >
              Get Featured
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20"
        >
           {/* Region Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-6 text-xs md:text-base font-mono text-[#fbbf24] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 bg-black/40 px-6 py-2 rounded-full backdrop-blur-md border border-[#fbbf24]/30"
          >
            <span>North Carolina</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse"/>
            <span>South Carolina</span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full flex justify-center items-center flex-col">
            <GradientText 
              text="CAROLINA" 
              as="h1" 
              className="text-[12vw] md:text-[10vw] leading-[0.9] font-black tracking-tighter text-center" 
            />
             <GradientText 
              text="GRIND" 
              as="h1" 
              className="text-[15vw] md:text-[13vw] leading-[0.85] font-black tracking-tighter text-center text-[#fbbf24]" 
            />
            {/* Orb */}
            <motion.div 
               className="absolute -z-20 w-[60vw] h-[60vw] bg-[#fbbf24]/10 blur-[60px] rounded-full pointer-events-none will-change-transform"
               animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.4, 0.2] }}
               transition={{ duration: 5, repeat: Infinity }}
               style={{ transform: 'translateZ(0)' }}
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent mt-8 mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-xl font-light max-w-2xl mx-auto text-white/90 leading-relaxed drop-shadow-lg px-4"
          >
            Spotlighting the raw talent and relentless ambition of the Carolinas. 
            <span className="block mt-2 text-[#fbbf24] font-bold">Music. Business. Culture.</span>
          </motion.p>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1, duration: 1 }}
             className="mt-8 flex gap-4"
          >
             <button onClick={() => scrollToSection('spotlight')} className="bg-[#fbbf24] text-black px-8 py-3 font-bold uppercase tracking-wider hover:bg-white transition-colors">
                Explore Talent
             </button>
             <button onClick={() => scrollToSection('submit')} className="border border-white/30 bg-black/30 backdrop-blur-sm text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">
                Get Featured
             </button>
          </motion.div>
        </motion.div>

        {/* MARQUEE */}
        <div className="absolute bottom-12 md:bottom-16 left-0 w-full py-4 md:py-6 bg-[#fbbf24] text-black z-20 overflow-hidden border-y-4 border-black shadow-[0_0_40px_rgba(251,191,36,0.2)]">
          <motion.div 
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-3xl md:text-6xl font-heading font-black px-8 flex items-center gap-4">
                    NC ⇄ SC <span className="text-black/50 text-2xl md:text-4xl">●</span> 
                    RESPECT THE GRIND <span className="text-black/50 text-2xl md:text-4xl">●</span> 
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* SPOTLIGHT SECTION (Formerly Lineup) */}
      <section id="spotlight" className="relative z-10 py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 px-4">
             <div className="w-full">
                <p className="text-[#fbbf24] font-mono mb-2 uppercase tracking-widest">Fresh off the Grind</p>
                <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] drop-shadow-lg break-words w-full md:w-auto">
                  Featured <br/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">Talent</span>
                </h2>
                <p className="mt-6 text-xl text-gray-300 max-w-2xl">Discover the innovators and creators defining the new Carolina standard.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10 bg-black/40 backdrop-blur-sm">
            {SPOTLIGHTS.map((profile) => (
              <ArtistCard key={profile.id} profile={profile} onClick={() => setSelectedProfile(profile)} />
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROP SECTION (Formerly Experience) */}
      <section id="why-join" className="relative z-10 py-20 md:py-32 bg-gradient-to-b from-black to-black backdrop-blur-sm border-t border-white/10 overflow-hidden">
        {/* Decorative blurred circle */}
        <div className="absolute top-1/2 left-[-10%] w-[40vw] h-[40vw] bg-[#fbbf24]/10 rounded-full blur-[80px] pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
            
            {/* Left Content */}
            <div className="lg:col-span-5 order-2 lg:order-1 sticky top-32">
              <h2 className="text-4xl md:text-7xl font-heading font-bold mb-6 md:mb-8 leading-tight">
                FUEL YOUR <br/> <GradientText text="AMBITION" className="text-5xl md:text-8xl" />
              </h2>
              <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-12 font-light leading-relaxed drop-shadow-md">
                We bridge the gap between creation and recognition. Whether you're dropping beats or building brands, Carolina Grind provides the platform you need to level up.
              </p>
              
              <div className="space-y-8">
                {[
                  { 
                    icon: Mic2, 
                    title: 'For Artists', 
                    desc: 'Amplify your sound beyond the studio. Get discovered by regional promoters, collaborators, and new fans hungry for local heat.' 
                  },
                  { 
                    icon: Briefcase, 
                    title: 'For Entrepreneurs', 
                    desc: 'Scale your reach. Connect with strategic partners and showcase your business to a loyal community that supports local growth.' 
                  },
                  { 
                    icon: Users, 
                    title: 'For The Culture', 
                    desc: 'A curated hub for discovery. Find your next favorite artist, support local black-owned businesses, and keep the ecosystem thriving.' 
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className="p-4 rounded-2xl bg-[#fbbf24]/10 backdrop-blur-md border border-[#fbbf24]/20 group-hover:bg-[#fbbf24]/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-[#fbbf24]" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 font-heading uppercase">{feature.title}</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image/Visual */}
            <div className="lg:col-span-7 relative h-[500px] md:h-[800px] w-full order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fbbf24] to-gray-800 rounded-3xl -rotate-2 opacity-20 blur-xl" />
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1000&auto=format&fit=crop" 
                  alt="Artist performing" 
                  className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 will-change-transform filter contrast-125 grayscale" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 pr-6">
                  <div className="inline-block px-3 py-1 bg-[#fbbf24] text-black font-bold text-xs mb-4 uppercase tracking-widest">
                    Community First
                  </div>
                  <div className="text-3xl md:text-5xl font-heading font-bold text-white mb-2">
                    THE CAROLINAS ARE RISING.
                  </div>
                  <div className="text-lg md:text-xl font-mono text-gray-300">
                    Don't sleep on the movement.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUBMISSION SECTION (Formerly Tickets) */}
      <section id="submit" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-black/60 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
             <h2 className="text-5xl md:text-9xl font-heading font-bold opacity-10 text-white select-none">
               SUBMIT
             </h2>
             <p className="text-[#fbbf24] font-mono uppercase tracking-widest -mt-4 md:-mt-10 relative z-10 text-sm md:text-lg font-bold">
               Claim Your Spot
             </p>
             <p className="mt-4 text-gray-400 max-w-lg mx-auto">
               We are looking for the best of the Carolinas. Select a package below to start your journey with Carolina Grind.
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'The Come Up', price: 'Free', color: 'white', accent: 'bg-white/5', features: ['Community Listing', 'Newsletter Mention', 'Basic Profile'] },
              { name: 'The Hustle', price: '$49', color: 'gold', accent: 'bg-[#fbbf24]/10 border-[#fbbf24]/50', features: ['Featured Homepage Spot', 'Social Media Shoutout', 'Extended Bio & Links', 'Priority Review'] },
              { name: 'The Mogul', price: '$149', color: 'purple', accent: 'bg-white/10 border-white/50', features: ['Permanent Feature', 'Exclusive Interview', 'Video Spotlight', 'Business Consultation'] },
            ].map((tier, i) => {
              const isSubmitting = submittingIndex === i;
              const isSubmitted = submittedIndex === i;
              const isDisabled = (submittingIndex !== null) || (submittedIndex !== null);

              return (
                <motion.div
                  key={i}
                  whileHover={isDisabled ? {} : { y: -20 }}
                  className={`relative p-8 md:p-10 border border-white/10 backdrop-blur-md flex flex-col min-h-[500px] transition-colors duration-300 ${tier.accent} ${isDisabled && !isSubmitted ? 'opacity-50 grayscale' : ''} will-change-transform`}
                  data-hover={!isDisabled}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-white uppercase">{tier.name}</h3>
                    <div className={`text-4xl md:text-5xl font-bold mb-8 md:mb-10 tracking-tighter ${tier.color === 'white' ? 'text-white' : tier.color === 'gold' ? 'text-[#fbbf24]' : 'text-gray-200'}`}>
                      {tier.price}
                    </div>
                    <ul className="space-y-4 md:space-y-6 text-sm text-gray-200">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                           {i === 0 ? <Star className="w-4 h-4 text-gray-500"/> : <Rocket className={`w-4 h-4 ${i === 1 ? 'text-[#fbbf24]' : 'text-white'}`} />}
                           {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    onClick={() => handleSubmit(i)}
                    disabled={isDisabled}
                    className={`w-full py-4 text-sm font-bold uppercase tracking-[0.2em] border border-white/20 transition-all duration-300 mt-8 group overflow-hidden relative 
                      ${isSubmitted 
                        ? 'bg-green-500 text-black border-green-500 cursor-default' 
                        : isSubmitting 
                          ? 'bg-white/20 text-white cursor-wait'
                          : isDisabled 
                            ? 'cursor-not-allowed opacity-50' 
                            : 'text-white cursor-pointer hover:bg-[#fbbf24] hover:text-black hover:border-[#fbbf24]'
                      }`}
                  >
                    <span className="relative z-10">
                      {isSubmitting ? 'Processing...' : isSubmitted ? 'Application Sent' : 'Select Package'}
                    </span>
                  </button>
                  
                  {isSubmitted && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-center mt-3 text-white/40 font-mono"
                    >
                      Demo mode: No payment taken.
                    </motion.p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-12 md:py-16 bg-black backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
             <div className="font-heading text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-white">CAROLINA GRIND</div>
             <div className="flex gap-2 text-xs font-mono text-gray-400">
               <span>EST. 2025</span>
               <span>●</span>
               <span>NC & SC</span>
             </div>
          </div>
          
          <div className="flex gap-6 md:gap-8 flex-wrap">
             <span className="text-gray-500 text-xs">© 2025 Carolina Grind Platform</span>
            <a href="#" className="text-gray-400 hover:text-[#fbbf24] font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-[#fbbf24] font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              Twitter
            </a>
          </div>
        </div>
      </footer>

      {/* Profile Detail Modal */}
      <AnimatePresence>
        {selectedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProfile(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#0f0f13] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-[#fbbf24]/10 group/modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProfile(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateProfile('prev'); }}
                className="absolute left-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                data-hover="true"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateProfile('next'); }}
                className="absolute right-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm md:right-8"
                data-hover="true"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedProfile.id}
                    src={selectedProfile.image} 
                    alt={selectedProfile.name} 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover grayscale"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 pb-24 md:p-12 flex flex-col justify-center relative">
                <motion.div
                  key={selectedProfile.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 text-[#fbbf24] mb-4">
                     <MapPin className="w-4 h-4" />
                     <span className="font-mono text-sm tracking-widest uppercase">{selectedProfile.location}</span>
                  </div>
                  
                  <h3 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-none mb-2 text-white">
                    {selectedProfile.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <span className="px-2 py-1 border border-white/20 text-xs uppercase tracking-wider text-gray-300 rounded-md">
                      {selectedProfile.category}
                    </span>
                    <span className="text-[#fbbf24] font-medium tracking-widest uppercase text-lg">
                       // {selectedProfile.tagline}
                    </span>
                  </div>
                  
                  <div className="h-px w-20 bg-[#fbbf24]/50 mb-6" />
                  
                  <p className="text-gray-300 leading-relaxed text-lg font-light mb-8">
                    {selectedProfile.description}
                  </p>
                  
                  <div className="flex gap-4">
                    <button className="px-6 py-2 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-[#fbbf24] transition-colors">
                      View Profile
                    </button>
                    {selectedProfile.category === 'Music' ? (
                       <button className="px-6 py-2 border border-white/30 text-white font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2">
                         <Play className="w-3 h-3" /> Latest Track
                       </button>
                    ) : (
                       <button className="px-6 py-2 border border-white/30 text-white font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2">
                         <TrendingUp className="w-3 h-3" /> Website
                       </button>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;