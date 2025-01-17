import { useContext } from "react";
import SitesContext from "@/context/sitesContext";

export const useSitesContext = () => {
  const context = useContext(SitesContext);

  if (!context) {
    throw new Error(
      "useSitesContext must be used within a SitesContextProvider"
    );
  }

  return context;
};
