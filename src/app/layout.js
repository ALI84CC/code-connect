import { Prompt } from "next/font/google";
import { Aside } from "@/components/Aside";
import "./globals.css";

export const metadata = {
  title: "Code Connect",
  description: "Rede social para Dev's",
};

const prompt = Prompt({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={prompt.className}>
      <body>
        <div className="app-container">
          <div>
            <Aside />
          </div>
          <main className="main-content">
            {/* O Next.js vai injetar a sua page.js exatamente aqui dentro */}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
