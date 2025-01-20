import { ChevronDownIcon } from "lucide-react";

import { cn } from '@/lib/cn';
import {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { Button } from "@/components/Button";

const base = "w-max relative";
const baseT = "w-full px-3 justify-between";
const baseL =
    "absolute top-[110%] left-0 z-20 min-w-full w-max max-h-[60vh] h-max overflow-y-auto p-1 border border-zinc-200 rounded-md bg-white flex flex-col gap-1 scale-y-0 transition-transform duration-200 origin-top";
const baseI = "w-full px-2 rounded";

interface SelectContextPropsType {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    fallbackValue: string;
    setFallbackValue: Dispatch<SetStateAction<string>>;
    onValueChange?: (value: string) => void;
}

const SelectContext = createContext<SelectContextPropsType | undefined>(
    undefined
);

const useSelect = () => {
    const context = useContext(SelectContext);

    if (!context)
        throw new Error("USE_SELECT must be used with in a SELECT_PROVIDER!");

    return context;
};

interface SelectPropsType {
    children: ReactNode;
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
}

const Select: FC<SelectPropsType> = ({
    children,
    value,
    className,
    onValueChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const [fallbackValue, setFallbackValue] = useState<string>(value ?? "");

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
        <SelectContext.Provider
            value={{
                isOpen,
                setIsOpen,
                fallbackValue,
                setFallbackValue,
                onValueChange,
            }}
        >
            <div ref={ref} className={cn(base, className ?? "")}>
                {children}
            </div>
        </SelectContext.Provider>
    );
};

interface SelectTriggerPropsType {
    children?: ReactNode;
    className?: string;
}

const SelectTrigger: FC<SelectTriggerPropsType> = ({ children, className }) => {
    const { fallbackValue, setIsOpen } = useSelect();

    const handleOnToggleIsOpen = () => setIsOpen((prev) => !prev);

    return (
        <Button
            type="button"
            variant="outline"
            onClick={handleOnToggleIsOpen}
            className={cn(baseT, className ?? "")}
        >
            {fallbackValue?.toString().trim() ? fallbackValue : children}
            <ChevronDownIcon className="w-4 h-4" />
        </Button>
    );
};

interface SelectListPropsType {
    children?: ReactNode;
    className?: string;
}

const SelectList: FC<SelectListPropsType> = ({ children, className }) => {
    const { isOpen } = useSelect();

    return (
        <div className={cn(baseL, className ?? "", isOpen ? "scale-y-100" : "")}>
            {children}
        </div>
    );
};

interface SelectItemPropsType {
    children?: ReactNode;
    disabled?: boolean;
    className?: string;
}

const SelectItem: FC<SelectItemPropsType> = ({
    children,
    disabled,
    className,
}) => {
    const { fallbackValue, setIsOpen, setFallbackValue, onValueChange } =
        useSelect();

    const handleSelectOption = () => {
        setFallbackValue(children ? children?.toString() : "");

        onValueChange && onValueChange(children?.toString() ?? "");

        setIsOpen(false);
    };

    return (
        <Button
            type="button"
            variant={
                children && children.toString() === fallbackValue
                    ? "secondary"
                    : "ghost"
            }
            size="small"
            onClick={handleSelectOption}
            disabled={disabled}
            className={cn(baseI, className ?? "")}
        >
            {children}
        </Button>
    );
};

export { Select, SelectTrigger, SelectList, SelectItem };