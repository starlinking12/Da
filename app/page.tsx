'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import Image from 'next/image';
import { 
  Car, 
  PaintRoller, 
  Wrench, 
  Stethoscope, 
  Ship, 
  Sparkle, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight 
} from 'lucide-react';

// --- Premium Animated Components ---

const CountUp = ({ to, label }: { to: string, label: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const targetValue = parseInt(to.replace(/\D/g, ''));
  const suffix = to.replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startValue = 0;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            if (progress >= 1) {
              setCount(targetValue);
              return;
            }

            // Ease out expo
            const easedProgress = 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easedProgress * targetValue));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [targetValue]);

  return (
    <div ref={nodeRef} className="text-center group">
      <div className="text-4xl md:text-6xl font-display font-black text-gold mb-2 transition-transform duration-500 group-hover:scale-110">
        {count}{suffix}
      </div>
      <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-bold">{label}</div>
    </div>
  );
};

const TiltGalleryItem = ({ src, alt, title, subtitle, delay }: { src: string, alt: string, title: string, subtitle: string, delay: number }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [0, 1], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative aspect-video group overflow-hidden rounded-3xl cursor-pointer bg-charcoal"
    >
      <motion.div className="absolute inset-0" style={{ transform: "translateZ(30px)" }}>
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110" 
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8">
        <div style={{ transform: "translateZ(60px)" }}>
          <h4 className="text-gold font-display font-bold text-xl mb-1">{title}</h4>
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
};

const AnimatedInput = ({ label, type = "text", placeholder, options }: { label: string, type?: string, placeholder?: string, options?: string[] }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const inputId = label.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="space-y-2 relative">
      <label 
        htmlFor={inputId}
        className={`text-[10px] uppercase font-bold tracking-[0.2em] ml-1 transition-all duration-300 ${isFocused || value ? 'text-gold' : 'text-white/60'}`}
      >
        {label}
      </label>
      <div className="relative overflow-hidden rounded-xl">
        {type === "select" ? (
          <select 
            id={inputId}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-white/5 border border-white/10 p-4 focus:outline-none transition-all text-white font-medium appearance-none cursor-pointer"
          >
            {options?.map(opt => <option key={opt} className="bg-charcoal text-white">{opt}</option>)}
          </select>
        ) : type === "textarea" ? (
          <textarea 
            id={inputId}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setValue(e.target.value)}
            rows={4} 
            className="w-full bg-white/5 border border-white/10 p-4 focus:outline-none transition-all text-white font-medium resize-none" 
            placeholder={placeholder} 
          />
        ) : (
          <input 
            id={inputId}
            type={type}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-white/5 border border-white/10 p-4 focus:outline-none transition-all text-white font-medium" 
            placeholder={placeholder} 
          />
        )}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold origin-left z-10"
        />
      </div>
    </div>
  );
};

// --- Core UI Components ---

