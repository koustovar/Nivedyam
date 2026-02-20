import { cn } from "./Button";

export const Card = ({ className, children, ...props }) => {
    return (
        <div
            className={cn(
                "bg-charcoal/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden shadow-xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ className, children, ...props }) => (
    <div className={cn("p-6 pb-4", className)} {...props}>
        {children}
    </div>
);

export const CardContent = ({ className, children, ...props }) => (
    <div className={cn("p-6 pt-0", className)} {...props}>
        {children}
    </div>
);

export const CardFooter = ({ className, children, ...props }) => (
    <div className={cn("p-6 pt-0 flex items-center", className)} {...props}>
        {children}
    </div>
);
