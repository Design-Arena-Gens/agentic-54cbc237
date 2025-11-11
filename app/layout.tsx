export const metadata = {
  title: "Eco Vibe Bottles ? Business Plan",
  description: "Professional business plan deck with download as PPTX",
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