const Preloader = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] bg-rich-black flex items-center justify-center"
  >
    <div className="text-center">
      <motion.div
        initial={{ y: 20, opacity: 0, letterSpacing: "1em" }}
        animate={{ y: 0, opacity: 1, letterSpacing: "0.5em" }}
        transition={{ duration: 1, ease: "circOut" }}
        className="text-5xl font-display font-black text-gold mb-6"
      >
        DAMIZ
      </motion.div>
      <div className="w-48 h-[1px] bg-white/10 mx-auto relative overflow-hidden">
        <motion.div
          animate={{ left: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gold/50 w-full"
        />
      </div>
    </div>
  </motion.div>
);

const Navbar = ({ onScrollTo }: { onScrollTo: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['home', 'services', 'gallery', 'about', 'contact'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'py-4 bg-rich-black/70 backdrop-blur-2xl border-b border-white/5 shadow-2xl' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" onClick={(e) => onScrollTo(e, 'home')} className="flex flex-col group relative z-[60]">
          <span className="text-2xl font-display font-black tracking-tighter text-gold group-hover:text-white transition-colors duration-500">DAMIZ</span>
          <span className="text-[10px] tracking-[0.3em] font-medium text-white/50 group-hover:text-gold transition-colors duration-500 uppercase">Auto Care</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <a 
              key={item} 
              href={`#${item}`} 
              onClick={(e) => onScrollTo(e, item)}
              className="text-[10px] font-bold text-white/50 hover:text-gold transition-all duration-300 uppercase tracking-[0.2em] relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
          <div className="flex items-center gap-4">
            <a 
              href="#contact" 
              onClick={(e) => onScrollTo(e, 'contact')}
              className="px-6 py-2.5 border border-gold/30 text-gold font-black text-[10px] uppercase tracking-widest hover:bg-gold hover:text-rich-black transition-all duration-500"
            >
              Book Now
            </a>
            <a 
              href="#contact" 
              onClick={(e) => onScrollTo(e, 'contact')}
              className="px-8 py-3 bg-gold text-rich-black font-black text-[10px] uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-500 shadow-[0_10px_30px_rgba(196,167,71,0.2)]"
            >
              Get Free Estimate
            </a>
          </div>
        </div>

        <button className="md:hidden text-gold z-[60] p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 bg-rich-black z-50 flex flex-col items-center justify-center gap-8 md:hidden p-6"
          >
            {navLinks.map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                onClick={(e) => { onScrollTo(e, item); setIsOpen(false); }}
                className="text-4xl font-display font-black text-white hover:text-gold transition-colors uppercase italic tracking-tighter"
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => { onScrollTo(e, 'contact'); setIsOpen(false); }}
              className="mt-8 px-12 py-5 bg-gold text-rich-black font-black uppercase text-sm tracking-widest"
            >
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Page Main ---

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative bg-rich-black">
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>

      <Navbar onScrollTo={scrollToSection} />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image 
             src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2000&auto=format&fit=crop" 
             alt="Professional Auto Body Workshop Background" 
             fill 
             className="object-cover opacity-30 grayscale"
             priority
           />
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rich-black/50 to-rich-black" />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <motion.div 
            initial="hidden" 
            animate={isLoading ? "hidden" : "visible"}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.8 } }
            }}
            className="max-w-4xl"
          >
            <motion.div variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }} className="flex items-center gap-3 mb-8">
              <span className="w-12 h-[2px] bg-gold" />
              <span className="text-gold tracking-[0.4em] text-[10px] font-black uppercase italic">Top Rated Auto Body In Ohio</span>
            </motion.div>
            
            <motion.h1 variants={{ hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="text-6xl md:text-9xl font-display font-black leading-[0.85] tracking-tighter mb-10 text-white uppercase italic">
              QUALITY <br />
              <span className="text-gold">AUTO BODY</span>
            </motion.h1>

            <motion.p variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="text-lg text-white/80 mb-12 max-w-xl font-medium leading-relaxed uppercase tracking-wider">
              Expert collision repair, professional paint, and full diagnostics for Toyota, Lexus, and all major makes and models.
            </motion.p>

            <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="flex flex-wrap gap-5">
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="group px-12 py-6 bg-gold text-rich-black font-black uppercase text-[11px] tracking-[0.2em] flex items-center gap-3 hover:bg-white transition-all shadow-2xl"
              >
                Get Free Estimate
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
              </a>
              <a 
                href="#services" 
                onClick={(e) => scrollToSection(e, 'services')}
                className="px-12 py-6 border border-white/10 text-white font-black uppercase text-[11px] tracking-[0.2em] hover:bg-white/10 transition-all backdrop-blur-md"
              >
                Our Services
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hidden md:flex flex-col items-center gap-3"
        >
          <span className="text-[9px] uppercase font-black tracking-[0.5em] vertical-rl">Scroll</span>
          <div className="w-[1px] h-12 bg-white" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
            <CountUp to="10+" label="Years in Business" />
            <CountUp to="850+" label="Cars Repaired" />
            <CountUp to="350+" label="Paint Jobs" />
            <CountUp to="98%" label="Happy Customers" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40">
        <div className="container mx-auto px-6">
          <div className="text-center mb-32">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Our Work</motion.span>
            <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter leading-none italic text-white">OUR SERVICES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: Car, title: 'Collision Repair', img: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2000&auto=format&fit=crop', desc: 'We handle everything from major accidents to frame straightening using professional equipment.' },
              { icon: PaintRoller, title: 'Custom Paint Work', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop', desc: 'Factory color matching and high-quality clear coats to make your car look like new again.' },
              { icon: Wrench, title: 'Paintless Dent Repair', img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2000&auto=format&fit=crop', desc: 'We can pull out most dents without needing to repaint, keeping your factory finish intact.' },
              { icon: Stethoscope, title: 'Computer Diagnostics', img: 'https://images.unsplash.com/photo-1593121925328-369ec34b1577?q=80&w=2000&auto=format&fit=crop', desc: 'Complete engine and system scans to find exactly what is wrong with your vehicle.' },
              { icon: Ship, title: 'Shipping & Export', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop', desc: 'If you need your vehicle moved across state lines or overseas, we handle the logistics.' },
              { icon: Sparkle, title: 'Full Detailing', img: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2000&auto=format&fit=crop', desc: 'Full interior and exterior cleaning, paint polishing, and protective coatings.' },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                whileHover={{ y: -15 }}
                className="group bg-charcoal/50 border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-gold/20 hover:shadow-[0_20px_60px_rgba(196,167,71,0.1)]"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image src={s.img} alt={s.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-rich-black/50 group-hover:bg-transparent transition-all duration-700" />
                  <div className="absolute bottom-6 left-6 w-14 h-14 bg-gold flex items-center justify-center rounded-2xl text-rich-black shadow-2xl"><s.icon size={26} /></div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-display font-black text-white mb-4 group-hover:text-gold transition-colors">{s.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-8 uppercase tracking-widest font-bold text-[10px]">{s.desc}</p>
                  <div className="pt-6 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Quality Workmanship Guaranteed</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-40 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
             <div className="max-w-2xl">
               <span className="text-gold font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block italic">Our Projects</span>
               <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter italic text-white leading-none">RECENT WORK.</h2>
             </div>
             <p className="text-white/60 text-[10px] font-black tracking-[0.5em] uppercase border-l border-white/10 pl-8">Quality you can see for yourself</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             <TiltGalleryItem 
               src="https://i.supaimg.com/132f2ac7-48b1-4d17-a8ab-6da547b28299/1e9d9fa9-c92d-48e9-ba1f-25858d3b826a.jpg" 
               alt="Toyota Build" 
               title="Toyota Heritage" 
               subtitle="Complete Body Restore" 
               delay={0.1} 
             />
             <TiltGalleryItem 
               src="https://i.supaimg.com/132f2ac7-48b1-4d17-a8ab-6da547b28299/933f5aa4-d4c1-4bc3-9d39-a5c6c6d9221f.jpg" 
               alt="Lexus Shine" 
               title="Lexus Glow" 
               subtitle="Custom Mirror Paint" 
               delay={0.2} 
             />
             <TiltGalleryItem 
               src="https://i.supaimg.com/132f2ac7-48b1-4d17-a8ab-6da547b28299/57862d7b-34fb-4312-85e0-3dc0316fcb9c.jpg" 
               alt="GX Body" 
               title="Lexus GX 460" 
               subtitle="Collision Recovery" 
               delay={0.3} 
             />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-40 relative">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1.2, ease: "circOut" }} 
            viewport={{ once: true }}
          >
            <span className="text-gold font-bold uppercase tracking-[0.5em] text-[10px] mb-8 block">About Us</span>
            <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter mb-10 italic leading-[0.9] text-white">
              Ohio&apos;s Complete <br /> <span className="text-white/30">Auto Care Specialists</span>
            </h2>
            <div className="space-y-8 text-white/70 text-[11px] font-black tracking-[0.2em] leading-relaxed uppercase max-w-lg">
              <p>With over a decade of experience, Damiz Auto Care provides complete auto repair and body work for all makes and models. We specialize in Toyota, Lexus, Honda, and Nissan, but service all vehicles with the same precision and care.</p>
              <p>From minor scratch repair to major collision work, painting, diagnostics, and even vehicle export - we do it all. Every car gets the royal treatment.</p>
            </div>
            <div className="mt-16 pt-12 border-t border-white/10 flex flex-wrap gap-12">
               {['TOYOTA', 'LEXUS', 'HONDA', 'NISSAN'].map(brand => (
                 <span key={brand} className="text-[10px] font-black tracking-[0.5em] text-white/60 hover:text-gold transition-colors duration-500 cursor-default">{brand}</span>
               ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }} 
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
            transition={{ duration: 1.5 }} 
            viewport={{ once: true }} 
            className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_0_100px_rgba(196,167,71,0.05)]"
          >
             <Image 
               src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000&auto=format&fit=crop" 
               alt="Expert At Work" 
               fill 
               className="object-cover grayscale hover:grayscale-0 transition-all duration-2000" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 via-transparent to-transparent" />
             <div className="absolute bottom-12 left-12 right-12 p-8 glass rounded-3xl border border-white/10">
                <div className="flex items-center gap-6">
                  <div className="text-6xl font-display font-black text-gold">10+</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 leading-tight italic">
                    Years of <br /> Real World <br /> Experience
                  </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee CTA */}
      <section className="py-24 bg-gold relative overflow-hidden group cursor-pointer">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap text-[22vh] font-display font-black italic text-rich-black/10 items-center gap-20 pointer-events-none"
        >
          <span>DAMIZ AUTO CARE</span>
          <span>QUALITY BODY WORK</span>
          <span>BEST IN OHIO</span>
          <span>DAMIZ AUTO CARE</span>
          <span>QUALITY BODY WORK</span>
          <span>BEST IN OHIO</span>
        </motion.div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 text-center px-6">
           <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter text-rich-black leading-none uppercase italic">GET YOUR CAR BACK ON THE ROAD.</h2>
           <a 
             href="#contact" 
             onClick={(e) => scrollToSection(e, 'contact')}
             className="px-16 py-7 bg-rich-black text-gold font-black uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-rich-black transition-all duration-700 shadow-3xl"
           >
             Get A Free Quote
           </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div>
               <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter mb-16 italic text-white uppercase">GET IN TOUCH <br /> <span className="text-gold">FOR AN ESTIMATE.</span></h2>
               <div className="space-y-12 font-black uppercase text-[11px] tracking-[0.3em]">
                  <div className="flex gap-8 items-center group cursor-pointer">
                    <div className="w-16 h-16 glass flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-rich-black transition-all duration-700 rounded-2xl"><MapPin size={24} /></div>
                    <div><div className="text-white/60 mb-1">HQ Workshop</div><div className="text-white text-sm">Ohio, United States</div></div>
                  </div>
                  <div className="flex gap-8 items-center group cursor-pointer">
                    <div className="w-16 h-16 glass flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-rich-black transition-all duration-700 rounded-2xl"><Phone size={24} /></div>
                    <div><div className="text-white/60 mb-1">Direct Line</div><div className="text-white text-sm">(380) 223-7472</div></div>
                  </div>
                  <div className="flex gap-8 items-center group cursor-pointer">
                    <div className="w-16 h-16 glass flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-rich-black transition-all duration-700 rounded-2xl"><MessageCircle size={24} /></div>
                    <div><div className="text-white/60 mb-1">WhatsApp</div><a href="https://wa.me/13802237472" target="_blank" className="text-gold text-sm underline decoration-gold/20 hover:decoration-gold transition-all italic">Launch Chat</a></div>
                  </div>
               </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="bg-white/[0.03] p-12 md:p-16 rounded-[3.5rem] border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[120px] pointer-events-none" />
              <div className="relative z-10 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <AnimatedInput label="Your Name" placeholder="Ex: Alex Johnson" />
                  <AnimatedInput label="Phone Number" placeholder="+1..." />
                </div>
                <AnimatedInput 
                  label="Service Interest" 
                  type="select" 
                  options={['Major Collision Repair', 'Custom Paint Work', 'Paintless Dent Repair', 'Computer Diagnostics', 'Full Detailing', 'Car Shipping & Export']} 
                />
                <AnimatedInput label="Vehicle & Requirements" type="textarea" placeholder="Tell us about the project..." />
                <button className="w-full py-8 bg-gold text-rich-black font-black uppercase text-xs tracking-[0.4em] hover:bg-white hover:scale-[1.02] transition-all duration-700 mt-6 shadow-2xl active:scale-95">Get My Free Estimate</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/10 bg-black">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
              <div className="space-y-4">
                 <div className="text-3xl font-display font-black text-gold tracking-tighter">DAMIZ</div>
                 <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.4em] max-w-sm">Over a decade of experience in quality auto body and collision repair.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-10">
                {['Terms', 'Privacy', 'Services', 'Gallery', 'About', 'Contact'].map(l => (
                  <a key={l} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 hover:text-gold transition-all duration-500">{l}</a>
                ))}
              </div>
           </div>
           
           <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-[9px] font-black tracking-[1em] text-white/60 uppercase">
                &copy; {new Date().getFullYear()} Damiz Auto Care Specialists
              </div>
              <div className="flex gap-6">
                 <a href="#" className="w-10 h-10 border border-white/5 flex items-center justify-center rounded-full hover:border-gold hover:text-gold transition-all duration-500"><Phone size={16} /></a>
                 <a href="#" className="w-10 h-10 border border-white/5 flex items-center justify-center rounded-full hover:border-gold hover:text-gold transition-all duration-500"><Mail size={16} /></a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
}
