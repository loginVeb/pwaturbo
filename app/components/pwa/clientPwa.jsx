'use client';
import { useEffect, useState } from 'react';

function ClientPwa({styles}) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        const { outcome } = await deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${result.outcome}`);
        setDeferredPrompt(null);
        setShowInstallButton(false);
      } catch (error) {
        console.error('Error during installation:', error);
      }
    }
  };

  const handleCloseClick = () => {
    setShowInstallButton(false);
  };

  return (
    <div className={styles.clientPwa}>
      {showInstallButton && (
        <div className={styles.installContainer}>
          <button onClick={handleInstallClick} className={styles.installButton}>
            Установить приложение
          </button>
          <button onClick={handleCloseClick} className={styles.closeButton}>
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default ClientPwa;