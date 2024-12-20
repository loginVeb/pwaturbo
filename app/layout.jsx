import { generateViewport } from './viewport';
import "./globals.css";



export const metadata = {
  title: 'My awesome PWA app',
  description: 'Best PWA app in the world!',
  favicon: '/favicon.ico',
  manifest: "/manifest.json",
  twitterCard: "summary",
  twitterUrl: "https://yourdomain.com",
  twitterTitle: "My awesome PWA app",
  twitterDescription: "Best PWA app in the world!",
  twitterImage: "/icons/twitter.png",
  twitterCreator: "@DavidWShadow",
  ogType: "website",
  ogTitle: "My awesome PWA app",
  ogDescription: "Best PWA app in the world!",
  ogSiteName: "My awesome PWA app",
  ogUrl: "https://yourdomain.com",
  ogImage: "/icons/og.png",
  appleMobileWebAppCapable: true,

  // viewport: generateViewport(),

  appleTouchIcons: [
    { sizes: "180x180", href: "/ios/180.png" },
    { sizes: "192x192", href: "/ios/192.png" },
    { sizes: "512x512", href: "/ios/512.png" },
    { sizes: "1024x1024", href: "/ios/1024.png" },
    { sizes: "16x16", href: "/ios/16.png" },
    { sizes: "20x20", href: "/ios/20.png" },
    { sizes: "29x29", href: "/ios/29.png" },
    { sizes: "32x32", href: "/ios/32.png" },
    { sizes: "40x40", href: "/ios/40.png" },
    { sizes: "50x50", href: "/ios/50.png" },
    { sizes: "57x57", href: "/ios/57.png" },
    { sizes: "58x58", href: "/ios/58.png" },
    { sizes: "60x60", href: "/ios/60.png" },
    { sizes: "64x64", href: "/ios/64.png" },
    { sizes: "72x72", href: "/ios/72.png" },
    { sizes: "76x76", href: "/ios/76.png" },
    { sizes: "80x80", href: "/ios/80.png" },
    { sizes: "87x87", href: "/ios/87.png" },
    { sizes: "100x100", href: "/ios/100.png" },
    { sizes: "114x114", href: "/ios/114.png" },
    { sizes: "120x120", href: "/ios/120.png" },
    { sizes: "128x128", href: "/ios/128.png" },
    { sizes: "144x144", href: "/ios/144.png" },
    { sizes: "152x152", href: "/ios/152.png" },
    { sizes: "167x167", href: "/ios/167.png" },
  ],
  androidIcons: [
    { sizes: "512x512", href: "/android/android-launchericon-512-512.png" },
    { sizes: "192x192", href: "/android/android-launchericon-192-192.png" },
    { sizes: "144x144", href: "/android/android-launchericon-144-144.png" },
    { sizes: "96x96", href: "/android/android-launchericon-96-96.png" },
    { sizes: "72x72", href: "/android/android-launchericon-72-72.png" },
    { sizes: "48x48", href: "/android/android-launchericon-48-48.png" },
  ],
  windowsIcons: [
    { sizes: "71x71", href: "/windows11/SmallTile.scale-100.png" },
    { sizes: "89x89", href: "/windows11/SmallTile.scale-125.png" },
    { sizes: "107x107", href: "/windows11/SmallTile.scale-150.png" },
    { sizes: "142x142", href: "/windows11/SmallTile.scale-200.png" },
    { sizes: "284x284", href: "/windows11/SmallTile.scale-400.png" },
    { sizes: "150x150", href: "/windows11/Square150x150Logo.scale-100.png" },
    { sizes: "188x188", href: "/windows11/Square150x150Logo.scale-125.png" },
    { sizes: "225x225", href: "/windows11/Square150x150Logo.scale-150.png" },
    { sizes: "300x300", href: "/windows11/Square150x150Logo.scale-200.png" },
    { sizes: "600x600", href: "/windows11/Square150x150Logo.scale-400.png" },
    { sizes: "310x150", href: "/windows11/Wide310x150Logo.scale-100.png" },
    { sizes: "388x188", href: "/windows11/Wide310x150Logo.scale-125.png" },
    { sizes: "465x225", href: "/windows11/Wide310x150Logo.scale-150.png" },
    { sizes: "620x300", href: "/windows11/Wide310x150Logo.scale-200.png" },
    { sizes: "1240x600", href: "/windows11/Wide310x150Logo.scale-400.png" },
    { sizes: "310x310", href: "/windows11/LargeTile.scale-100.png" },
    { sizes: "388x388", href: "/windows11/LargeTile.scale-125.png" },
    { sizes: "465x465", href: "/windows11/LargeTile.scale-150.png" },
    { sizes: "620x620", href: "/windows11/LargeTile.scale-200.png" },
    { sizes: "1240x1240", href: "/windows11/LargeTile.scale-400.png" },
    { sizes: "44x44", href: "/windows11/Square44x44Logo.scale-100.png" },
    { sizes: "55x55", href: "/windows11/Square44x44Logo.scale-125.png" },
    { sizes: "66x66", href: "/windows11/Square44x44Logo.scale-150.png" },
    { sizes: "88x88", href: "/windows11/Square44x44Logo.scale-200.png" },
    { sizes: "176x176", href: "/windows11/Square44x44Logo.scale-400.png" },
    { sizes: "50x50", href: "/windows11/StoreLogo.scale-100.png" },
    { sizes: "63x63", href: "/windows11/StoreLogo.scale-125.png" },
    { sizes: "75x75", href: "/windows11/StoreLogo.scale-150.png" },
    { sizes: "100x100", href: "/windows11/StoreLogo.scale-200.png" },
    { sizes: "200x200", href: "/windows11/StoreLogo.scale-400.png" },
    { sizes: "620x300", href: "/windows11/SplashScreen.scale-100.png" },
    { sizes: "775x375", href: "/windows11/SplashScreen.scale-125.png" },
    { sizes: "930x450", href: "/windows11/SplashScreen.scale-150.png" },
    { sizes: "1240x600", href: "/windows11/SplashScreen.scale-200.png" },
    { sizes: "2480x1200", href: "/windows11/SplashScreen.scale-400.png" },
    { sizes: "16x16", href: "/windows11/Square44x44Logo.targetsize-16.png" },
    { sizes: "20x20", href: "/windows11/Square44x44Logo.targetsize-20.png" },
    { sizes: "24x24", href: "/windows11/Square44x44Logo.targetsize-24.png" },
    { sizes: "30x30", href: "/windows11/Square44x44Logo.targetsize-30.png" },
    { sizes: "32x32", href: "/windows11/Square44x44Logo.targetsize-32.png" },
    { sizes: "36x36", href: "/windows11/Square44x44Logo.targetsize-36.png" },
    { sizes: "40x40", href: "/windows11/Square44x44Logo.targetsize-40.png" },
    { sizes: "44x44", href: "/windows11/Square44x44Logo.targetsize-44.png" },
    { sizes: "48x48", href: "/windows11/Square44x44Logo.targetsize-48.png" },
    { sizes: "60x60", href: "/windows11/Square44x44Logo.targetsize-60.png" },
    { sizes: "64x64", href: "/windows11/Square44x44Logo.targetsize-64.png" },
    { sizes: "72x72", href: "/windows11/Square44x44Logo.targetsize-72.png" },
    { sizes: "80x80", href: "/windows11/Square44x44Logo.targetsize-80.png" },
    { sizes: "96x96", href: "/windows11/Square44x44Logo.targetsize-96.png" },
    { sizes: "256x256", href: "/windows11/Square44x44Logo.targetsize-256.png" },
    { sizes: "16x16", href: "/windows11/Square44x44Logo.altform-unplated_targetsize-16.png" },
    { sizes: "20x20", href: "/windows11/Square44x44Logo.altform-unplated_targetsize-20.png" },
    { sizes: "24x24", href: "/windows11/Square44x44Logo.altform-unplated_targetsize-24.png" },
    { sizes: "30x30", href: "/windows11/Square44x44Logo.altform-unplated_targetsize-30.png" },
    { sizes: "32x32", href: "/windows11/Square44x44Logo.altform-unplated_targetsize-32.png" },
    { sizes: "36x36", href: "/windows11/Square44x44Logo.altform-unplated_targetsize-36.png" },
    { sizes: "40x40", href: "/windows11/Square44x44Logo.altform-unplated_targetsize-40.png" },
    { sizes: "44x44", href: "/windows11/Square44x44Logo.altform-unplated_targetsize-44.png" },
    { sizes: "48x48", href: "/windows11/Square44x44Logo.altform-unplated_targetsize-48.png" },
    { sizes: "60x60", href: "/windows11/Square44x44Logo.altform-unplated_targetsize-60.png" },
    { sizes: "64x64", href: "/windows11/Square44x44Logo.altform-unplated_targetsize-64.png" },
    { sizes: "72x72", href: "/windows11/Square44x44Logo.altform-unplated_targetsize-72.png" },
    { sizes: "80x80", href: "/windows11/Square44x44Logo.altform-unplated_targetsize-80.png" },
    { sizes: "96x96", href: "/windows11/Square44x44Logo.altform-unplated_targetsize-96.png" },
    { sizes: "256x256", href: "/windows11/Square44x44Logo.altform-unplated_targetsize-256.png" },
  ],
  screenshots: [
    {
      src: "/screenshots/wide_screenshot_1.png",
      type: "image/png",
      platform: "wide",
      sizes: "1200x800"
    },
    {
      src: "/screenshots/wide_screenshot_2.png",
      type: "image/png",
      platform: "wide",
      sizes: "2560x1600",
      form_factor: "wide"
    },
    {
      src: "/screenshots/wide_screenshot_3.png",
      type: "image/png",
      platform: "wide",
      sizes: "1920x1200",
      form_factor: "wide"
    }
  ],
  appleStartupImages: [
    { sizes: "2048x2732", href: "/icons/iPhone_16_Pro_Max_landscape.png" },
    { sizes: "1668x2224", href: "/icons/iPhone_16_Pro_landscape.png" },
    { sizes: "1536x2048", href: "/icons/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png" },
    { sizes: "1125x2436", href: "/icons/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png" },
    { sizes: "1242x2208", href: "/icons/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png" },
    { sizes: "750x1334", href: "/icons/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png" },
    { sizes: "640x1136", href: "/icons/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png" },
    { sizes: "414x896", href: "/icons/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png" },
    { sizes: "414x896", href: "/icons/iPhone_11__iPhone_XR_landscape.png" },
    { sizes: "414x736", href: "/icons/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png" },
    { sizes: "375x667", href: "/icons/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png" },
    { sizes: "320x568", href: "/icons/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png" },
    { sizes: "1032x1376", href: "/icons/13__iPad_Pro_M4_landscape.png" },
    { sizes: "1024x1366", href: "/icons/12.9__iPad_Pro_landscape.png" },
    { sizes: "834x1210", href: "/icons/11__iPad_Pro_M4_landscape.png" },
    { sizes: "834x1194", href: "/icons/11__iPad_Pro__10.5__iPad_Pro_landscape.png" },
    { sizes: "820x1180", href: "/icons/10.9__iPad_Air_landscape.png" },
    { sizes: "834x1112", href: "/icons/10.5__iPad_Air_landscape.png" },
    { sizes: "810x1080", href: "/icons/10.2__iPad_landscape.png" },
    { sizes: "768x1024", href: "/icons/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png" },
    { sizes: "744x1133", href: "/icons/8.3__iPad_Mini_landscape.png" },
  ]
};

export const viewport = generateViewport();
export default function RootLayout({ children }) {
  return (

    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-title" content="My awesome PWA app" />
        <meta name="mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/ios/180.png" />
      </head>
      <body >
        {children}
      </body>
    </html>

  );
}
