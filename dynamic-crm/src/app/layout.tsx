import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
    title: "Dynamic CRM",
    description: "Dynamic CRM",
};

interface Props {
    children: ReactNode
}

export default async function RootLayout({ children }: Readonly<Props>) {
    return (
        <html lang="en">
        <body>
        <div className={'flex flex-col justify-start items-center h-lvh p-20'}>
            <div className={'flex flex-col justify-start items-stretch max-w-screen-md min-w-96 w-full gap-4'}>
                {children}
            </div>
        </div>
        </body>
        </html>
    );
}
