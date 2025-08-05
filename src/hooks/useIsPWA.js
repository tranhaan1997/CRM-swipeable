// hooks/useIsPWA.js
import { useEffect, useState } from "react";

export function useIsPWA() {
  const [isPWA, setIsPWA] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Điều kiện 1: Là Android hoặc iPhone (không cần là PWA)
    const isMobileDevice =
      /Android/i.test(userAgent) || /iPhone/i.test(userAgent);

    const checkPWA =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true; // for iOS Safari

    // Nếu một trong hai điều kiện đúng → UI dạng app
    setIsPWA(isMobileDevice || checkPWA);
    setIsReady(true);
  }, []);

  return { isPWA, isReady };
}
