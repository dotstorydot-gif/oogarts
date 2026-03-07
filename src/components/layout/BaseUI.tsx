import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    glass?: boolean;
    variant?: 'default' | 'flat' | 'elevated';
}

export const Card = ({ className, glass = true, variant = 'default', ...props }: CardProps) => (
    <div
        className={cn(
            "rounded-[24px] transition-all duration-300",
            glass && "backdrop-blur-xl border border-white/20",
            variant === 'default' && "bg-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]",
            variant === 'flat' && "bg-slate-50 border-slate-100",
            variant === 'elevated' && "bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)]",
            className
        )}
        {...props}
    />
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'glass';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
    className,
    variant = 'primary',
    size = 'md',
    ...props
}: ButtonProps) => {
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-slate-900 shadow-[0_10px_20px_-5px_rgba(79,70,229,0.3)] hover:shadow-indigo-200",
        secondary: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_10px_20px_-5px_rgba(16,185,129,0.3)]",
        ghost: "hover:bg-slate-50 text-slate-500 hover:text-indigo-600",
        outline: "border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 bg-transparent",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
    };

    const sizes = {
        sm: "px-4 py-2 text-xs font-bold uppercase tracking-wider",
        md: "px-6 py-3 text-sm font-bold tracking-tight",
        lg: "px-8 py-4 text-base font-black tracking-tight"
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 font-sans",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
};

export const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        className={cn(
            "w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all placeholder:text-slate-400",
            className
        )}
        {...props}
    />
);
