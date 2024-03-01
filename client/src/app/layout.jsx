/** @format */
import "./globals.css";
import { Inter } from "next/font/google";
import { StoreProvider } from "@/redux/store";
import ProtectedPage from "@/routes/protected-routes";
import AuthProvider from "@/routes/auth-provider";
import { Providers } from "../components/chakra-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Etix",
  description: "The best place to buy e-ticket",
};
export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          {/* <link rel="shortcut icon" href="fav.png" type="image/x-icon" /> */}
        </head>
        <body className={inter.className}>
          <Providers>
            <AuthProvider>
              <ProtectedPage>{children}</ProtectedPage>
            </AuthProvider>
          </Providers>
        </body>
      </html>
    </StoreProvider>
  );
}
