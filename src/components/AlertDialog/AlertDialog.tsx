import {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/Button";

const base = "w-max";
const overlay =
    "fixed top-0 left-0 bg-black/80 w-full h-full z-10 transition-opacity duration-300 ease-out";
const content =
    "fixed top-1/2 left-1/2 bg-white -translate-x-1/2 -translate-y-1/2 h-max max-w-4xl w-full overflow-hidden rounded-xl transition-[margin] duration-300 ease-out z-10";
const header = "w-full p-4";
const title = "text-xl leading-normal font-semibold text-zinc-900";
const description = "text-sm leading-normal font-normal text-zinc-600";
const body = "w-full mb-4 p-4 text-sm leading-normal font-normal text-zinc-900";
const footer = "w-full p-4 flex items-center justify-end gap-2";

interface AlertDialogContextPropsType {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AlertDialogContext = createContext<
    AlertDialogContextPropsType | undefined
>(undefined);

const useAlertDialog = () => {
    const context = useContext(AlertDialogContext);

    if (!context)
        throw new Error(
            "USE_ALERT_DIALOG must be used with in a ALERT_DIALOG_PROVIDER!"
        );

    return context;
};

interface AlertDialogPropsType {
    children?: React.ReactNode;
    className?: string;
}

const AlertDialog: FC<AlertDialogPropsType> = ({ children, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <AlertDialogContext.Provider value={{ isOpen, setIsOpen }}>
            <div className={cn(base, className ?? "")}>{children}</div>
        </AlertDialogContext.Provider>
    );
};

interface AlertDialogTriggerPropsType {
    children?: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost" | "outline" | "destructive";
    disabled?: boolean;
    className?: string;
}

const AlertDialogTrigger: FC<AlertDialogTriggerPropsType> = ({
    children,
    variant,
    disabled,
    className,
}) => {
    const { setIsOpen } = useAlertDialog();

    return (
        <Button
            type="button"
            disabled={disabled}
            className={className}
            onClick={() => setIsOpen(true)}
            variant={variant}
        >
            {children}
        </Button>
    );
};

interface AlertDialogCommonPropsType {
    children?: React.ReactNode;
    className?: string;
}

const AlertDialogContent: FC<AlertDialogCommonPropsType> = ({
    children,
    className,
}) => {
    const { isOpen } = useAlertDialog();

    return (
        <div
            className={cn(
                overlay,
                isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
            )}
        >
            <div
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

const AlertDialogHeader: FC<AlertDialogCommonPropsType> = ({
    children,
    className,
}) => {
    return <div className={cn(header, className ?? "")}>{children}</div>;
};

const AlertDialogTitle: FC<AlertDialogCommonPropsType> = ({
    children,
    className,
}) => {
    return <h2 className={cn(title, className ?? "")}>{children}</h2>;
};

const AlertDialogDescription: FC<AlertDialogCommonPropsType> = ({
    children,
    className,
}) => {
    return <p className={cn(description, className ?? "")}>{children}</p>;
};

const AlertDialogBody: FC<AlertDialogCommonPropsType> = ({
    children,
    className,
}) => {
    return <div className={cn(body, className ?? "")}>{children}</div>;
};

const AlertDialogFooter: FC<AlertDialogCommonPropsType> = ({
    children,
    className,
}) => {
    return <div className={cn(footer, className ?? "")}>{children}</div>;
};

interface AlertDialogSubmitPropsType {
    children?: React.ReactNode;
    variant?: "primary" | "destructive";
    onAlertSubmit?: () => void | Promise<void>;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit";
}

const AlertDialogSubmit: FC<AlertDialogSubmitPropsType> = ({
    children,
    variant,
    onAlertSubmit,
    disabled,
    className,
    type,
}) => {
    const { setIsOpen } = useAlertDialog();
    const handleOnAlertSubmit = async () => {
        onAlertSubmit && (await onAlertSubmit());
        setIsOpen(false);
    };

    return (
        <Button
            type={type}
            disabled={disabled}
            variant={variant}
            className={className}
            onClick={handleOnAlertSubmit}
        >
            {children}
        </Button>
    );
};

interface AlertDialogCancelPropsType {
    children?: React.ReactNode;
    variant?: "secondary" | "ghost" | "outline";
    disabled?: boolean;
    className?: string;
}

const AlertDialogCancel: FC<AlertDialogCancelPropsType> = ({
    children,
    variant,
    disabled,
    className,
}) => {
    const { setIsOpen } = useAlertDialog();

    const handleSetIsOpen = (): void => setIsOpen(false);

    return (
        <Button
            type="button"
            variant={variant ?? "outline"}
            onClick={handleSetIsOpen}
            className={className}
            disabled={disabled}
        >
            {children}
        </Button>
    );
};

export {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogSubmit,
    AlertDialogTrigger,
};