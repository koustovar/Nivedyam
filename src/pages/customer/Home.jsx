import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, MapPin, ChefHat, ScrollText } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

const Home = () => {
    return (
        <div className="relative min-h-screen overflow-hidden mandala-pattern bg-background">
            {/* Hero Section */}
            <section className="relative pt-32 pb-32 px-8 z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="max-w-5xl flex flex-col items-center"
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 mb-10"
                    >
                        <div className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
                        <span className="text-gold text-[10px] font-bold tracking-[0.3em] uppercase">
                            Now Serving Heritage Flavors
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-7xl md:text-[10rem] font-serif font-black mb-10 leading-[0.85] tracking-tighter"
                    >
                        The Art of <br />
                        <span className="text-gradient">Vedic</span> Dining
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-white/50 text-xl md:text-2xl max-w-3xl mb-16 leading-relaxed font-light"
                    >
                        Where Mauryan grandeur meets contemporary culinary finesse.
                        Experience the sacred geometry of flavors at <span className="text-gold font-bold">Nivedyam</span>.
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center space-y-5 sm:space-y-0 sm:space-x-8"
                    >
                        <Link to="/menu" className="w-full sm:w-auto">
                            <Button size="lg" className="group w-full sm:w-80 h-20 px-10 rounded-[2rem] bg-gradient-to-r from-saffron to-[#ff9100] shadow-2xl shadow-saffron/20">
                                <span className="flex items-center justify-center text-xl font-black">
                                    Explore Menu
                                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                                </span>
                            </Button>
                        </Link>
                        <Link to="/booking" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full sm:w-80 h-20 px-10 rounded-[2rem] border-white/10 hover:border-gold hover:bg-gold/5 backdrop-blur-sm">
                                <span className="flex items-center justify-center text-xl font-black text-white/80">
                                    Reserve Table
                                </span>
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Background Glows */}
            <div className="absolute top-[-10%] right-[-10%] -z-0 w-[600px] h-[600px] bg-saffron/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-[10%] left-[-5%] -z-0 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full" />

            {/* Mauryan Pillars Decoration (Abstract) */}
            <div className="absolute right-0 top-0 h-full w-32 border-l border-white/5 hidden md:block opacity-20">
                <div className="h-full w-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
            </div>

            {/* Highlights Section */}
            <section className="px-8 pb-32 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 w-full">
                {[
                    { icon: Star, label: "Heritage Menu", sub: "Ancient recipes" },
                    { icon: ChefHat, label: "Michelin Style", sub: "Masterful craft" },
                    { icon: ScrollText, label: "Vedic Roots", sub: "Pure ingredients" },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + i * 0.2 }}
                        className="group p-10 bg-charcoal/30 border border-white/5 rounded-[2.5rem] backdrop-blur-sm hover:border-gold/30 transition-all cursor-default flex flex-col items-center text-center"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-8 group-hover:bg-gold/20 transition-colors group-hover:scale-110 duration-300">
                            <item.icon className="text-gold" size={32} />
                        </div>
                        <h3 className="text-2xl font-serif font-black text-white mb-3 tracking-wide">{item.label}</h3>
                        <p className="text-white/40 text-[13px] font-sans uppercase tracking-[0.2em] font-bold">{item.sub}</p>
                    </motion.div>
                ))}
            </section>
        </div>
    );
};

export default Home;
