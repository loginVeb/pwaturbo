"use client";
import { useEffect } from 'react';

function ClientPwa() {
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      event.showInstallPrompt();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return null;
}

export default ClientPwa;