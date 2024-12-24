import { generateViewport } from './viewport';
import "./globals.css";

export const metadata = {
  title: 'timing',
  description: 'Приложение для управления расписанием',
  appleMobileWebAppCapable: true,
};

export const viewport = generateViewport();

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-title" content="timing" />
        <meta name="mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/ios/180.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/ios/180.png" />
        <link rel="apple-touch-startup-image" href="/ios/startup.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="timing" />
        <meta name="theme-color" content="#FFFFFF" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}