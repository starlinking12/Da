'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { 
  Car, 
  PaintRoller, 
  Wrench, 
  ShieldCheck, 
  Stethoscope, 
  Ship, 
  Sparkle, 
  Droplet,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  X,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

// --- Components ---

const Preloader = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="fixed inset-0 z-[9999] bg-rich-black flex items-center justify-center"
  >
    <div className="text-center">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-4"
      >
        <span className="text-4xl font-display font-black tracking-tighter text-gold">DAMIZ</span>
      </motion.div>
      <motion.div 
        className="w-48 h-[2px] bg-white/10 relative overflow-hidden"
      >
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gold w-full"
        />
      </motion.div>
    </div>
  </motion.div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-rich-black/80 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex flex-col group">
          <span className="text-2xl font-display font-black tracking-tighter text-gold group-hover:text-white transition-colors">DAMIZ</span>
          <span className="text-[10px] tracking-[0.3em] font-medium text-white/50 group-hover:text-gold transition-colors uppercase">Auto Care</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {['home', 'services', 'gallery', 'about', 'contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item}`} 
              className="text-sm font-medium text-white/70 hover:text-gold transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-6 py-2.5 bg-gold text-rich-black font-bold text-sm uppercase tracking-tighter hover:bg-white hover:scale-105 transition-all active:scale-95 shadow-[0_0_20px_rgba(196,167,71,0.3)]"
          >
            Book Appointment
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-rich-black flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['home', 'services', 'gallery', 'about', 'contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                onClick={() => setIsOpen(false)}
                className="text-2xl font-display font-bold text-white hover:text-gold transition-colors uppercase"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ServiceCard = ({ icon: Icon, title, desc, delay, image }: { icon: any, title: string, desc: string, delay: number, image: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ y: -10 }}
    className="group rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-gold/30 transition-all duration-500 overflow-hidden flex flex-col h-full"
  >
    {/* Image Header */}
    <div className="relative h-56 w-full overflow-hidden">
      <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-1000 group-hover:scale-110" 
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 to-transparent" />
      <div className="absolute bottom-4 left-6 w-12 h-12 rounded-xl bg-gold text-rich-black flex items-center justify-center shadow-2xl">
        <Icon size={24} strokeWidth={2} />
      </div>
    </div>

    {/* Content */}
    <div className="p-8 flex-grow flex flex-col">
      <h3 className="text-xl font-display font-bold mb-3 text-white group-hover:text-gold transition-colors">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed mb-6">{desc}</p>
      <div className="mt-auto pt-4 border-t border-white/5">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold opacity-0 group-hover:opacity-100 transition-opacity">Expert Level Service</span>
      </div>
    </div>
  </motion.div>
);

const GalleryItem = ({ src, alt, title, subtitle, delay }: { src: string, alt: string, title: string, subtitle: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    whileHover="hover"
    className="relative aspect-video group overflow-hidden rounded-2xl cursor-pointer"
  >
    <motion.div 
      variants={{
        hover: { scale: 1.05 }
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute inset-0"
    >
      <Image 
        src={src} 
        alt={alt} 
        fill 
        className="object-cover" 
        referrerPolicy="no-referrer"
      />
    </motion.div>

    <motion.div 
      variants={{
        hover: { opacity: 1 }
      }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-transparent flex flex-col justify-end p-8"
    >
      <motion.h4 
        variants={{
          hover: { y: 0, opacity: 1 }
        }}
        initial={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-gold font-display font-bold text-lg"
      >
        {title}
      </motion.h4>
      <motion.p 
        variants={{
          hover: { y: 0, opacity: 1 }
        }}
        initial={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="text-white/70 text-sm"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  </motion.div>
);

// --- Main Page ---

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>

      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-[110vh] flex items-center overflow-hidden">
        {/* Background Noise/Texture */}
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#C4A747 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-rich-black" />
        
        {/* Animated Background Circles */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-gold/5 blur-[150px]" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-white/5 blur-[150px]" 
        />

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-12 h-[2px] bg-gold" />
              <span className="text-gold tracking-[0.4em] text-xs font-bold uppercase">Engineering Excellence • Ohio</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-8"
            >
              TOYOTA • LEXUS <br />
              <span className="text-gold italic">MASTER CARE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl font-medium leading-relaxed"
            >
              Exquisite body repair, precision painting, and advanced diagnostics for discerning car owners. Specialized in Japanse luxury and performance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a 
                href="#contact" 
                className="group px-10 py-5 bg-gold text-rich-black font-black uppercase text-sm tracking-tighter flex items-center gap-3 hover:bg-white transition-all shadow-[0_20px_50px_rgba(196,167,71,0.3)]"
              >
                Book Inspection
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#services" 
                className="px-10 py-5 border border-white/20 text-white font-bold uppercase text-sm tracking-tighter hover:bg-white hover:text-rich-black transition-all"
              >
                Browse Services
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
          <div className="w-[1px] h-10 bg-white" />
        </motion.div>
      </section>

      {/* Numbers Section */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Cars Restored', val: '850+' },
              { label: 'Paint Colors', val: '1.2k' },
              { label: 'Expert Hours', val: '10k' },
              { label: 'Global Exports', val: '24' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-black text-gold mb-2">{stat.val}</div>
                <div className="text-xs uppercase tracking-widest text-white/40 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-gold font-bold uppercase tracking-[0.4em] text-xs mb-4 block">Our Expertise</span>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-none">
                COMPLETE AUTO <br />
                <span className="text-white/20">RESTORATION.</span>
              </h2>
            </div>
            <p className="text-white/50 max-w-sm text-sm font-medium leading-relaxed">
              From mirror-finish repainting to paintless dent removal, our workshop is equipped with the latest automotive technology to ensure your vehicle returns to factory standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard 
              icon={Car} 
              title="Auto Body & Collision" 
              desc="Structural repair and panel replacement using precision frame alignment technology." 
              delay={0.1}
              image="https://images.unsplash.com/photo-1486001976380-703aed69ed7a?q=80&w=2000&auto=format&fit=crop"
            />
            <ServiceCard 
              icon={PaintRoller} 
              title="Paint & Respray" 
              desc="Computerized color matching and premium clear coats for a flawless factory-correct finish." 
              delay={0.2}
              image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop"
            />
            <ServiceCard 
              icon={Wrench} 
              title="Dent Correction" 
              desc="Specialized paintless dent repair (PDR) that preserves your original paint finish." 
              delay={0.3}
              image="https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2000&auto=format&fit=crop"
            />
            <ServiceCard 
              icon={Stethoscope} 
              title="Full Diagnostics" 
              desc="Deep system scans and engine health check for Toyota, Lexus, and all major brands." 
              delay={0.4}
              image="https://images.unsplash.com/photo-1615906655593-ad0313b52adb?q=80&w=2000&auto=format&fit=crop"
            />
            <ServiceCard 
              icon={Ship} 
              title="Global Export" 
              desc="Logistics and sales support for shipping high-end vehicles across North America and overseas." 
              delay={0.5}
              image="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop"
            />
            <ServiceCard 
              icon={Sparkle} 
              title="Elite Detailing" 
              desc="Multi-stage paint correction, ceramic coating protection, and deep interior sterilization." 
              delay={0.6}
              image="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2000&auto=format&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-4">THE SHOWCASE</h2>
            <p className="text-gold tracking-[0.3em] text-xs font-bold uppercase italic">Quality that speaks for itself</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GalleryItem 
              src="https://i.supaimg.com/132f2ac7-48b1-4d17-a8ab-6da547b28299/1e9d9fa9-c92d-48e9-ba1f-25858d3b826a.jpg"
              alt="Toyota Service"
              title="Toyota Prado"
              subtitle="Full Restoration"
              delay={0.1}
            />
            <GalleryItem 
              src="https://i.supaimg.com/132f2ac7-48b1-4d17-a8ab-6da547b28299/933f5aa4-d4c1-4bc3-9d39-a5c6c6d9221f.jpg"
              alt="Lexus Premium Care"
              title="Lexus RX 350"
              subtitle="Mirror Paint Work"
              delay={0.2}
            />
            <GalleryItem 
              src="https://i.supaimg.com/132f2ac7-48b1-4d17-a8ab-6da547b28299/57862d7b-34fb-4312-85e0-3dc0316fcb9c.jpg"
              alt="Lexus Body Work"
              title="Lexus GX Luxury"
              subtitle="Collision Repair"
              delay={0.3}
            />
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <GalleryItem 
              src="https://i.supaimg.com/132f2ac7-48b1-4d17-a8ab-6da547b28299/1e37db9e-1c0c-4210-89d9-1b430e8ca23c.jpg"
              alt="Camry Detail"
              title="Toyota Camry"
              subtitle="Detailing & Wax"
              delay={0.4}
            />
            <motion.div 
              whileHover={{ scale: 1.02, borderColor: 'rgba(196, 167, 71, 0.5)' }}
              className="relative group overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-12 flex flex-col justify-center transition-colors duration-500"
            >
              <h3 className="text-3xl font-display font-black text-white mb-6">See the transformation?</h3>
              <p className="text-white/50 mb-8 max-w-sm">Every project we take on is handled with absolute precision. Join our family of satisfied enthusiasts.</p>
              <a href="#contact" className="group text-gold font-bold flex items-center gap-2">
                Get a Quote <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-32 relative overflow-hidden bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gold font-bold uppercase tracking-[0.4em] text-xs mb-6 block">The Legacy</span>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-8 italic text-white">
                A DECADE OF <br />
                <span className="text-white/20">PRECISION.</span>
              </h2>
              <div className="space-y-6 text-white/60 leading-relaxed font-medium">
                <p>
                  With over a decade of experience, Damiz Auto Care provides complete auto repair and body work for all makes and models. We specialize in Toyota, Lexus, Honda, and Nissan, but service all vehicles with the same precision and care.
                </p>
                <p>
                  From minor scratch repair to major collision work, painting, diagnostics, and even vehicle export - we do it all. Every car gets the royal treatment in our state-of-the-art facility.
                </p>
              </div>

              {/* Brand Grid */}
              <div className="mt-12 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
                {['TOYOTA', 'LEXUS', 'HONDA', 'NISSAN'].map((brand) => (
                  <div key={brand} className="text-center">
                    <span className="text-[10px] font-black tracking-[0.4em] text-white/30 hover:text-gold transition-colors block">{brand}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden group"
            >
              <Image 
                src="https://images.unsplash.com/photo-1530046339160-ce3e5b0c7a2f?q=80&w=2000&auto=format&fit=crop" 
                alt="Expert Mechanics" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 p-8 glass rounded-2xl">
                <div className="flex items-center gap-6">
                  <div className="text-4xl font-display font-black text-gold">10+</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 leading-tight">
                    Years of <br /> Excellence
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gold relative overflow-hidden">
        <motion.div 
          animate={{ x: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-10 flex items-center whitespace-nowrap text-[15vh] md:text-[20vh] font-display font-black italic pointer-events-none text-rich-black"
        >
          DAMIZ AUTO CARE • TOYOTA • LEXUS • HONDA • NISSAN • 
        </motion.div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-rich-black leading-none mb-4">
                NEED AUTO BODY <br /> REPAIR?
              </h2>
              <p className="text-rich-black/60 font-bold uppercase text-xs tracking-widest italic">Dents • Scratches • Paint • Collision • We fix it all</p>
            </div>
            <a 
              href="#contact" 
              className="px-12 py-6 bg-rich-black text-gold font-black uppercase text-sm tracking-tighter hover:bg-white hover:text-rich-black transition-all shadow-2xl"
            >
              Get Free Estimate
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-5xl font-display font-black tracking-tighter mb-8 italic">READY FOR THE <br /> <span className="text-gold overflow-hidden">GOLD TREATMENT?</span></h2>
              
              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 glass flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-rich-black transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-1">Our Workshop</h4>
                    <p className="text-white font-bold group-hover:text-gold transition-colors">Ohio, United States</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 glass flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-rich-black transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-1">Direct Line</h4>
                    <p className="text-white font-bold group-hover:text-gold transition-colors">(380) 223-7472</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 glass flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-rich-black transition-all">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-1">WhatsApp Chat</h4>
                    <a href="https://wa.me/13802237472" target="_blank" className="text-gold font-black uppercase text-xs tracking-[0.2em] flex items-center gap-1 hover:underline">
                      Chat Now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-10 glass rounded-3xl relative overflow-hidden"
            >
              <div className="relative z-10 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-1">Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-gold transition-all text-white font-medium" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-1">Phone</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-gold transition-all text-white font-medium" placeholder="+1..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-1">Service Type</label>
                  <select className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-gold transition-all text-white/50 font-medium">
                    <option>Body Repair & Collision</option>
                    <option>Custom Paint Work</option>
                    <option>General Maintenance</option>
                    <option>Vehicle Inspection</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-1">Description</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-gold transition-all text-white font-medium resize-none" placeholder="Tell us about your vehicle..." />
                </div>
                <button className="w-full py-5 bg-gold text-rich-black font-black uppercase text-sm tracking-tighter hover:bg-white transition-all shadow-[0_20px_40px_rgba(196,167,71,0.2)]">
                  Submit Request
                </button>
              </div>
              
              {/* Decorative light */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-rich-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div>
              <a href="#" className="flex flex-col mb-6">
                <span className="text-3xl font-display font-black tracking-tighter text-gold">DAMIZ</span>
                <span className="text-xs tracking-[0.4em] font-medium text-white/50 uppercase">Auto Care Specialists</span>
              </a>
              <p className="text-white/30 text-xs font-bold uppercase tracking-widest max-w-xs">
                Excellence in automotive craftmanship. Ohio established, globally recognized.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-10">
              {['Home', 'Services', 'Gallery', 'About', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-gold transition-colors">{link}</a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 glass flex items-center justify-center hover:bg-gold hover:text-rich-black transition-all rounded-full"><Phone size={18} /></a>
              <a href="#" className="w-10 h-10 glass flex items-center justify-center hover:bg-gold hover:text-rich-black transition-all rounded-full"><Mail size={18} /></a>
            </div>
          </div>
          
          <div className="mt-20 pt-10 border-t border-white/5 text-center text-[10px] text-white/20 uppercase font-black tracking-[0.5em]">
            &copy; {new Date().getFullYear()} Damiz Auto Care • All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
