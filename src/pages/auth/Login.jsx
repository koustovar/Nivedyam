import { useState } from "react";
import { Eye, EyeOff, Lock, Loader2, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const location = useLocation();
    const { login, loginWithGoogle } = useAuth();

    // Get the page the user was trying to access before being redirected
    const from = location.state?.from?.pathname || "/profile";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(formData.email, formData.password);
            navigate(from, { replace: true });
        } catch (err) {
            console.error("Login error:", err);
            if (err.code === "auth/invalid-credential") {
                setError("Invalid email or password.");
            } else {
                setError(err.message || "An error occurred during login.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError("");
        try {
            await loginWithGoogle();
            navigate(from, { replace: true });
        } catch (err) {
            console.error("Google login error:", err);
            setError("Google sign-in failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background mandala-pattern">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="border-gold/20 shadow-2xl shadow-gold/5 backdrop-blur-sm bg-charcoal/80">
                    <CardHeader className="text-center pb-8 border-b border-white/5">
                        <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-saffron/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gold/20 shadow-inner">
                            <span className="text-3xl font-serif font-black text-gold">N</span>
                        </div>
                        <h1 className="text-4xl font-serif font-bold text-white mb-2">Welcome</h1>
                        <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase">Sign in to Nivedyam</p>
                    </CardHeader>

                    <CardContent className="pt-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <Input
                                    label="Email Id"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="pl-12 h-14 bg-charcoal/50 border-white/10 text-white placeholder:text-white/20"
                                    required
                                />
                                <Mail className="absolute left-4 top-[3.5rem] text-gold/50" size={20} />
                            </div>

                            <div className="relative">
                                <Input
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="pl-12 pr-12 h-14 bg-charcoal/50 border-white/10 text-white placeholder:text-white/20"
                                    required
                                />
                                <Lock className="absolute left-4 top-[3.5rem] text-gold/50" size={20} />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-[3.5rem] text-white/30 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl"
                                >
                                    <p className="text-red-400 text-sm text-center font-medium">
                                        {error}
                                    </p>
                                </motion.div>
                            )}

                            <Button
                                type="submit"
                                variant="gold"
                                className="w-full h-14 rounded-2xl shadow-xl shadow-gold/10"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin mr-2" size={24} />
                                ) : (
                                    <span className="text-lg font-bold">Continue</span>
                                )}
                            </Button>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/5"></div>
                                </div>
                                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
                                    <span className="bg-[#1a1a1a] px-4 text-white/20 font-bold">Social Access</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center space-x-3 hover:bg-white/10 active:scale-[0.98] transition-all group"
                                disabled={loading}
                            >
                                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-white font-bold">Google account</span>
                            </button>
                        </form>
                    </CardContent>
                </Card>

                <p className="text-center mt-12 text-white/10 text-[10px] font-bold tracking-[0.2em] uppercase">
                    &copy; 2026 Nivedyam Hospitality Group
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
