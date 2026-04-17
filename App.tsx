
import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Star, 
  ShieldCheck, 
  Zap, 
  Calendar, 
  BookOpen, 
  Award, 
  Gamepad2, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  Printer,
  Users,
  Smartphone,
  Heart,
  ChevronRight,
  Menu,
  X,
  Lock,
  Check,
  Gift,
  Book,
  Infinity,
  ArrowRight,
  Hourglass,
  Beaker,
  ClipboardList,
  Image,
  MonitorOff,
  Brain,
  Smile,
  AlertTriangle,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Testimonial, FAQItem, Bonus, Plan } from './types';

// ScrollReveal Component
const Reveal: React.FC<{ 
  children?: React.ReactNode, 
  className?: string, 
  variant?: "up" | "down" | "left" | "right" | "scale" | "rotate",
  delay?: number,
  threshold?: number,
  style?: React.CSSProperties
}> = React.memo(({ 
  children, 
  className = "", 
  variant = "up", 
  delay = 0,
  threshold = 0.05,
  style = {}
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const variantClass = `reveal-${variant}`;

  return (
    <div
      ref={domRef}
      className={`reveal ${variantClass} ${isVisible ? 'active' : ''} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
});

Reveal.displayName = 'Reveal';

// Global scroll handler for CTAs
const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const href = e.currentTarget.getAttribute('href');
  if (href?.startsWith('#')) {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

// Helper to append UTM parameters to checkout URLs
const getCheckoutUrl = (baseUrl: string) => {
  if (typeof window !== 'undefined') {
    const searchParams = window.location.search;
    if (searchParams) {
      const separator = baseUrl.includes('?') ? '&' : '?';
      return `${baseUrl}${separator}${searchParams.substring(1)}`;
    }
  }
  return baseUrl;
};

// Components
const UpsellModal = React.memo(({ isOpen, onClose, onAccept, onDecline }: { 
  isOpen: boolean, 
  onClose: () => void, 
  onAccept: () => void, 
  onDecline: () => void 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white w-full max-w-md rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 relative shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full font-bold text-xs flex items-center gap-2 mb-6 uppercase tracking-wider">
                <Star className="w-3 h-3 fill-yellow-700" /> Oportunidade Única
              </div>

              <h3 className="text-3xl font-black text-slate-800 text-center leading-tight mb-4 tracking-tighter">
                Leve o <span className="text-sky-500">Dobro de Conteúdo</span>
              </h3>

              <p className="text-slate-600 text-center mb-8 px-4">
                Por apenas <span className="font-bold text-slate-800">R$ 5,00 a mais</span>, você migra para o Plano Completo e garante:
              </p>

              <div className="w-full bg-slate-50 rounded-3xl p-6 mb-8 space-y-4">
                <div className="flex gap-3 items-center">
                  <Check className="w-5 h-5 text-sky-500 shrink-0" />
                  <span className="text-slate-700 font-bold text-sm">+100 Experimentos</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Check className="w-5 h-5 text-sky-500 shrink-0" />
                  <span className="text-slate-700 font-bold text-sm">5 Bônus Exclusivos inclusos</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Check className="w-5 h-5 text-sky-500 shrink-0" />
                  <span className="text-slate-700 font-bold text-sm">Acesso Vitalício e Atualizações</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Check className="w-5 h-5 text-sky-500 shrink-0" />
                  <span className="text-slate-700 font-bold text-sm">Garantia de 30 Dias</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-slate-400 font-bold text-lg line-through">de R$ 27,00</span>
                <span className="text-sky-500 text-4xl font-black tracking-tighter">R$ 14,90</span>
              </div>

              <button 
                onClick={onAccept}
                className="w-full py-3.5 bg-sky-500 hover:bg-sky-600 text-white rounded-full font-black text-lg shadow-lg transition-all transform active:scale-95 uppercase tracking-tight mb-4"
              >
                Quero o Pacote Completo
              </button>

              <button 
                onClick={onDecline}
                className="text-slate-400 font-medium underline underline-offset-4 hover:text-slate-600 transition-colors text-sm"
              >
                Não obrigado, vou ficar apenas com o básico
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

UpsellModal.displayName = 'UpsellModal';

const Navbar = React.memo(() => {
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    setDateStr(`${day}/${month}/${year}`);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-sky-600 to-sky-500 text-white py-3 sm:py-4 text-center text-sm sm:text-lg font-black relative z-50 shadow-md flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-6 tracking-tight sm:tracking-normal uppercase animate-shimmer">
      <AlertTriangle className="w-4 h-4 sm:w-6 sm:h-6 fill-yellow-400 text-black shrink-0" />
      <span className="whitespace-nowrap">
        OFERTA VÁLIDA SOMENTE HOJE, {dateStr || '15/04/2026'}
      </span>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

const WistiaPlayer = ({ mediaId, aspect = '1.7777777777777777', paddingTop = '56.25%' }: { mediaId: string, aspect?: string, paddingTop?: string }) => {
  const [loadVideo, setLoadVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoadVideo(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: '200px' });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!loadVideo) return;

    const script1 = document.createElement('script');
    script1.src = 'https://fast.wistia.com/player.js';
    script1.async = true;
    script1.setAttribute('fetchpriority', 'low');
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = `https://fast.wistia.com/embed/${mediaId}.js`;
    script2.async = true;
    script2.type = 'module';
    script2.setAttribute('fetchpriority', 'low');
    document.body.appendChild(script2);
  }, [loadVideo, mediaId]);

  return (
    <div ref={containerRef} className="w-full relative rounded-2xl overflow-hidden shadow-2xl z-10 border-4 border-slate-200">
      <style dangerouslySetInnerHTML={{
        __html: `
          wistia-player[media-id='${mediaId}']:not(:defined) { 
            background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch'); 
            display: block; 
            filter: blur(5px); 
            padding-top:${paddingTop}; 
          }
        `
      }} />
      {loadVideo ? React.createElement('wistia-player', { 'media-id': mediaId, aspect: aspect }) : (
        <div 
          className="w-full cursor-pointer group"
          style={{ paddingTop }}
          onClick={() => setLoadVideo(true)}
        >
          <img 
            src={`https://fast.wistia.com/embed/medias/${mediaId}/swatch`}
            alt="Video preview"
            className="absolute inset-0 w-full h-full object-cover blur-sm group-hover:blur-none transition-all duration-500"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-sky-600/90 rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 fill-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SocialProof = React.memo(() => {
  const [visible, setVisible] = useState(false);
  const [currentName, setCurrentName] = useState('');
  
  const names = [
    'Patricia', 'Mariana', 'Juliana', 'Carla', 'Ana Paula', 
    'Fernanda', 'Débora', 'Camila', 'Renata', 'Tia Rosa', 
    'Professora Lucia', 'Jessica', 'Tatiana', 'Vanessa', 'Adriana'
  ];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isMounted = true;
    let lastIndex = -1;

    const showNotification = () => {
      if (!isMounted) return;
      
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * names.length);
      } while (nextIndex === lastIndex);
      
      lastIndex = nextIndex;
      setCurrentName(names[nextIndex]);
      setVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        if (isMounted) setVisible(false);
      }, 5000);

      // Schedule next notification (15-25 seconds)
      const nextDelay = Math.floor(Math.random() * (25000 - 15000 + 1) + 15000);
      timeoutId = setTimeout(showNotification, nextDelay);
    };

    // Initial delay of 10 seconds to prioritize main content
    timeoutId = setTimeout(showNotification, 10000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-4 left-4 z-50 transition-all duration-500 transform ${
        visible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
    >
      <div className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-4 border-2 border-sky-600 max-w-[300px]">
        <div className="bg-sky-50 rounded-full p-1.5 shrink-0">
          <CheckCircle2 className="w-5 h-5 text-sky-600" />
        </div>
        <div className="flex flex-col">
          <span className="text-slate-800 font-bold text-sm leading-tight">
            {currentName} comprou agora...
          </span>
        </div>
      </div>
    </div>
  );
});

SocialProof.displayName = 'SocialProof';

const TrustBadge = React.memo(() => (
  <div className="mt-6 flex flex-col items-center bg-white/60 backdrop-blur-sm border-2 border-sky-400/30 rounded-[2rem] p-4 px-6 shadow-[0_0_20px_rgba(14,165,233,0.3)] max-w-[300px] w-full">
    <div className="flex -space-x-2.5 mb-3">
      {[
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
      ].map((url, i) => (
        <img 
          key={i}
          src={url} 
          alt="User" 
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
    <h4 className="text-slate-800 font-black text-base mb-1 tracking-tight text-center leading-tight">
      Mais de 1.300 pessoas já garantiram
    </h4>
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <span className="text-slate-500 font-medium text-xs">4,8/5 avaliações</span>
    </div>
  </div>
));

const Hero = React.memo(() => (
  <header id="hero" data-section="hero" className="relative bg-white pt-6 pb-12 px-4 overflow-hidden">
    {/* Decorative background elements to simulate the illustration */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-10 w-80 h-80 bg-yellow-100/50 rounded-full blur-3xl"></div>
    </div>
    
    <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10 space-y-4">
      
      <Reveal delay={200}>
        <h1 className="text-3xl md:text-5xl lg:text-[54px] font-black text-black leading-[1.15] max-w-4xl mx-auto tracking-tighter">
          <span className="text-sky-600">+100 Experimentos Científicos</span> para Tirar Seu Filho das <span className="text-sky-600">Telas</span>
        </h1>
      </Reveal>

      <Reveal delay={300}>
        <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto font-medium">
          Com passo a passo simples, materiais que você já tem em casa e resultados surpreendentes
        </p>
      </Reveal>
      
      <Reveal variant="scale" delay={400} className="w-full max-w-4xl relative mt-4">
        <div className="relative flex justify-center">
          <div className="w-full max-w-[280px] md:max-w-[320px] mx-auto">
            <WistiaPlayer mediaId="n15ll216yn" aspect="0.5625" paddingTop="177.78%" />
          </div>
        </div>
      </Reveal>

      <div className="w-full pt-10">
        <Reveal delay={600} variant="slide-up">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            
            <div className="flex flex-col items-center w-full">
              {/* CTA Button */}
              <a 
                href="#basic-plan" 
                onClick={handleCTAClick}
                data-track="cta-click"
                data-location="hero"
                role="button"
                tabIndex={1}
                aria-label="QUERO OS 100 EXPERIMENTOS AGORA"
                className="px-6 md:px-10 py-3 md:py-4 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white rounded-full text-base md:text-lg font-bold border border-white/30 transition-all text-center uppercase tracking-wide w-full md:w-auto animate-pulse-button shadow-xl shadow-sky-100"
              >
                QUERO OS 100 EXPERIMENTOS AGORA
              </a>
              
              <TrustBadge />
            </div>

          </div>
        </Reveal>
      </div>
    </div>
  </header>
));

Hero.displayName = 'Hero';

const WhatYouGet = React.memo(() => {
  const items = [
    {
      icon: <Beaker className="w-6 h-6 text-white" />,
      title: "+100 Experimentos Científicos Prontos",
      description: "Atividades testadas e organizadas para você aplicar sem precisar pensar no que fazer"
    },
    {
      icon: <BookOpen className="w-6 h-6 text-white" />,
      title: "Passo a Passo Simples e Ilustrado",
      description: "Explicações fáceis de seguir, com imagens que tornam tudo ainda mais prático"
    },
    {
      icon: <ClipboardList className="w-6 h-6 text-white" />,
      title: "Lista de Materiais para Cada Experimento",
      description: "Você sabe exatamente o que usar — com itens simples que já tem em casa"
    },
    {
      icon: <Infinity className="w-6 h-6 text-white" />,
      title: "Acesso Vitalício ao Conteúdo",
      description: "Compre uma vez e use sempre que quiser, sem mensalidades"
    },
    {
      icon: <Gift className="w-6 h-6 text-white" />,
      title: "+5 Bônus Exclusivos",
      description: "Materiais extras para ampliar ainda mais a diversão e o aprendizado"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      title: "Garantia Incondicional de 30 Dias",
      description: "Teste sem risco — se não gostar, devolvemos 100% do seu dinheiro"
    }
  ];

  return (
    <section id="what-you-get" data-section="what-you-get" className="py-16 px-4 bg-gradient-to-br from-[#E6F4F1] via-white to-[#E6F4F1] relative overflow-hidden">
      {/* Decorative side elements (simulating the image cutouts) */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-sky-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-sky-100 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tighter uppercase">
            O QUE VOCÊ VAI RECEBER
          </h2>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, index) => (
            <Reveal key={index} delay={index * 100} variant="up">
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 flex items-start gap-4 border border-white/50 h-full">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 shrink-0 flex items-center justify-center shadow-lg shadow-sky-200">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-black text-black mb-1 leading-tight tracking-tighter">{item.title}</h3>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        
        <Reveal delay={300} variant="up" className="mt-16 flex justify-center">
          <a 
            href="#basic-plan" 
            onClick={handleCTAClick}
            data-track="cta-click"
            data-location="what-you-get"
            role="button"
            aria-label="GARANTIR MATERIAL AGORA"
            className="inline-flex items-center justify-center px-6 md:px-10 py-3.5 md:py-4 rounded-full text-lg font-black bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white transition-all transform active:scale-95 uppercase tracking-widest shadow-xl shadow-sky-100 animate-pulse-soft text-center"
          >
            GARANTIR MATERIAL AGORA
          </a>
        </Reveal>
      </div>
    </section>
  );
});

WhatYouGet.displayName = 'WhatYouGet';

const Stats = React.memo(() => (
  <section id="stats" data-section="stats" className="bg-white py-12 border-y border-slate-100 overflow-hidden">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { val: "12.000+", label: "Famílias Satisfeitas" },
        { val: "+100", label: "Experimentos Prontos" },
        { val: "4.9/5", label: "Avaliação Média", star: true },
        { val: "100%", label: "Digital e Imediato" }
      ].map((stat, i) => (
        <Reveal key={i} delay={i * 150} variant="scale" className="text-center">
          <p className="text-3xl md:text-4xl font-black text-sky-600 tracking-tighter">{stat.val}</p>
          <p className="text-slate-600 font-medium text-sm flex items-center justify-center gap-1">
            {stat.label} {stat.star && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
          </p>
        </Reveal>
      ))}
    </div>
  </section>
));

Stats.displayName = 'Stats';

const IdealFor = React.memo(() => (
  <section id="ideal-for" data-section="ideal-for" className="py-16 px-4 bg-slate-50 overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <Reveal className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-black tracking-tighter">Este Kit É Ideal Para Você?</h2>
      </Reveal>
      
      <div className="grid md:grid-cols-2 gap-12">
        <Reveal variant="left" threshold={0.2} className="h-full">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-sky-100 h-full">
            <h3 className="text-xl font-black text-sky-600 mb-6 flex items-center gap-3 tracking-tighter">
              Este Kit É Para Você Se:
            </h3>
            <ul className="space-y-4">
              {[
                "Deseja despertar a curiosidade científica do seu filho de forma simples",
                "Quer realizar experimentos incríveis com materiais que você já tem em casa",
                "Não tem tempo para pesquisar atividades educativas do zero",
                "Quer reduzir o tempo de tela com conteúdo que realmente ensina",
                "Busca momentos de conexão e diversão em família"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        
        <Reveal variant="right" threshold={0.2} className="h-full">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-red-100 h-full">
            <h3 className="text-xl font-black text-red-500 mb-6 flex items-center gap-3 tracking-tighter">
              Não É Para Você Se:
            </h3>
            <ul className="space-y-4">
              {[
                "Você não valoriza o aprendizado prático e a curiosidade infantil",
                "Não possui 10 minutos por dia para realizar uma atividade com seu filho",
                "Prefere que as crianças aprendam ciência apenas na escola",
                "Não se importa com o excesso de tempo de tela",
                "Prefere deixar as crianças sem supervisão em frente aos tablets"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-slate-600 font-medium text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal variant="scale" className="flex justify-center mt-16">
        <a 
          href="#basic-plan" 
          onClick={handleCTAClick}
          data-track="cta-click"
          data-location="ideal-for"
          role="button"
          aria-label="Sim, esse kit é para mim"
          className="px-8 py-3.5 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white rounded-full text-lg font-bold shadow-xl transition-all transform hover:-translate-y-1 text-center animate-pulse-soft uppercase"
        >
          Sim, esse kit é para mim
        </a>
      </Reveal>
    </div>
  </section>
));

IdealFor.displayName = 'IdealFor';

const ProblemSection = React.memo(() => (
  <section className="py-12 px-4 bg-[#f8f8fc] relative">
    <div className="max-w-4xl mx-auto text-center">
      <Reveal variant="down">
        <h2 className="text-2xl md:text-4xl font-black text-black mb-10 uppercase tracking-tighter">
          ✨ AS TELAS ESTÃO APAGANDO A <span className="text-sky-600">CURIOSIDADE DO SEU FILHO?</span>
        </h2>
      </Reveal>
      
      <Reveal variant="scale" delay={100}>
        <div className="mb-10 flex justify-center">
          <img 
            src="https://i.postimg.cc/j2kmxL6F/kid-bored-screen-Db-R3yw-B8.png" 
            alt="Criança triste no tablet" 
            className="w-full max-w-md rounded-3xl shadow-sm"
            loading="lazy"
            decoding="async"
          />
        </div>
      </Reveal>

      <Reveal variant="up" delay={200}>
        <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto mb-10">
          Você conhece bem essa cena: <strong className="text-sky-600">olhos grudados na tela</strong>, horas passando... e, quando desligam, o "tô entediado" aparece em minutos. Você quer algo que realmente envolva, ensine e divirta — mas a maioria das opções é cara, complicada ou faz uma bagunça enorme.
        </p>
      </Reveal>

    </div>
  </section>
));

ProblemSection.displayName = 'ProblemSection';

const Bonuses = React.memo(() => {
  const bonuses: Bonus[] = [
    { 
      id: "1", 
      title: "100 Truques de Mágica para Crianças", 
      value: "R$ 27,00", 
      description: "Guia prático com mágicas simples para encantar, divertir e surpreender em casa.", 
      image: "https://i.postimg.cc/DzsPxnWr/Chat-GPT-Image-12-de-abr-de-2026-11-38-58.png" 
    },
    { 
      id: "2", 
      title: "Guia de Brincadeiras em Família", 
      value: "R$ 37,00", 
      description: "Sugestões de brincadeiras para fortalecer o vínculo e criar momentos especiais juntos.", 
      image: "https://i.postimg.cc/JhJ5pMyZ/Chat-GPT-Image-12-de-abr-de-2026-11-39-06.png" 
    },
    { 
      id: "3", 
      title: "50 Atividades Criativas (Offline)", 
      value: "R$ 27,00", 
      description: "Atividades variadas para estimular a criatividade e manter as crianças longe das telas.", 
      image: "https://i.postimg.cc/KYLD0xKn/Chat-GPT-Image-12-de-abr-de-2026-11-39-11.png" 
    },
    { 
      id: "4", 
      title: "Mini Guia: Como Despertar o Interesse das Crianças", 
      value: "R$ 19,00", 
      description: "Dicas simples para engajar seu filho e tornar o aprendizado mais divertido.", 
      image: "https://i.postimg.cc/cJYBF0Kf/Chat-GPT-Image-12-de-abr-de-2026-11-39-17.png" 
    },
    { 
      id: "5", 
      title: "Pack de Piadas e Curiosidades Científicas", 
      value: "R$ 37,00", 
      description: "Conteúdo leve e divertido para aprender rindo e despertar ainda mais interesse.", 
      image: "https://i.postimg.cc/pL3BQpdX/Chat-GPT-Image-12-de-abr-de-2026-11-39-22.png" 
    }
  ];

  return (
    <section id="bonuses" data-section="bonuses" className="py-16 px-4 bg-[#f0f9ff]/30 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-10 left-10 w-64 h-64 bg-sky-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal className="flex flex-col items-center text-center mb-12">
          <div className="inline-block bg-[#22c55e] text-white px-6 py-2 rounded-full font-black text-xs md:text-sm mb-4 shadow-lg shadow-green-100 animate-pulse-soft uppercase tracking-wider whitespace-nowrap">
            SOMENTE HOJE NO PACOTE COMPLETO
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-black leading-tight tracking-tighter flex items-center justify-center gap-2 whitespace-nowrap">
             <span className="text-yellow-500 text-3xl">🎁</span> BÔNUS EXCLUSIVOS
          </h2>
        </Reveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-16 max-w-6xl mx-auto">
          {bonuses.map((bonus, idx) => (
            <Reveal key={bonus.id} delay={idx * 150} variant="up" className="h-full">
              <div className="group relative bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col h-full border border-slate-100 overflow-hidden">
                {/* Book Image */}
                <div className="relative">
                  <img 
                    src={bonus.image} 
                    alt={bonus.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10"></div>
                </div>
                
                <div className="p-5 flex flex-col items-center text-center h-full">
                  {/* Title */}
                  <h4 className="text-base font-black text-slate-800 mb-2 leading-tight min-h-[2.5rem] flex items-center tracking-tighter">
                    {bonus.title}
                  </h4>
                  
                  {/* Value */}
                  <div className="mb-4">
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-wider mr-1">
                      VALOR:
                    </span>
                    <span className="text-red-500 font-bold text-base line-through">
                      {bonus.value}
                    </span>
                  </div>

                  {/* Gratis Button */}
                  <div className="w-full mt-auto">
                    <a 
                      href="#premium-plan"
                      onClick={handleCTAClick}
                      className="block w-full py-2.5 bg-[#22c55e] text-center text-white rounded-full font-black text-base shadow-[0_4px_0_rgb(21,128,61)] active:shadow-none active:translate-y-[4px] transition-all uppercase tracking-widest cursor-pointer"
                    >
                      GRÁTIS
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={800} variant="scale" className="text-center">
           <a 
            href="#premium-plan" 
            onClick={handleCTAClick}
            data-track="cta-click"
            data-location="bonuses"
            role="button"
            aria-label="Quero os bônus"
            className="inline-block px-8 py-3.5 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white rounded-full text-lg font-bold shadow-xl transition-all transform hover:-translate-y-1 text-center animate-pulse-soft uppercase"
           >
              Quero os bônus
           </a>
        </Reveal>
      </div>
    </section>
  );
});

Bonuses.displayName = 'Bonuses';


const Pricing = React.memo(({ onBasicClick }: { onBasicClick: (e: React.MouseEvent) => void }) => {
  return (
    <section id="plans" data-section="pricing" className="py-16 px-4 bg-white scroll-mt-20 overflow-hidden text-slate-800">
      <div className="max-w-6xl mx-auto">
        <Reveal variant="fade-up" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter">
            Temos dois Planos. <span className="text-sky-600">Escolha com Sabedoria!</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Plan Basic */}
          <Reveal delay={0} variant="scale" className="flex h-full">
            <div id="basic-plan" className="relative w-full flex flex-col bg-white rounded-[2rem] border border-slate-200 p-6 md:p-10 shadow-lg transition-all duration-300 group overflow-hidden scroll-mt-24">
              <div className="relative z-10 flex flex-col h-full items-center">
                <h3 className="text-3xl font-black text-slate-800 mb-6 tracking-tighter">Plano Básico</h3>
                
                {/* Features List */}
                <div className="w-full bg-slate-50 rounded-xl p-6 mb-8 flex flex-col items-center">
                  <span className="text-slate-600 font-bold mb-4">O que você vai receber:</span>
                  <div className="flex flex-col items-start space-y-3">
                    {[
                      "+100 Experimentos Científicos Prontos",
                      "Passo a Passo Simples e Ilustrado",
                      "Lista de Materiais para Cada Experimento"
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-center">
                        <div className="shrink-0 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-slate-800" />
                        </div>
                        <span className="text-slate-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Info */}
                <div className="w-full flex flex-col items-center mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-slate-500 font-medium text-lg line-through">De R$ 47,00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 font-medium text-sm">Por apenas</span>
                    <span className="text-slate-800 text-5xl md:text-6xl font-black tracking-tighter whitespace-nowrap">
                      R$ 9,90
                    </span>
                  </div>
                </div>
                
                {/* CTA Button */}
                <div className="mt-auto w-full max-w-md mx-auto">
                  <a 
                    href={getCheckoutUrl("https://ggcheckout.app/checkout/v5/qSu608sppl7jnOFUgYuj")}
                    onClick={onBasicClick}
                    data-track="cta-click"
                    data-location="pricing-basic"
                    role="button"
                    aria-label="Garantir Plano Básico"
                    className="flex items-center justify-center w-full py-3.5 rounded-full text-base font-bold bg-sky-600 hover:bg-sky-700 text-white transition-all transform active:scale-95 shadow-lg"
                  >
                    <div className="flex items-center justify-center gap-2 px-4">
                      <Download className="w-5 h-5 shrink-0" />
                      <span className="text-center leading-tight">Quero o Básico</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Plan Premium */}
          <Reveal delay={200} variant="scale" className="flex h-full">
            <div id="premium-plan" className="relative w-full flex flex-col bg-white rounded-[2rem] border-2 border-sky-600 p-6 md:p-10 shadow-xl transition-all duration-300 group overflow-hidden scroll-mt-24">
              {/* Most Popular Badge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-sky-600 text-white px-6 py-1.5 rounded-b-xl font-bold text-sm flex items-center gap-2 z-20 shadow-md whitespace-nowrap">
                <Star className="w-4 h-4 fill-white" /> Mais Popular
              </div>
              
              <div className="relative z-10 flex flex-col h-full items-center mt-4">
                <h3 className="text-3xl font-black text-sky-600 mb-2 tracking-tighter">Oferta Premium</h3>
                <p className="text-slate-500 font-medium mb-6">Kit completo com todos os bônus</p>
                
                {/* Image */}
                <div className="w-full flex justify-center relative mb-8">
                  <img 
                    src="https://i.postimg.cc/44L0mLfZ/Experimentos-cientificos-divertidos-em-casa.png" 
                    alt="Kit Completo Cientista Mirim" 
                    loading="lazy"
                    decoding="async"
                    className="w-full max-w-[320px] object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl relative z-10"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Features List */}
                <div className="w-full bg-sky-50 rounded-xl p-6 mb-8 flex flex-col items-center">
                  <span className="text-slate-800 font-bold mb-4">Tudo do Plano Básico +</span>
                  <div className="flex flex-col items-start space-y-3">
                    {[
                      "TODOS OS BÔNUS EXCLUSIVOS:",
                      "🎁 100 Truques de Mágica para Crianças",
                      "🎁 Guia de Brincadeiras em Família",
                      "🎁 50 Atividades Criativas (Offline)",
                      "🎁 Mini Guia: Como Despertar o Interesse das Crianças",
                      "🎁 Pack de Piadas e Curiosidades Científicas"
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="shrink-0 mt-0.5">
                          <CheckCircle2 className="w-5 h-5 text-sky-600" />
                        </div>
                        <span className="text-slate-700 font-medium leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Info */}
                <div className="w-full flex flex-col items-center mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-slate-500 font-medium text-lg line-through">De R$ 197,00</span>
                    <span className="bg-sky-600 text-white text-xs font-bold px-2 py-1 rounded">Economize 89%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 font-medium text-sm">Por apenas</span>
                    <span className="text-sky-600 text-6xl md:text-7xl font-black tracking-tighter whitespace-nowrap">
                      R$ 19,90
                    </span>
                  </div>
                </div>
                
                {/* CTA Button */}
                <div className="mt-auto w-full max-w-md mx-auto">
                  <a 
                    href={getCheckoutUrl("https://ggcheckout.app/checkout/v5/RcDW0q83YtDWo4Mg5CJU")}
                    data-track="cta-click"
                    data-location="pricing-premium"
                    role="button"
                    aria-label="Garantir Plano Premium"
                    className="flex items-center justify-center w-full py-3.5 rounded-full text-base font-bold bg-sky-600 hover:bg-sky-700 text-white transition-all transform active:scale-95 shadow-lg"
                  >
                    <div className="flex items-center justify-center gap-2 px-4">
                      <Download className="w-5 h-5 shrink-0" />
                      <span className="text-center leading-tight">Quero o Kit Premium Completo</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
});

Pricing.displayName = 'Pricing';

const Guarantee = React.memo(() => (
  <section className="py-8 px-4 bg-white overflow-hidden">
    <Reveal variant="scale" threshold={0.3}>
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-sky-50 to-white rounded-3xl p-6 md:p-8 border border-sky-100 shadow-2xl shadow-sky-100/50 relative">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-yellow-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-48 h-48 bg-sky-200/30 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/3 flex justify-center">
            <img 
              src="https://i.postimg.cc/j2cgt0hz/Selo-de-Garantia-de-30-Dias-PNG-Transparente-Sem-Fundo-removebg-preview.png" 
              alt="Selo de Garantia 30 Dias" 
              loading="lazy"
              decoding="async"
              className="w-40 md:w-48 h-auto drop-shadow-2xl animate-bounce-subtle"
            />
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-black leading-tight tracking-tighter">
              Satisfação Garantida: <span className="text-sky-600">Seu Risco é Zero</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Estamos tão confiantes na qualidade do nosso <span className="font-bold text-sky-700">Kit Cientista Mirim</span> que oferecemos uma garantia incondicional. 
              Você tem <span className="font-bold text-black underline decoration-yellow-400 decoration-4 underline-offset-4">30 dias inteiros</span> para explorar cada atividade. 
            </p>
            <p className="text-base text-slate-600">
              Se por qualquer motivo você achar que o kit não é para você, basta nos enviar um e-mail e <span className="font-bold">devolvemos 100% do seu dinheiro</span>. Sem burocracia, sem perguntas e continuamos amigos.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2 mb-4">
               <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-sky-100 shadow-sm">
                 <ShieldCheck className="w-4 h-4 text-sky-600" />
                 <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Compra Protegida</span>
               </div>
               <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-sky-100 shadow-sm">
                 <CheckCircle2 className="w-4 h-4 text-sky-600" />
                 <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Reembolso Facilitado</span>
               </div>
            </div>

            <Reveal delay={200} variant="scale" className="flex justify-center md:justify-start">
               <a 
                href="#basic-plan" 
                onClick={handleCTAClick}
                data-track="cta-click"
                data-location="guarantee"
                role="button"
                aria-label="Garantir meu risco zero"
                className="px-5 py-2.5 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white rounded-full font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2 uppercase text-xs md:text-sm"
               >
                 Garantir meu risco zero <ArrowRight size={18} />
               </a>
            </Reveal>
          </div>
        </div>
      </div>
    </Reveal>
  </section>
));

Guarantee.displayName = 'Guarantee';

const FAQ = React.memo(() => {
  const faqs: FAQItem[] = [
    { question: "Preciso de materiais caros para fazer os experimentos?", answer: "Não! Todos os experimentos foram pensados com materiais simples e acessíveis que você provavelmente já tem em casa." },
    { question: "Para qual idade esse material é indicado?", answer: "O conteúdo é ideal para crianças de 4 a 12 anos, mas pode ser adaptado facilmente para diferentes idades." },
    { question: "Como vou receber o acesso ao material?", answer: "Assim que o pagamento for confirmado, você recebe o acesso imediato no seu e-mail para começar na hora." },
    { question: "Posso acessar pelo celular?", answer: "Sim! Você pode acessar pelo celular, tablet ou computador, de forma prática e rápida." },
    { question: "Preciso ter algum conhecimento para aplicar?", answer: "Não precisa! Todo o material é explicado de forma simples, passo a passo, pensado para qualquer pessoa aplicar." },
    { question: "O acesso é vitalício?", answer: "Sim! Você paga uma única vez e pode acessar o conteúdo para sempre, sem mensalidades." },
    { question: "E se eu não gostar do produto?", answer: "Você tem 30 dias de garantia incondicional. Se não ficar satisfeito, devolvemos 100% do seu dinheiro." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 px-4 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tighter">Perguntas Frequentes</h2>
        </Reveal>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Reveal key={idx} delay={idx * 100} variant="up">
              <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-sky-300">
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-sky-50/30 transition-colors"
                >
                  <span className="font-bold text-lg text-slate-800">{faq.question}</span>
                  {openIndex === idx ? <ChevronUp className="text-sky-600" /> : <ChevronDown className="text-slate-400" />}
                </button>
                {openIndex === idx && (
                  <div id={`faq-answer-${idx}`} className="p-6 pt-0 text-slate-600 bg-white leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
});

FAQ.displayName = 'FAQ';

const WhyChooseUs = React.memo(() => {
  const reasons = [
    {
      title: "Substitui as Telas por Diversão Real",
      description: "Seu filho troca o celular por atividades que realmente prendem a atenção e despertam curiosidade.",
      icon: <span className="text-3xl">📴</span>
    },
    {
      title: "Ensina Ciência de Forma Simples",
      description: "Explicações fáceis e práticas que fazem seu filho aprender sem dificuldade.",
      icon: <span className="text-3xl">🧠</span>
    },
    {
      title: "Cria Momentos em Família",
      description: "Você participa, se diverte e cria memórias enquanto seu filho aprende.",
      icon: <span className="text-3xl">💛</span>
    },
    {
      title: "Funciona na Prática (Sem Complicação)",
      description: "Experimentos rápidos, com materiais simples e resultados que encantam logo na primeira vez.",
      icon: <span className="text-3xl">⚡</span>
    }
  ];

  return (
    <section id="why-choose-us" data-section="why-choose-us" className="py-16 px-4 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal className="text-center mb-16">
          <h2 className="text-xl md:text-4xl font-black text-black mb-4 uppercase tracking-tighter leading-tight">
            COMO ESSE MATERIAL VAI TRANSFORMAR A ROTINA DO SEU FILHO
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, idx) => (
            <Reveal key={idx} delay={idx * 150} variant="up" className="h-full">
              <div className="bg-sky-50 rounded-2xl p-5 md:p-6 h-full flex flex-col items-center text-center border border-sky-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md mb-4">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-black text-black mb-3 tracking-tighter leading-tight">{reason.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{reason.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
});

WhyChooseUs.displayName = 'WhyChooseUs';

const Testimonials = React.memo(() => {
  const images = [
    "https://i.imgur.com/2g6AKgb.jpeg",
    "https://i.imgur.com/Sz3pKu6.png",
    "https://i.imgur.com/kP45N2y.jpeg",
    "https://i.imgur.com/RbpOJRK.png",
    "https://i.imgur.com/ojKM2ik.jpeg",
    "https://i.imgur.com/sOUmMCM.png",
    "https://i.imgur.com/ebDeV7q.png"
  ];

  // Double images for seamless loop
  const doubledImages = [...images, ...images];

  return (
    <section id="testimonials" data-section="testimonials" className="py-16 bg-white overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4 uppercase tracking-tighter">O QUE OS PAIS ESTÃO DIZENDO</h2>
          <p className="text-lg text-slate-600">Histórias reais de famílias se divertindo e aprendendo juntas</p>
        </Reveal>
      </div>

      {/* Marquee Container */}
      <div className="relative overflow-hidden group">
        <div 
          className="flex gap-4 md:gap-6 px-4 animate-marquee hover-pause active-pause items-center"
          style={{ width: "max-content" }}
        >
          {doubledImages.map((url, idx) => (
            <div 
              key={idx} 
              className="shrink-0 w-[280px] md:w-[350px] overflow-hidden rounded-3xl shadow-lg border border-slate-100 hover:scale-[1.02] transition-transform duration-300"
            >
              <img 
                src={url} 
                alt={`Depoimento ${idx + 1}`} 
                loading="lazy" 
                decoding="async" 
                className="w-full h-auto object-cover pointer-events-none" 
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        {/* Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 flex flex-col items-center">
        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest mb-10">
          <span className="text-lg">👆</span> SEGURE PARA LER
        </div>

        <Reveal delay={400} variant="scale" className="flex justify-center">
          <a 
            href="#basic-plan" 
            onClick={handleCTAClick}
            data-track="cta-click"
            data-location="testimonials"
            role="button"
            aria-label="QUERO GARANTIR MEU ACESSO AGORA"
            className="px-8 py-3.5 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white rounded-full text-lg font-bold shadow-xl transition-all transform hover:-translate-y-1 text-center animate-pulse-soft uppercase"
          >
            QUERO GARANTIR MEU ACESSO AGORA
          </a>
        </Reveal>
      </div>
    </section>
  );
});

Testimonials.displayName = 'Testimonials';

const Footer = React.memo(() => (
  <footer className="bg-slate-900 text-white py-16 px-4">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
      <Reveal variant="left">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-black text-sky-400 mb-2 tracking-tighter">Cientista Mirim</h2>
          <p className="text-slate-400 max-w-sm">Transformando momentos comuns em experiências incríveis dentro de casa.</p>
        </div>
      </Reveal>
      <Reveal variant="right">
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-6 text-slate-400 font-medium">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>
          <p className="text-slate-500 text-sm">© 2025 Cientista Mirim. Todos os direitos reservados.</p>
        </div>
      </Reveal>
    </div>
  </footer>
));

Footer.displayName = 'Footer';

const App: React.FC = () => {
  const [isUpsellModalOpen, setIsUpsellModalOpen] = useState(false);
  const [isDeferredLoaded, setIsDeferredLoaded] = useState(false);

  useEffect(() => {
    // Priority: Render main UI, then defer secondary components
    const timer = setTimeout(() => {
      setIsDeferredLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleBasicClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsUpsellModalOpen(true);
  };

  const handleUpsellAccept = () => {
    window.location.href = getCheckoutUrl("https://ggcheckout.app/checkout/v5/kgKU64Vo2IaXnaEqSebR");
  };

  const handleUpsellDecline = () => {
    window.location.href = getCheckoutUrl("https://ggcheckout.app/checkout/v5/qSu608sppl7jnOFUgYuj");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <section style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1000px' }}>
          <WhatYouGet />
        </section>
        <section style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
          <ProblemSection />
        </section>
        <section style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}>
          <WhyChooseUs />
        </section>
        <section style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1200px' }}>
          <Testimonials />
        </section>
        <section style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1500px' }}>
          <Bonuses />
        </section>
        <Pricing onBasicClick={handleBasicClick} />
        <section style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}>
          <Guarantee />
        </section>
        <section style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1000px' }}>
          <FAQ />
        </section>
        
        <section id="bottom-cta" data-section="bottom-cta" className="py-16 px-4 bg-sky-50 text-center">
          <div className="max-w-3xl mx-auto">
            <Reveal threshold={0.3}>
              <h2 className="text-3xl md:text-5xl font-black text-black mb-8 leading-tight tracking-tighter">
                Não deixe a curiosidade do seu filho se perder
              </h2>
            </Reveal>
            <Reveal delay={200} threshold={0.3}>
              <div className="text-xl text-slate-600 mb-12 space-y-4">
                <p>Transforme momentos comuns em experiências incríveis dentro de casa.</p>
                <p className="font-bold">👉 Comece hoje com +100 experimentos simples, divertidos e educativos.</p>
              </div>
            </Reveal>
            <Reveal delay={400} variant="scale" threshold={0.3}>
              <a 
                href="#basic-plan" 
                onClick={handleCTAClick}
                data-track="cta-click"
                data-location="bottom"
                role="button"
                aria-label="QUERO TRANSFORMAR MEU FILHO AGORA"
                className="inline-block px-10 py-4 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white rounded-full text-xl font-bold shadow-2xl transition-all transform hover:scale-105 active:scale-95 animate-pulse-soft uppercase"
              >
                QUERO TRANSFORMAR MEU FILHO AGORA
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      {isDeferredLoaded && (
        <>
          <SocialProof />
          <UpsellModal 
            isOpen={isUpsellModalOpen} 
            onClose={() => setIsUpsellModalOpen(false)}
            onAccept={handleUpsellAccept}
            onDecline={handleUpsellDecline}
          />
        </>
      )}
    </div>
  );
};

export default App;
