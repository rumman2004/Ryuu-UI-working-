// frontend/src/pages/Home.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, CheckCircle2, Copy, LayoutGrid } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" }
  }),
};

export default function Home() {
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
                  style={{ background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" }}>
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
              Learn More <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Social Proof Overlaps */}
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
              <p className="font-bold" style={{ color: "var(--text-primary)" }}>Downloaded more than</p>
              <p className="font-medium" style={{ color: "var(--text-secondary)" }}>5M+ in a year 🚀</p>
            </div>
          </motion.div>
        </div>

        {/* Right: Mockup Interface */}
        <div className="relative z-10 lg:h-[600px] flex justify-center lg:justify-end items-center mt-10 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-[340px] rounded-[2.5rem] shadow-2xl overflow-hidden glass-card border-[6px]"
            style={{ 
              borderColor: "var(--bg-highest)", 
              height: "600px",
              boxShadow: "0 25px 60px -12px rgba(99, 102, 241, 0.25)"
            }}
          >
            {/* App Header */}
            <div className="px-6 pt-10 pb-6 rounded-b-[2rem]" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <p className="text-white/80 text-sm font-medium">Hello,</p>
              <p className="text-white font-black text-2xl mb-6">UIVault Dev 👋</p>
              
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-5 text-white shadow-inner">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-sm">Brand New UI</span>
                  <span className="text-xs font-bold text-indigo-600 bg-white px-3 py-1 rounded-full">Pro</span>
                </div>
                <div className="w-full bg-black/20 h-1.5 rounded-full mt-4">
                  <div className="bg-white w-[70%] h-full rounded-full" />
                </div>
                <p className="text-[10px] font-bold mt-2 text-white/90 uppercase tracking-wider">70% Copied</p>
              </div>
            </div>

            {/* App Body */}
            <div className="p-6 space-y-4" style={{ background: "var(--bg-card-solid)", minHeight: "350px" }}>
              <p className="font-black text-sm uppercase tracking-widest text-[#6366f1] mb-2">Recent Components</p>
              {[
                { name: "Navbar Layout", count: "120+", color: "#6366f1" },
                { name: "Hero Format", count: "95+", color: "#ec4899" },
                { name: "Pricing Cards", count: "42+", color: "#10b981" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-2xl border transition-colors hover:bg-[var(--surface-glass)]" style={{ borderColor: "var(--ghost-border)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center opacity-20" style={{ background: item.color }} />
                  <div className="flex-1">
                    <p className="font-bold text-xs" style={{ color: "var(--text-primary)" }}>{item.name}</p>
                    <p className="text-[10px] font-medium mt-0.5" style={{ color: "var(--text-secondary)" }}>Updated today</p>
                  </div>
                  <span className="text-[10px] font-black" style={{ color: item.color }}>{item.count}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating UI Badges */}
          <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-[-10px] md:right-0 glass-card p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--ghost-border)" }}>
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 size={16} className="text-emerald-500" />
            </div>
            <div>
              <p className="font-bold text-xs" style={{ color: "var(--text-primary)" }}>Project Overview</p>
              <p className="text-[10px] font-medium" style={{ color: "var(--text-secondary)" }}>Code sync completed</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- FEATURE ZIGZAG 1 --- */}
      <section className="relative px-4 py-20 lg:py-32 overflow-hidden">
        {/* Rounded Purple BG shape on the left */}
        <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-[4rem] -z-10 rotate-12 transition-colors duration-500 opacity-50"
             style={{ background: "linear-gradient(135deg, rgba(236,72,153,0.05), rgba(139,92,246,0.1))" }} />
             
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Floating Element Mockup */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="glass-card rounded-[2rem] p-8 max-w-sm mx-auto xl:ml-10 shadow-2xl border relative z-10"
              style={{ background: "var(--bg-highest)", borderColor: "var(--ghost-border)" }}
            >
              <div className="flex justify-between items-center mb-6 border-b pb-4" style={{ borderColor: "var(--ghost-border)" }}>
                <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>Task List</span>
                <span className="text-[10px] font-bold px-3 py-1.5 bg-indigo-500/10 text-indigo-500 rounded-lg uppercase tracking-wider">+ Add task</span>
              </div>
              <div className="space-y-4">
                {[
                  "Create React Grid Guide",
                  "Design Glassmorphism Navbar",
                  "Release Sidebar Update"
                ].map((task, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border" style={{ borderColor: "var(--ghost-border)" }}>
                    <div className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-500 flex-shrink-0" />
                    <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>{task}</p>
                  </div>
                ))}
              </div>
            </motion.div>

             {/* Small accent floating box */}
             <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -bottom-10 left-10 md:left-24 glass-card p-4 rounded-xl shadow-lg border z-20"
               style={{ background: "var(--bg-elevated)", borderColor: "var(--ghost-border)" }}>
               <div className="flex items-end gap-1.5 h-8">
                 {[40, 70, 45, 90, 60, 100].map((h,i) => (
                   <div key={i} className="w-2 rounded-t-sm" style={{ height: `${h}%`, background: i%2===0 ? '#ec4899' : '#6366f1' }} />
                 ))}
               </div>
             </motion.div>
          </div>

          {/* Right: Text & Stats */}
          <div className="lg:pl-10">
            <div className="grid grid-cols-2 gap-8 mb-12 border-b pb-12" style={{ borderColor: "var(--ghost-border)" }}>
               <div>
                 <h3 className="text-4xl md:text-5xl font-black text-[#6366f1] mb-3">29M+</h3>
                 <p className="text-sm font-semibold leading-relaxed" style={{ color: "var(--text-secondary)" }}>Installed over the <br/>time</p>
               </div>
               <div>
                 <h3 className="text-4xl md:text-5xl font-black text-[#8b5cf6] mb-3">100M+</h3>
                 <p className="text-sm font-semibold leading-relaxed" style={{ color: "var(--text-secondary)" }}>Total tasks overall <br/>completed</p>
               </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>Data Sync and Backup</h4>
                <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>Used tools and app settings are synced across multiple devices effortlessly.</p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>Task Attachments</h4>
                <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>Users can attach files, documents, or links to tasks, providing contextual assets instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE ZIGZAG 2 --- */}
      <section className="relative px-4 py-20 lg:py-32" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Text */}
          <div className="lg:pr-10">
            <h2 className="text-4xl lg:text-5xl font-black mb-10 leading-[1.15]" style={{ color: "var(--text-primary)" }}>
              Comprehensive <span className="text-[#8b5cf6]">Feature Set</span> of a Task Manager App
            </h2>
            
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Copy className="text-indigo-500" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>Data Sync and Backup</h4>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>Used tools and app settings sync simultaneously across multiple devices.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0">
                  <LayoutGrid className="text-purple-500" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>Task Attachments</h4>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>Users can attach files, documents, or links to tasks, providing conditional context instantly.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Floating Cards Mockup */}
          <div className="relative h-[450px] flex justify-center items-center">
            {/* Background Blob behind cards */}
            <div className="absolute w-[80%] h-[80%] rounded-full bg-indigo-500/5 blur-3xl" />
            
            {/* Card 1 */}
            <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-5 left-0 lg:-left-10 w-full max-w-sm p-6 rounded-3xl glass-card shadow-lg z-10"
              style={{ background: "var(--bg-highest)" }}>
              <div className="flex justify-between mb-4">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500"><LayoutGrid size={16}/></div>
                  <div><p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>Create Task</p><p className="text-[10px]" style={{ color: "var(--text-secondary)" }}>12 August 2024</p></div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500"><LayoutGrid size={16}/></div>
                  <div><p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>App Design</p><p className="text-[10px]" style={{ color: "var(--text-secondary)" }}>15 mins left</p></div>
                </div>
              </div>
              <div className="border-t pt-4" style={{ borderColor: "var(--ghost-border)" }}>
                 <p className="font-bold text-sm mb-1" style={{ color: "var(--text-primary)" }}>Project Overview</p>
                 <p className="text-xs font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>Design process will be completely automated using these specific interfaces and visual structures.</p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div animate={{ x: [5, -5, 5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-5 right-0 lg:-right-10 p-5 rounded-2xl glass-card shadow-xl flex items-center gap-5 z-20"
              style={{ background: "var(--bg-elevated)", borderColor: "var(--ghost-border)" }}>
              <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-secondary)" }}>Total Working Hours</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-black text-[#6366f1]">24:52:00</p>
                  <span className="text-[10px] font-bold bg-[#ec4899] text-white px-2 py-0.5 rounded-md">Pro</span>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="px-4 py-20 lg:py-32 max-w-7xl mx-auto">
        <div className="relative rounded-[3rem] overflow-hidden" style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)" }}>
          {/* Overlapping Mockup (Fake Phone Half) */}
          <div className="absolute -left-10 lg:left-10 bottom-[-80px] w-[240px] lg:w-[280px] h-[120%] pt-10 px-5 rounded-t-[3rem] bg-white dark:bg-[#1a1a1f] border-8 border-b-0 border-white/20 shadow-2xl hidden sm:block rotate-[-5deg]">
            <div className="w-16 h-1.5 mx-auto bg-slate-300 dark:bg-slate-700 rounded-full mb-8" />
            <div className="space-y-4">
              <div className="flex gap-3 mb-6 items-center">
                 <div className="w-8 h-8 rounded-full bg-indigo-500/20" />
                 <div className="h-4 bg-indigo-500/20 rounded-md w-24" />
              </div>
              <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
              <div className="h-32 bg-indigo-500/10 rounded-2xl" />
              <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl w-3/4" />
              <div className="h-12 bg-indigo-500 rounded-2xl mt-8" />
            </div>
          </div>

          <div className="py-24 px-8 sm:pl-[240px] lg:pl-[380px] pr-8 lg:pr-20 text-center sm:text-left relative z-10">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-[1.2] mb-6">
              Ready? Let's Start with Mutmiz and Get <span className="text-pink-300">Awesome Experience</span>
            </h2>
            <p className="text-white/80 text-sm lg:text-base mb-8 max-w-xl font-medium leading-relaxed">
              Come straight to user flow block to easily sketch the steps, rules and actions that make up your custom workflow. Copy any component immediately.
            </p>
            <Link to="/components" className="inline-block bg-white text-[#8b5cf6] font-extrabold px-10 py-4 rounded-full text-sm hover:shadow-2xl hover:scale-105 transition-all">
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL --- */}
      <section className="px-4 pb-32 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 relative">
        <div className="relative md:w-1/3 flex justify-center">
           {/* Avatar Stack */}
           <div className="relative">
             <div className="w-32 h-32 rounded-[2rem] bg-pink-500 overflow-hidden shadow-2xl relative z-10 border-4 border-[var(--bg-primary)]">
               <img src="https://i.pravatar.cc/300?img=12" className="w-full h-full object-cover" alt="User" />
             </div>
             {/* Trustpilot overlay */}
             <div className="absolute -top-4 -right-16 glass-card px-4 py-2 rounded-xl border z-20 flex flex-col items-center" style={{ background: "var(--bg-elevated)", borderColor: "var(--ghost-border)" }}>
                <span className="text-[#10b981] font-bold text-xs flex items-center gap-1"><Star size={10} className="fill-current"/> Trustpilot</span>
                <span className="text-xl font-black" style={{ color: "var(--text-primary)" }}>4.9 ★</span>
             </div>
           </div>
        </div>
        <div className="md:w-2/3 text-center md:text-left">
          <div className="mb-4 text-[#a3a6ff]"> {/* Quotes icon */}
             <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/></svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-8 leading-relaxed" style={{ color: "var(--text-primary)" }}>
            "We had an excellent experience working with UIVault. Their library delivered a visually stunning and user-friendly design that exceeded our expectations totally."
          </h3>
          <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>Alan Walker, Senior Executive</p>
          <span className="text-xs font-semibold uppercase tracking-wider mt-1 block" style={{ color: "var(--text-secondary)" }}>The Ford</span>
        </div>
      </section>

    </div>
  );
}