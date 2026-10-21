import {
  Raleway,
  Pirata_One,
  Grenze_Gotisch,
} from "next/font/google";
import "../styles/globals.css";

import { UserProvider } from "@/context/UserContext";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "500", "900"],
});

const pirata = Pirata_One({
  variable: "--font-pirata",
  subsets: ["latin"],
  weight: ["400"],
});

const grenze = Grenze_Gotisch({
  variable: "--font-grenze",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata = {
  title: "CofBook",
  description: "Tiệm cà phê sách CofBook",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${pirata.variable} ${grenze.variable} antialiased`}
      >
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
