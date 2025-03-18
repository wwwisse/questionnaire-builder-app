import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { connectDb } from '@/utils/middleware/connect';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
 variable: '--font-inter',
 subsets: ['latin'],
 style: ['normal'],
});

export const metadata: Metadata = {
 title: 'Questionnaire Builder App',
 description: 'By Illya @www1se',
};

export default async function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 await connectDb();
 return (
  <html lang='en'>
   <body className={`${inter.variable} antialiased`}>
    <div className='flex flex-col min-h-screen'>
     <Header />
     <main className='container flex-grow'>{children}</main>
     <Footer />
    </div>
   </body>
  </html>
 );
}
