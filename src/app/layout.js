"use client"; 
import { SessionProvider } from 'next-auth/react';
import localFont from "next/font/local";
import "./globals.css";




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        
      >
         <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
