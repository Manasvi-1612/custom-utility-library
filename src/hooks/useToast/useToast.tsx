import { FC, useState } from "react"
import { cn } from "@/lib/cn"
import { X } from "lucide-react"

const types = {
    primary: "border-zinc-900 lg:hover:border-zinc-800 bg-zinc-900 lg:hover:bg-zinc-800",
    warning: "border-yellow-600 lg:hover:border-yellow-500 bg-yellow-600 lg:hover:bg-yellow-500",
    destructive: "border-red-600 lg:hover:border-red-500 bg-red-600 lg:hover:bg-red-500",
    success: "border-green-600 lg:hover:border-green-500 bg-green-600 lg:hover:bg-green-500",
} 


interface ToastProps {
    id?: string;
    type?: 'primary' | 'warning' | 'destructive' | 'success'
    title: React.ReactNode
    description?: React.ReactNode
    className?: string
    onClose?: () => void
    duration?: number
}

const Toast: FC<ToastProps & { onClose: (id: string) => void }> = ({
    id = '',
    type = 'primary',
    title,
    description,
    className,
    onClose
}) => {
    return (
        <div
            className={cn(
                types[type],
                'relative p-4 mb-2 rounded-md shadow-md text-white font-normal gap-4 w-96 group',
                'animate-slideIn transition-transform duration-300 ease-out transform',
                className ?? ''
            )}
        >
            <div className="flex flex-col">
                <span className="font-bold">{title}</span>
                {description}
            </div>

            <button
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose(id);
                }}
            >
                <X className="size-4 hover:scale-110 transition-transform duration-200" />
            </button>
        </div>
    )
}

const positions = {
    "top-right": 'fixed top-5 right-5 flex flex-col-reverse',
    "top-left": 'fixed top-5 left-5 flex flex-col-reverse',
    "bottom-right": 'fixed bottom-5 right-5 flex flex-col',
    "bottom-left": 'fixed bottom-5 left-5 flex flex-col'
}

export const useToast = (position: keyof typeof positions = 'top-right') => {
    const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([])

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
    }

    const triggerToast = (toastProps: ToastProps) => {
        const id = Math.random().toString(36).substr(2, 9)

        const newToast = {
            ...toastProps,
            id
        }

        setToasts(prev => [...prev, newToast])

        setTimeout(() => {
            removeToast(id);
        }, toastProps.duration ?? 3000)

    }

    const ToastComponent = toasts.length > 0 ? (
        <div className={positions[position]}>
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    {...toast}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    ) : null

    return { ToastComponent, triggerToast }
}