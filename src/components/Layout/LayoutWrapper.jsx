import MainLayout from "./MainLayout";
import MainLayoutApp from "./MainLayoutApp";
import { useIsPWA } from "~/hooks/useIsPWA";
import Preloader from "~/components/Common/Preloader";

function LayoutWrapper({ children }) {
  const { isPWA, isReady } = useIsPWA();
  
  if (!isReady) return <Preloader />;

  return (
    <>
      {/* Desktop/Browser thông thường */}
      {!isPWA && (
        <MainLayout>
          {children}
        </MainLayout>
      )}
      {/* Mobile/PWA */}
      {isPWA && (
        <MainLayoutApp>
          {children}
        </MainLayoutApp>
      )}
    </>
  );
}

export default LayoutWrapper;