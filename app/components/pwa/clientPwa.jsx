"use client";

import { useEffect } from 'react';

function ClientPwa() {
  useEffect(() => {
    let beforeInstallEvent;

    const handleBeforeInstallPrompt = () => {
      beforeInstallEvent.preventDefault();
      beforeInstallEvent.showInstallPrompt();
    };

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      beforeInstallEvent = event;
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return null;
}

export default ClientPwa;