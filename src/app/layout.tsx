import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Wrapper from "./components/wraper";
import Nav from "./components/nav";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jungle Cats Store",
  description: "Get notified without checking their wallet every time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Wrapper>
          <div>
            <Nav />
            {children}
          </div>
        </Wrapper>
      </body>
    </html>
  );
}
