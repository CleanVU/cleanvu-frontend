import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { TabOptions } from "../interfaces/user.interface";

// Navigation context types
interface NavigationContextType {
  currentTab: TabOptions | null;
  setCurrentTab: (_: TabOptions | null) => void;
}

// Create the context for the Navigation
const NavigationContext = createContext<NavigationContextType>({
  currentTab: null,
  setCurrentTab: (_: TabOptions | null) => {},
});

// Create the provider for the Navigation context
export const NavigationProvider = ({ children }: PropsWithChildren) => {
  const [currentTab, setCurrentTab] = useState<TabOptions | null>(null);

  return (
    <NavigationContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </NavigationContext.Provider>
  );
};

/**
 * A hook to use the navigation context
 * @returns {NavigationContextType} The navigation context
 * @throws An error if the hook is not used within a NavigationProvider
 * @example
 * const { currentTab, setCurrentTab } = useNavigationContext();
 */
export const useNavigationContext = () => {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error(
      "useNavigationProvider must be used within a NavigationProvider",
    );
  }

  return context;
};
