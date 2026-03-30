// frontend/src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, CheckCircle2, Copy, LayoutGrid, Terminal } from "lucide-react";
import { getCategories, getTags } from "../services/api";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" }
  }),
};

// Carefully calculated Bento sizes for a perfect 3-row, 5-column interlocking grid
const bentoClasses = [
  "md:col-span-2 md:row-span-1", // 0: Wide (top left)
  "md:col-span-1 md:row-span-1", // 1: Square (top mid)
  "md:col-span-2 md:row-span-2", // 2: Huge (top right, descends to row 2)
  "md:col-span-1 md:row-span-2", // 3: Tall (row 2 left, descends to row 3)
  "md:col-span-2 md:row-span-1", // 4: Wide (row 2 mid)
  "md:col-span-2 md:row-span-1", // 5: Wide (row 3 mid)
  "md:col-span-1 md:row-span-1", // 6: Square (row 3 right-ish)
  "md:col-span-1 md:row-span-1", // 7: Square (row 3 far right)
];

const categoryColors = [
  "from-blue-500/10 to-indigo-500/10",
  "from-emerald-500/10 to-teal-500/10",
  "from-purple-500/10 to-pink-500/10",
  "from-orange-500/10 to-rose-500/10",
  "from-cyan-500/10 to-blue-500/10",
  "from-fuchsia-500/10 to-purple-500/10",
  "from-yellow-500/10 to-orange-500/10",
  "from-sky-500/10 to-indigo-500/10",
];

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Fetch real data to populate Bento layout and Tags marquee
    Promise.all([getCategories(), getTags()]).then(([catRes, tagRes]) => {
      setCategories(catRes?.data?.data || []);
      setTags(tagRes?.data?.data || []);
    });
  }, []);

  return (
    <div className="overflow-x-hidden relative min-h-screen text-slate-800 dark:text-slate-200" style={{ background: "var(--bg-primary)" }}>
      
      {/* --- Mutmiz Background Blobs --- */}
      <div 
        className="absolute top-0 right-0 w-[90%] md:w-[60%] h-[800px] rounded-bl-[200px] -z-10 transition-colors duration-500" 
        style={{ background: "linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(99, 102, 241, 0.05) 100%)" }}
      />
      <div 
        className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] rounded-full -z-10 transition-colors duration-500 blur-[100px] opacity-40" 
        style={{ background: "rgba(236, 72, 153, 0.3)" }}
      />

      {/* --- HERO SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 pt-20 pb-24 lg:pt-32 lg:pb-40 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
        {/* Left: Text Content */}
        <div className="relative z-10 lg:pr-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-6"
                  style={{ background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6", border: "1px solid rgba(139, 92, 246, 0.2)" }}>
              <Star size={12} className="fill-current" /> Trustpilot 4.9 ★
            </span>
          </motion.div>
          
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.08] tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Maximize Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              Productivity
            </span>
          </motion.h1>
          
          <motion.p 
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-base md:text-lg mb-8 max-w-md font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            Conquer your projects and take control with our high-quality UI Component Library.
          </motion.p>
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}>
            <Link to="/components" className="btn-gradient px-8 py-3.5 rounded-full shadow-lg shadow-indigo-500/25 inline-flex items-center gap-2 text-sm">
              Explore Components <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="mt-16 flex items-center gap-4 border-t pt-8"
            style={{ borderColor: "var(--ghost-border)" }}
          >
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-10 h-10 rounded-full border-2 border-[var(--bg-primary)] shadow-sm" />
              ))}
            </div>
            <div className="text-sm">
              <p className="font-bold" style={{ color: "var(--text-primary)" }}>Trusted by developers globally.</p>
              <p className="font-medium" style={{ color: "var(--text-secondary)" }}>100% Free · Open Source 🚀</p>
            </div>
          </motion.div>
        </div>

        {/* Right: Abstract Code Editor Mockup */}
        <div className="relative z-10 lg:h-[600px] flex justify-center lg:justify-end items-center mt-10 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-[500px] rounded-3xl shadow-2xl overflow-hidden glass-card border flex flex-col"
            style={{ 
              borderColor: "var(--ghost-border)",
              boxShadow: "0 25px 60px -12px rgba(99, 102, 241, 0.25)",
              background: "var(--bg-elevated)",
            }}
          >
            {/* Editor App Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "var(--ghost-border)", background: "rgba(0,0,0,0.03)" }}>
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">component.jsx — Black UI</span>
            </div>
            {/* Editor Syntax Body */}
            <div className="p-6 md:p-8 font-mono text-sm leading-8 overflow-hidden relative min-h-[440px]">
              <span className="text-pink-500 font-bold">import</span> {"{ "} <span className="text-indigo-500 dark:text-indigo-400 font-bold">Button</span>, <span className="text-indigo-500 dark:text-indigo-400 font-bold">Card</span> {" }"} <span className="text-pink-500 font-bold">from</span> <span className="text-emerald-500 dark:text-emerald-400">"@uivault/react"</span>;
              <br/><br/>
              <span className="text-purple-600 dark:text-purple-400 font-bold">export default</span> <span className="text-indigo-500 dark:text-indigo-400 font-bold">function</span> <span className="text-sky-500 dark:text-sky-400 font-bold">Hero</span>() {"{"}<br/>
              &nbsp;&nbsp;<span className="text-pink-500 font-bold">return</span> (<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-sky-500 dark:text-sky-400 font-bold">Card</span> <span className="text-emerald-500 dark:text-emerald-400">variant</span>=<span className="text-teal-600 dark:text-teal-300">"glass"</span>&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-sky-500 dark:text-sky-400 font-bold">h1</span> <span className="text-emerald-500 dark:text-emerald-400">className</span>=<span className="text-teal-600 dark:text-teal-300">"text-4xl"</span>&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Build Faster<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-sky-500 dark:text-sky-400 font-bold">h1</span>&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-sky-500 dark:text-sky-400 font-bold">Button</span> <span className="text-emerald-500 dark:text-emerald-400">color</span>=<span className="text-teal-600 dark:text-teal-300">"indigo"</span>&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Deploy Now<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-sky-500 dark:text-sky-400 font-bold">Button</span>&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-sky-500 dark:text-sky-400 font-bold">Card</span>&gt;<br/>
              &nbsp;&nbsp;);<br/>
              {"}"}

              {/* Holographic Glowing Orbs overlapping code */}
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
              
              {/* Floating UI Badges directly over the code to show "Components turning to reality" */}
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-6 bottom-16 p-3 rounded-2xl shadow-xl border backdrop-blur-xl flex items-center gap-3 z-10"
                style={{ background: "var(--surface-glass)", borderColor: "var(--ghost-border)" }}>
                 <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                   <Terminal className="text-white" size={14} />
                 </div>
                 <div>
                   <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>JSX Rendered Setup</p>
                   <p className="text-[10px] font-medium" style={{ color: "var(--text-secondary)" }}>0ms latency</p>
                 </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- TAGS MARQUEE (Infinite Slide Animation) --- */}
      {tags.length > 0 && (
        <section className="py-10 overflow-hidden border-y bg-slate-50/50 dark:bg-black/20" style={{ borderColor: "var(--ghost-border)" }}>
          <div className="flex" style={{ width: "fit-content" }}>
             {/* Note: Translating exactly 50% continuously requires duplication of the array inside the animated div */}
            <motion.div 
              className="flex whitespace-nowrap gap-4 pr-4 pl-4"
              animate={{ x: ["0%", "-50%"] }} 
              transition={{ duration: 35, ease: "linear", repeat: Infinity }}
            >
              {[...tags, ...tags, ...tags, ...tags].map((tag, i) => (
                <Link to={`/components?tags=${tag._id}`} key={i} className="px-6 py-2.5 rounded-full text-[13px] font-bold uppercase tracking-wider border transition-all hover:-translate-y-1 hover:shadow-lg shadow-sm"
                 style={{ background: "var(--bg-elevated)", borderColor: "var(--ghost-border)", color: "var(--text-secondary)" }}>
                  #{tag.name}
                </Link>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* --- CATEGORIES BENTO GRID ("What we have done together") --- */}
      <section className="max-w-7xl mx-auto px-4 py-20 lg:py-32 relative">
         <div className="text-center md:text-left mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ color: "var(--text-primary)" }}>
              What we have <br className="hidden md:block"/> done together
            </h2>
            <p className="text-base text-[#8b5cf6] font-semibold uppercase tracking-widest">
              Browse UI Components Systematically
            </p>
         </div>

         {/* Bento Grid Layer */}
         {categories.length === 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-5 gap-6 auto-rows-[200px]">
             {[1,2,3,4,5,6].map(i => <div key={i} className="bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse col-span-1" />)}
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[240px]">
             {categories.slice(0, 8).map((cat, i) => {
                const layoutClass = bentoClasses[i % bentoClasses.length];
                const bgGradient = categoryColors[i % categoryColors.length];
                return (
                  <Link to={`/components?category=${cat._id}`} key={cat._id} 
                   className={`group relative overflow-hidden rounded-[2rem] p-8 transition-all hover:scale-[1.02] border shadow-md hover:shadow-xl flex flex-col justify-between ${layoutClass}`}
                   style={{ background: "var(--surface-glass)", borderColor: "var(--ghost-border)" }}>
                    {/* The gentle colored light source hovering inside the category box */}
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${bgGradient} rounded-full blur-[60px] opacity-60 group-hover:opacity-100 transition-opacity`} />
                    
                    <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-lg mb-4">
                      <LayoutGrid className="text-[#8b5cf6]" size={20} />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-black mb-1 capitalize tracking-tight" style={{ color: "var(--text-primary)" }}>{cat.name}</h3>
                      <p className="text-sm font-semibold uppercase tracking-wider opacity-70" style={{ color: "var(--text-secondary)" }}>{cat.componentCount || 0} Components</p>
                    </div>
                  </Link>
                )
             })}
           </div>
         )}
      </section>

      {/* --- FEATURE ZIGZAG OVERVIEW --- */}
      <section className="relative px-4 py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-[4rem] -z-10 rotate-12 transition-colors duration-500 opacity-50"
             style={{ background: "linear-gradient(135deg, rgba(236,72,153,0.05), rgba(139,92,246,0.1))" }} />
             
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="glass-card rounded-[2rem] p-8 max-w-sm mx-auto shadow-2xl border relative z-10"
              style={{ background: "var(--bg-highest)", borderColor: "var(--ghost-border)" }}
            >
              <div className="flex justify-between items-center mb-6 border-b pb-4" style={{ borderColor: "var(--ghost-border)" }}>
                <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>Documentation Workflow</span>
              </div>
              <div className="space-y-4">
                {["Copy specific UI nodes", "Paste natively into React setup", "Configure variables globally"].map((task, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border" style={{ borderColor: "var(--ghost-border)" }}>
                    <div className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-500 flex-shrink-0" />
                    <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>{task}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:pl-10">
            <div className="grid grid-cols-2 gap-8 mb-12 border-b pb-12" style={{ borderColor: "var(--ghost-border)" }}>
               <div>
                 <h3 className="text-4xl md:text-5xl font-black text-[#6366f1] mb-3">29M+</h3>
                 <p className="text-sm font-semibold leading-relaxed" style={{ color: "var(--text-secondary)" }}>Lines copied over <br/>the time</p>
               </div>
               <div>
                 <h3 className="text-4xl md:text-5xl font-black text-[#8b5cf6] mb-3">100M+</h3>
                 <p className="text-sm font-semibold leading-relaxed" style={{ color: "var(--text-secondary)" }}>Websites powered by <br/>Black UI components</p>
               </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>Data Sync and Backup</h4>
                <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>Used tools and app settings are synced across multiple devices effortlessly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="px-4 py-20 lg:py-32 max-w-7xl mx-auto">
        <div className="relative rounded-[3rem] overflow-hidden" style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)" }}>
          {/* Overlapping Mockup (Revised to be an abstract Editor snippet instead of a phone) */}
          <div className="absolute -left-10 lg:left-10 bottom-[-80px] w-[240px] lg:w-[320px] h-[120%] pt-8 px-5 rounded-t-[2rem] border-8 border-b-0 border-white/20 shadow-[-20px_0_60px_rgba(0,0,0,0.3)] hidden sm:flex flex-col rotate-[-4deg] bg-[#1a1a1f]">
            <div className="w-full h-3 rounded-full mb-6 flex gap-2">
               <div className="w-3 h-3 rounded-full bg-rose-500 opacity-60" />
               <div className="w-3 h-3 rounded-full bg-amber-500 opacity-60" />
            </div>
            <div className="space-y-6">
              <div className="h-6 bg-slate-700 rounded-md w-1/2" />
              <div className="h-6 bg-slate-700/50 rounded-md w-3/4" />
              <div className="h-10 bg-indigo-500/30 border border-indigo-500/50 rounded-lg w-full mt-4 flex items-center px-4"><span className="text-indigo-300 text-[10px] font-mono">{"<Button>Click</Button>"}</span></div>
              <div className="h-6 bg-slate-800 rounded-md w-5/6" />
            </div>
          </div>

          <div className="py-24 px-8 sm:pl-[240px] lg:pl-[380px] pr-8 lg:pr-20 text-center sm:text-left relative z-10">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-[1.2] mb-6">
              Ready? Let's Start with Black UI and Get an <span className="text-pink-300">Awesome Experience</span>
            </h2>
            <p className="text-white/80 text-sm lg:text-base mb-8 max-w-xl font-medium leading-relaxed">
              Define the steps, rules, and actions that make up your custom web architecture. Copy absolutely any component immediately for free.
            </p>
            <Link to="/components" className="inline-block bg-white text-[#8b5cf6] font-extrabold px-10 py-4 rounded-full text-sm hover:shadow-2xl hover:scale-105 transition-all">
              Learn More →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}