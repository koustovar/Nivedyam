import { cn } from "./Button";

const Input = ({ className, label, error, ...props }) => {
    return (
        <div className="w-full space-y-2">
            {label && (
                <label className="text-sm font-medium text-white/70 ml-1">
                    {label}
                </label>
            )}
            <input
                className={cn(
                    "w-full bg-charcoal border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all",
                    error && "border-red-500/50 focus:ring-red-500/30",
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-xs text-red-500/80 ml-1">{error}</p>
            )}
        </div>
    );
};

export default Input;
