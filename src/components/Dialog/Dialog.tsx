import {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
} from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/Button";
import { XIcon } from "lucide-react";

const base = "w-max";
const overlay =
    "fixed top-0 left-0 bg-black/80 w-full h-full z-10 transition-opacity duration-300 ease-out";
const content =
    "fixed top-1/2 left-1/2 bg-white -translate-x-1/2 -translate-y-1/2 h-max max-w-4xl w-full overflow-hidden rounded-xl transition-[margin] duration-300 ease-out z-10";
const header =
    "w-full flex items-center justify-between p-4 border-b border-b-zinc-200";
const title = "text-xl leading-normal font-semibold text-zinc-900";
const description = "text-sm leading-normal font-normal text-zinc-600";
const body = "w-full p-4 text-sm leading-normal font-normal text-zinc-900";
const footer = "p-4 flex justify-end gap-2";

interface DialogContextPropsType {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DialogContext = createContext<DialogContextPropsType | undefined>(
    undefined
);

const useDialog = () => {
    const context = useContext(DialogContext);

    if (!context)
        throw new Error("USE_DIALOG must be used with in a DIALOG_PROVIDER!");

    return context;
};

interface DialogPropsType {
    children?: React.ReactNode;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Dialog: FC<DialogPropsType> = ({ children, isOpen, setIsOpen }) => {
    return (
        <DialogContext.Provider value={{ isOpen, setIsOpen }}>
            <div className={base}>{children}</div>
        </DialogContext.Provider>
    );
};

interface DialogTriggerPropsType {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline";
    disabled?: boolean;
    className?: string;
}

const DialogTrigger: FC<DialogTriggerPropsType> = ({
    children,
    variant,
    disabled,
    className,
}) => {
    const { setIsOpen } = useDialog();

    return (
        <Button
            type="button"
            variant={variant}
            className={className}
            disabled={disabled}
            onClick={() => setIsOpen(true)}
        >
            {children}
        </Button>
    );
};

interface DialogCommonPropsType {
    children?: React.ReactNode;
    className?: string;
}

const DialogContent: FC<DialogCommonPropsType> = ({ children, className }) => {
    const { isOpen, setIsOpen } = useDialog();

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClick = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [ref]);
    return (
        <div className={cn(overlay, isOpen ? "scale-100" : "scale-0")}>
            <div
                ref={ref}
                className={cn(
                    content,
                    isOpen ? "scale-100" : "scale-0",
                    className ?? ""
                )}
            >
                {children}
            </div>
        </div>
    );
};

const DialogHeader: FC<DialogCommonPropsType> = ({ children, className }) => {
    return (
        <div className={cn(header, className ?? "")}>
            <div>{children}</div>
            <DialogClose>
                <Button type="button" variant="ghost">
                    <XIcon className="w-4 h-4" />
                </Button>
            </DialogClose>
        </div>
    );
};

const DialogTitle: FC<DialogCommonPropsType> = ({ children, className }) => {
    return <div className={cn(title, className ?? "")}>{children}</div>;
};

const DialogDescription: FC<DialogCommonPropsType> = ({
    children,
    className,
}) => {
    return <p className={cn(description, className ?? "")}>{children}</p>;
};

const DialogBody: FC<DialogCommonPropsType> = ({ children, className }) => {
    return <div className={cn(body, className ?? "")}>{children}</div>;
};

const DialogFooter: FC<DialogCommonPropsType> = ({ children, className }) => {
    return <div className={cn(footer, className ?? "")}>{children}</div>;
};

const DialogClose: FC<DialogCommonPropsType> = ({ children }) => {
    const { setIsOpen } = useDialog();
    return <div onClick={() => setIsOpen(false)}>{children}</div>;
};

export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogBody,
    DialogFooter,
    DialogClose,
};