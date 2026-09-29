export const metadata = {
  title: "Code Connect",
  description: "Rede social para Dev's",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
