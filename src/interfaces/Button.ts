import type { ReactNode } from "react";

export interface ButtonInterface {
    ButtonType?: "button" | "submit" | "reset",
    ButtonClassName: string,
    ButtonText: string,
    children?: ReactNode,
    ButonOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}