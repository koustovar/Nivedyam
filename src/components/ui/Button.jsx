import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge tailwind classes
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Button = ({
    className,
    variant = "primary",
    size = "md",
    children,
    ...props
}) => {
    const variants = {
        primary: "bg-saffron text-white hover:bg-saffron/90 shadow-[0_4px_20px_rgba(255,122,0,0.3)]",
        secondary: "bg-charcoal text-white hover:bg-muted border border-white/10",
        ghost: "bg-transparent text-white hover:bg-white/5",
        outline: "bg-transparent border border-gold/50 text-gold hover:bg-gold/10",
        gold: "bg-gradient-to-r from-gold to-[#a68b3d] text-background font-bold hover:brightness-110 shadow-lg",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-3",
        lg: "px-8 py-4 text-lg",
        icon: "p-2",
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
