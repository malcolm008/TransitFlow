import type { Metadata } from "next";
import { Outfit, Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import "./styles/globals.css";
import { Providers } from "./providers";


const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

const barlowCondensed = Barlow_Condensed({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-barlow-condensed",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-jetbrains-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "TransitFlow",
        template: "%s | TransitFlow",
    },
    description: "School & University Transport Management System",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${outfit.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}