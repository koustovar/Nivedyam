import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, MapPin, ChefHat, ScrollText } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

const Home = () => {
    return (
        <div className="relative min-h-screen overflow-hidden mandala-pattern bg-background">
            {/* Hero Section */}
            <section className="relative pt-20 pb-24 px-8 md:px-20 z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="max-w-4xl"
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
                        className="text-7xl md:text-9xl font-serif font-black mb-10 leading-[0.9] tracking-tighter"
                    >
                        The Art of <br />
                        <span className="text-gradient">Vedic</span> Dining
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-white/50 text-xl max-w-2xl mb-14 leading-relaxed font-light"
                    >
                        Where Mauryan grandeur meets contemporary culinary finesse.
                        Experience the sacred geometry of flavors at <span className="text-gold font-bold">Nivedyam</span>.
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-6"
                    >
                        <Link to="/menu">
                            <Button size="lg" className="group w-full sm:w-auto h-16 px-10 rounded-2xl bg-gradient-to-r from-saffron to-[#ff9100]">
                                <span className="flex items-center text-lg font-bold">
                                    Explore Menu
                                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                                </span>
                            </Button>
                        </Link>
                        <Link to="/booking">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 rounded-2xl border-white/20 hover:border-gold hover:bg-gold/5">
                                <span className="flex items-center text-lg font-bold text-white/80">
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
            <section className="px-8 pb-32 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
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
                        className="group p-8 bg-charcoal/30 border border-white/5 rounded-[2rem] backdrop-blur-sm hover:border-gold/30 transition-all cursor-default"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                            <item.icon className="text-gold" size={28} />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-white mb-2">{item.label}</h3>
                        <p className="text-white/30 text-sm font-sans">{item.sub}</p>
                    </motion.div>
                ))}
            </section>
        </div>
    );
};

export default Home;
