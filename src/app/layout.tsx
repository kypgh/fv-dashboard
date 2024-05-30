"use client";

import { ABeeZee } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import { ThemeProvider, useTheme } from "@/utils/hooks/useTheme";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProgressLoader } from "nextjs-progressloader";

const inter = ABeeZee({ weight: "400", subsets: ["latin-ext"] });

const RouterLoader = () => {
  const { theme } = useTheme();
  return <ProgressLoader color={theme.accent} />;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <RouterLoader />
              {children}
            </QueryClientProvider>
            <div id="tooltipsContainer"></div>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
