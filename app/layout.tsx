import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import ClientLayoutWrapper from './components/ClientLayoutWrapper';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Interview AI",
  description: "AI-powered interview platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#000000',
              },
            }}
          >
            <ClientLayoutWrapper>
            {children}
            </ClientLayoutWrapper>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
