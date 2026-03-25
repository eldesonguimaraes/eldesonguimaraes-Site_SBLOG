import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, X, ArrowRight, CheckCircle2, 
  Truck, Warehouse, ShieldCheck, Leaf, 
  Users, Zap, Phone, Mail, MapPin, Send
} from "lucide-react";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Quem Somos", href: "#quem-somos" },
    { name: "Nossos Serviços", href: "#servicos" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-darker/80 backdrop-blur-md py-4 shadow-lg" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Truck className="text-darker" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">SB LOG</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-white/70 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contato" 
            className="px-6 py-2 bg-primary text-darker font-bold rounded-full text-sm hover:scale-105 transition-transform active:scale-95"
          >
            FALE CONOSCO
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-dark border-b border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium text-white/80"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contato" 
              className="w-full py-3 bg-primary text-darker font-bold rounded-xl text-center"
              onClick={() => setIsOpen(false)}
            >
              FALE CONOSCO
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000" 
          alt="Logistics Background" 
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-darker via-darker/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
            SOLUÇÕES <span className="text-primary">LOGÍSTICAS</span> EM ARMAZENAGEM E TRANSPORTE
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-light mb-10 max-w-2xl">
            A eficiência e a sustentabilidade que sua operação precisa para todos os segmentos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contato" 
              className="px-8 py-4 bg-primary text-darker font-black rounded-xl flex items-center justify-center gap-2 hover:gap-4 transition-all"
            >
              FALE COM A GENTE <ArrowRight size={20} />
            </a>
            <a 
              href="#servicos" 
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-center"
            >
              NOSSOS SERVIÇOS
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 hidden lg:block opacity-20 pointer-events-none">
        <div className="w-full h-full bg-primary blur-[150px] rounded-full"></div>
      </div>
    </section>
  );
};

const Ticker = () => {
  const items = [
    "Gestão de estoques eficiente",
    "Soluções logísticas personalizadas",
    "Consultoria especializada",
    "Treinamento de equipes",
    "Gestão de frotas leves",
    "Mão de obra qualificada",
    "Transporte ágil e seguro",
    "Inovação tecnológica",
    "Sustentabilidade integrada",
    "Redução de custos",
  ];

  return (
    <div className="bg-dark py-10 border-y border-white/5 overflow-hidden">
      <div className="ticker-container relative">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 items-center"
        >
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-3 h-3 bg-primary rotate-45"></div>
              <span className="text-lg font-bold uppercase tracking-widest text-white/80 italic">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="quem-somos" className="py-24 bg-darker">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1000" 
              alt="About Us" 
              className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-8 -right-8 bg-primary p-8 rounded-2xl hidden lg:block">
              <span className="text-5xl font-black text-darker block">15+</span>
              <span className="text-darker font-bold uppercase tracking-tighter">Anos de Mercado</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Sobre Nós</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              QUEM SOMOS
            </h2>
            <div className="space-y-6 text-lg text-white/70 font-light leading-relaxed">
              <p>
                Com <span className="text-primary font-bold">15 anos</span> de atuação no mercado, a <span className="text-white font-bold">SB LOG</span> se posiciona como um parceiro estratégico no setor de logística e outros segmentos que necessitem de projetos eficientes.
              </p>
              <p>
                Oferecemos soluções completas de transporte, armazenagem e distribuição, adaptáveis para diferentes segmentos da indústria.
              </p>
              <p>
                Nossa missão é garantir que insumos e produtos cheguem ao destino com <span className="text-primary font-bold">segurança e agilidade</span>, sempre com foco na qualidade e nas melhores práticas ambientais, sociais e de governança (ESG).
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Truck size={32} />,
      title: "Transporte Ágil",
      desc: "Entregas com foco em eficiência e controle total de qualidade em cada etapa."
    },
    {
      icon: <Warehouse size={32} />,
      title: "Armazenagem Inteligente",
      desc: "Gestão de estoques eficiente para evitar desperdícios e otimizar seus recursos."
    },
    {
      icon: <Users size={32} />,
      title: "Mão de Obra Especializada",
      desc: "Profissionais qualificados para aumentar a produtividade da sua operação."
    },
    {
      icon: <Leaf size={32} />,
      title: "Práticas ESG",
      desc: "Operações com responsabilidade ambiental e social integradas ao seu negócio."
    },
    {
      icon: <Zap size={32} />,
      title: "Inovação Tecnológica",
      desc: "Soluções de ponta para maximizar o desempenho e reduzir custos operacionais."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Segurança Total",
      desc: "Processos rigorosos para garantir a integridade da sua carga em todo o trajeto."
    }
  ];

  return (
    <section id="servicos" className="py-24 bg-dark">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-primary"></div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Nossos Serviços</span>
            <div className="w-12 h-[2px] bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">SOLUÇÕES COMPLETAS</h2>
          <p className="text-white/60 text-lg">
            Projetos adaptados às necessidades específicas da sua operação, garantindo flexibilidade e economia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 bg-darker border border-white/5 rounded-3xl hover:border-primary/30 transition-all group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-darker transition-all duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-white/50 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Orçamento",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contato" className="py-24 bg-darker overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Fale Conosco</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8">VAMOS OTIMIZAR SUA LOGÍSTICA?</h2>
            <p className="text-white/60 text-xl mb-12 font-light">
              Nossa equipe está pronta para desenhar o projeto ideal para o seu negócio. Entre em contato e solicite um orçamento.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase font-bold tracking-widest">Telefone</p>
                  <p className="text-xl font-bold">+55 (11) 99999-9999</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase font-bold tracking-widest">E-mail</p>
                  <p className="text-xl font-bold">contato@sblog.com.br</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase font-bold tracking-widest">Localização</p>
                  <p className="text-xl font-bold">São Paulo, SP - Brasil</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-dark p-8 md:p-12 rounded-[40px] border border-white/5 shadow-2xl"
          >
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-black mb-4">MENSAGEM ENVIADA!</h3>
                <p className="text-white/60">Obrigado pelo contato. Nossa equipe retornará em breve.</p>
                <button 
                  onClick={() => {
                    setStatus("idle");
                    setFormData({ name: "", email: "", subject: "Orçamento", message: "" });
                  }}
                  className="mt-8 text-primary font-bold underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === "error" && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-sm font-bold">
                    Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/40 uppercase tracking-widest">Nome</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text" 
                      placeholder="Seu nome completo"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/40 uppercase tracking-widest">E-mail</label>
                    <input 
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email" 
                      placeholder="seu@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/40 uppercase tracking-widest">Assunto</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option>Orçamento</option>
                    <option>Consultoria</option>
                    <option>Trabalhe Conosco</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/40 uppercase tracking-widest">Mensagem</label>
                  <textarea 
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Como podemos ajudar sua empresa?"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors resize-none"
                  ></textarea>
                </div>
                <button 
                  disabled={status === "loading"}
                  className="w-full py-5 bg-primary text-darker font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
                >
                  {status === "loading" ? "ENVIANDO..." : <>ENVIAR MENSAGEM <Send size={20} /></>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-darker border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Truck className="text-darker" size={18} />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">SB LOG</span>
          </div>
          
          <p className="text-white/40 text-sm">
            © 2026 SB LOG Soluções Logísticas. Todos os direitos reservados.
          </p>

          <div className="flex gap-6">
            {["LinkedIn", "Instagram", "Facebook"].map(social => (
              <a key={social} href="#" className="text-white/40 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Services />
      <ContactForm />
      <Footer />
    </div>
  );
}
