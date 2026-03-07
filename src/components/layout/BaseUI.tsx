import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    glass?: boolean;
}

export const Card = ({ className, glass = true, ...props }: CardProps) => (
    <div
        className={cn(
            "rounded-[32px] overflow-hidden",
            glass ? "glass-card p-6" : "bg-white p-6 shadow-sm",
            className
        )}
        {...props}
    />
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
    className,
    variant = 'primary',
    size = 'md',
    ...props
}: ButtonProps) => {
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200",
        secondary: "bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-100",
        ghost: "hover:bg-slate-100 text-slate-600",
        outline: "border-2 border-slate-200 hover:border-indigo-600 hover:text-indigo-600"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg font-semibold"
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-2xl transition-all active:scale-95 disabled:opacity-50",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
};
