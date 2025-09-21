import { useContext } from "react";
import { ConfigContext } from "../contexts/configContext";

export function useConfig() {
  const context = useContext(ConfigContext);

  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigContextProvider");
  }
  return context;
}
