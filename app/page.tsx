'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
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
  ArrowRight,
  Facebook,
  Instagram
} from 'lucide-react';

import { CountUp } from '@/components/CountUp';
import { TiltGalleryItem } from '@/components/TiltGalleryItem';
import { Preloader } from '@/components/Preloader';
import { Navbar } from '@/components/Navbar';
import { WhatsAppButton } from '@/components/WhatsAppButton';

// --- Page Main ---

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const aboutImageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionTitleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // Reveal animations for section titles
    sectionTitleRefs.current.forEach((title) => {
      if (title) {
        gsap.fromTo(title, 
          { opacity: 0, y: 100, skewY: 5 },
          {
            opacity: 1, 
            y: 0, 
            skewY: 0, 
            duration: 1.5, 
            ease: "power4.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });

    // Parallax for About image
    if (aboutImageRef.current) {
      gsap.to(aboutImageRef.current.querySelector('img'), {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: aboutImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Hero parallax background
    gsap.to(".hero-bg", {
      y: 200,
      ease: "none",
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoading]);

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
      <WhatsAppButton />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="hero-bg absolute inset-0 -top-20">
             <Image 
               src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2000&auto=format&fit=crop" 
               alt="Professional Auto Body Workshop Background" 
               fill 
               className="object-cover opacity-30 grayscale scale-110"
               priority
             />
           </div>
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
              COLUMBUS <br />
              <span className="text-gold">PRO AUTO BODY</span>
            </motion.h1>

            <motion.p variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="text-lg text-white/80 mb-12 max-w-xl font-medium leading-relaxed uppercase tracking-wider">
              We provide honest collision repair, professional paint work, and full computer diagnostics right here in Columbus.
            </motion.p>

            <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="flex flex-wrap gap-5">
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="group px-12 py-6 bg-gold text-rich-black font-black uppercase text-[11px] tracking-[0.2em] flex items-center gap-3 hover:bg-white transition-all shadow-2xl"
              >
                Contact Us
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
            <h2 
              ref={(el) => { sectionTitleRefs.current[0] = el }}
              className="text-5xl md:text-8xl font-display font-black tracking-tighter leading-none italic text-white"
            >
              OUR SERVICES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: Car, title: 'Collision Repair', img: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2000&auto=format&fit=crop', desc: 'From major accidents to fender benders, we restore your car frame and body to safety standards.' },
              { icon: PaintRoller, title: 'Factory-Grade Paint', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop', desc: 'Using computerized color matching to get that standard factory finish back on your vehicle.' },
              { icon: Wrench, title: 'Paintless Dent Removal', img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2000&auto=format&fit=crop', desc: 'We fix dings and dents without needing a full repaint, saving you time and protecting your car original paint.' },
              { icon: Stethoscope, title: 'Advanced Diagnostics', img: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=2000&auto=format&fit=crop', desc: 'We use the latest scans to find engine, electrical, and sensor issues quickly and accurately.' },
              { icon: Ship, title: 'Car Export Services', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop', desc: 'Shipping your car out of state or overseas? We handle the logistics and all the paperwork for you.' },
              { icon: Sparkle, title: 'Full Detailing', img: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2000&auto=format&fit=crop', desc: 'Deep interior cleaning, paint polishing, and ceramic coatings to keep your ride looking sharp.' },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial="initial"
                whileHover="hover"
                variants={{
                  initial: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.8 } },
                  hover: { y: -15 }
                }}
                whileInView="visible"
                viewport={{ once: true }}
                className="group bg-charcoal/50 border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-gold/20 hover:shadow-[0_20px_60px_rgba(196,167,71,0.1)]"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image src={s.img} alt={s.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-transform duration-[1.5s] group-hover:scale-125" />
                  <div className="absolute inset-0 bg-rich-black/50 group-hover:bg-transparent transition-all duration-700" />
                  <motion.div 
                    variants={{
                      initial: { y: 0, x: 0 },
                      hover: { y: -15, x: 8, rotate: -5 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute bottom-6 left-6 w-14 h-14 bg-gold flex items-center justify-center rounded-2xl text-rich-black shadow-2xl z-10"
                  >
                    <s.icon size={26} />
                  </motion.div>
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
               <h2 
                ref={(el) => { sectionTitleRefs.current[1] = el }}
                className="text-5xl md:text-8xl font-display font-black tracking-tighter italic text-white leading-none"
               >
                 RECENT WORK.
               </h2>
             </div>
             <p className="text-white/60 text-[10px] font-black tracking-[0.5em] uppercase border-l border-white/10 pl-8">Quality you can see for yourself</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             <TiltGalleryItem 
               src="https://i.supaimg.com/132f2ac7-48b1-4d17-a8ab-6da547b28299/1e9d9fa9-c92d-48e9-ba1f-25858d3b826a.jpg" 
               alt="Toyota Body Repair" 
               title="Toyota Camry Repair" 
               subtitle="Full Front-End Restoration" 
               delay={0.1} 
             />
             <TiltGalleryItem 
               src="https://i.supaimg.com/132f2ac7-48b1-4d17-a8ab-6da547b28299/933f5aa4-d4c1-4bc3-9d39-a5c6c6d9221f.jpg" 
               alt="Lexus Paint Refinish" 
               title="Lexus ES350 Paint" 
               subtitle="Quarter Panel & Door Blend" 
               delay={0.2} 
             />
             <TiltGalleryItem 
               src="https://i.supaimg.com/132f2ac7-48b1-4d17-a8ab-6da547b28299/57862d7b-34fb-4312-85e0-3dc0316fcb9c.jpg" 
               alt="Lexus GX Repair" 
               title="Lexus GX460 Body" 
               subtitle="Major Collision Repair" 
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
              OVER A DECADE <br /> OF <span className="text-white/30">RELIABILITY.</span>
            </h2>
            <div className="space-y-8 text-white/70 text-[11px] font-black tracking-[0.2em] leading-relaxed uppercase max-w-lg">
              <p>With over ten years on the job, Damiz Auto Care is your home for complete body work and mechanical repair in Columbus. Whether you drive a Toyota, Lexus, or a luxury import, we treat every car like it belongs to our own family.</p>
              <p>We handle everything from major collision repairs to minor dings and shipping logistics. You get honest talk and top-tier workmanship, every single time.</p>
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
            ref={aboutImageRef}
            className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_0_100px_rgba(196,167,71,0.05)]"
          >
             <Image 
               src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000&auto=format&fit=crop" 
               alt="Expert At Work" 
               fill 
               className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s] scale-110" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 via-transparent to-transparent" />
             <div className="absolute bottom-12 left-12 right-12 p-8 glass rounded-3xl border border-white/10 z-10">
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
          <span>QUALITY REPAIRS</span>
          <span>COLUMBUS OHIO</span>
          <span>DAMIZ AUTO CARE</span>
          <span>QUALITY REPAIRS</span>
          <span>COLUMBUS OHIO</span>
        </motion.div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 text-center px-6">
           <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter text-rich-black leading-none uppercase italic">WE FIX CARS THE RIGHT WAY.</h2>
           <a 
             href="tel:+13802237472" 
             className="px-16 py-7 bg-rich-black text-gold font-black uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-rich-black transition-all duration-700 shadow-3xl"
           >
             Call For An Estimate
           </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
             <h2 
              ref={(el) => { sectionTitleRefs.current[2] = el }}
              className="text-5xl md:text-8xl font-display font-black tracking-tighter mb-16 italic text-white uppercase text-center md:text-left"
             >
                GET IN TOUCH <br /> <span className="text-gold">FOR AN ESTIMATE.</span>
             </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 font-black uppercase text-[11px] tracking-[0.3em]">
                <div className="flex gap-6 items-center group cursor-pointer border border-white/5 p-8 rounded-3xl bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                  <div className="w-14 h-14 glass flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-rich-black transition-all duration-700 rounded-2xl shrink-0"><MapPin size={22} /></div>
                  <div><div className="text-white/40 mb-1">HQ Workshop</div><div className="text-white text-sm">Ohio, United States</div></div>
                </div>
                <div className="flex gap-6 items-center group cursor-pointer border border-white/5 p-8 rounded-3xl bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                  <div className="w-14 h-14 glass flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-rich-black transition-all duration-700 rounded-2xl shrink-0"><Phone size={22} /></div>
                  <div><div className="text-white/40 mb-1">Direct Line</div><div className="text-white text-sm">(380) 223-7472</div></div>
                </div>
                <div className="flex gap-6 items-center group cursor-pointer border border-white/5 p-8 rounded-3xl bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                  <div className="w-14 h-14 glass flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-rich-black transition-all duration-700 rounded-2xl shrink-0"><MessageCircle size={22} /></div>
                  <div><div className="text-white/40 mb-1">WhatsApp</div><a href="https://wa.me/13802237472" target="_blank" className="text-gold text-sm underline decoration-gold/20 hover:decoration-gold transition-all italic">Launch Chat</a></div>
                </div>
             </div>
             
             <div className="flex justify-center gap-12 pt-16 mt-16 border-t border-white/5 uppercase font-black text-[11px] tracking-[0.4em]">
                <a href="https://www.facebook.com/olaniyi.awe.125" target="_blank" className="text-white/40 hover:text-gold transition-colors flex items-center gap-2 underline decoration-white/5 hover:decoration-gold">Facebook</a>
                <a href="https://www.instagram.com/damiz68" target="_blank" className="text-white/40 hover:text-gold transition-colors flex items-center gap-2 underline decoration-white/5 hover:decoration-gold">Instagram</a>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/10 bg-black">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
              <div className="space-y-4">
                 <div className="text-3xl font-display font-black text-gold tracking-tighter">DAMIZ</div>
                 <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.4em] max-w-sm">Local experts in Columbus, Ohio specializing in high-quality body work and collision repair since 2014.</p>
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
              <div className="flex gap-4">
                 <a href="https://www.facebook.com/olaniyi.awe.125" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/5 flex items-center justify-center rounded-full hover:border-gold hover:text-gold transition-all duration-500"><Facebook size={16} /></a>
                 <a href="https://www.instagram.com/damiz68" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/5 flex items-center justify-center rounded-full hover:border-gold hover:text-gold transition-all duration-500"><Instagram size={16} /></a>
                 <a href="https://wa.me/13802237472" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/5 flex items-center justify-center rounded-full hover:border-[#25D366] hover:text-[#25D366] transition-all duration-500"><MessageCircle size={16} /></a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
}
