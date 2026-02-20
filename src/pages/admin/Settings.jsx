import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { User, Shield, Bell, Save, Globe, Moon } from "lucide-react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Settings = () => {
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        displayName: currentUser?.displayName || "",
        email: currentUser?.email || "",
        restaurantName: "Nivedyam",
        address: "Nagpur, Civil Lines",
        notificationEmail: true,
        orderAlerts: true,
    });

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h2 className="text-2xl font-bold">Admin Settings</h2>
                <p className="text-white/40 text-sm">Manage terminal configurations and profile</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <nav className="space-y-2">
                    {[
                        { name: "General", icon: Globe, active: true },
                        { name: "Security", icon: Shield },
                        { name: "Notifications", icon: Bell },
                        { name: "Appearance", icon: Moon },
                    ].map((item) => (
                        <button
                            key={item.name}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm transition-all ${item.active ? "bg-white/5 text-white font-bold" : "text-white/30 hover:bg-white/5"
                                }`}
                        >
                            <item.icon size={18} />
                            <span>{item.name}</span>
                        </button>
                    ))}
                </nav>

                <div className="md:col-span-2 space-y-6">
                    <Card className="border-white/5 bg-charcoal/30">
                        <CardHeader className="border-b border-white/5">
                            <h3 className="text-lg font-bold flex items-center">
                                <User size={18} className="mr-2 text-gold" /> Profile Information
                            </h3>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center overflow-hidden">
                                    {currentUser?.photoURL ? (
                                        <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={32} className="text-gold" />
                                    )}
                                </div>
                                <Button variant="outline" size="sm">Change Photo</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Full Name" value={formData.displayName} onChange={(e) => setFormData({ ...formData, displayName: e.target.value })} className="bg-white/5 border-white/10" />
                                <Input label="Email Address" value={formData.email} disabled className="bg-white/5 border-white/10 opacity-50 cursor-not-allowed" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-white/5 bg-charcoal/30">
                        <CardHeader className="border-b border-white/5">
                            <h3 className="text-lg font-bold flex items-center">
                                <Globe size={18} className="mr-2 text-gold" /> Restaurant Details
                            </h3>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <Input label="Business Name" value={formData.restaurantName} onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })} className="bg-white/5 border-white/10" />
                            <Input label="Physical Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="bg-white/5 border-white/10" />
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button className="rounded-xl px-10">
                            <Save size={18} className="mr-2" /> Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
