import { FC, MouseEventHandler, ReactNode } from "react";

import { cn } from "../../lib/cn";

const base =
    "border rounded-md inline-flex items-center gap-1 text-sm leading-none font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-70";

const variants = {
    primary:
        "border-zinc-900 lg:hover:border-zinc-800 bg-zinc-900 lg:hover:bg-zinc-800 text-white font-normal",
    secondary:
        "border-zinc-100 lg:hover:border-zinc-200 bg-zinc-100 lg:hover:bg-zinc-200 text-zinc-900",
    ghost:
        "border-transparent lg:hover:border-zinc-100 bg-transparent lg:hover:bg-zinc-100 text-zinc-900",
    destructive:
        "border-red-600 lg:hover:border-red-500 bg-red-600 lg:hover:bg-red-500 text-white font-normal",
    link: "border-transparent bg-transparent text-zinc-900 lg:hover:underline",
    outline: "border-zinc-200 bg-transparent lg:hover:bg-zinc-100",
};

const sizes = {
    small: "h-8 w-max px-3",
    regular: "h-10 w-max px-4",
    icon: "h-8 w-8 px-1 py-1 justify-center",
};

const buttonVariants = (
    variant:
        | "primary"
        | "secondary"
        | "ghost"
        | "destructive"
        | "link"
        | "outline" = "primary",
    size: "small" | "regular" | "icon" = "regular"
): string => cn(base, sizes[size], variants[variant]);

interface ButtonPropsType {
    children?: ReactNode;
    type?: "submit" | "reset" | "button";
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
    variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link"
    | "outline";
    size?: "small" | "regular" | "icon";
}

const Button: FC<ButtonPropsType> = ({
    children,
    type,
    onClick,
    disabled,
    className,
    variant,
    size,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn(buttonVariants(variant, size), className ?? "")}
        >
            {children}
        </button>
    );
};

export type { ButtonPropsType };

export { Button, buttonVariants };