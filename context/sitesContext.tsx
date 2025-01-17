"use client";
import { useParams } from "next/navigation";
import { createContext, useState, ReactNode, useEffect } from "react";
import { ISite } from "@/app/api/sites";
import { useAppSelector, useAppDispatch } from "@/store/reduxHooks";
import { fetchDefaults } from "@/store/defaultsSlice";

interface SitesContextContextType {
  searchValue: string;
  updateSearchValue: (value: string) => void;
  site: ISite | undefined;
  selectSite: (site: ISite) => void;
  selectedCountry: string | undefined;
  setSelectedCountry: (country: string) => void;
}

const SitesContext = createContext<SitesContextContextType | undefined>(
  undefined
);

interface SitesContextProviderProps {
  children: ReactNode;
}

export const SitesContextProvider = ({
  children,
}: SitesContextProviderProps) => {
  const { id } = useParams();
  const [site, setSite] = useState<ISite | undefined>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    ""
  );

  const dispatch = useAppDispatch();

  const { statusDefaults } = useAppSelector((state) => state.defaultsSlice);

  useEffect(() => {
    if (statusDefaults === "idle") {
      dispatch(fetchDefaults());
    }
  }, [statusDefaults, dispatch]);

  const updateSearchValue = (value: string) => {
    setSearchValue(value);
  };

  const selectSite = (site: ISite) => {
    setSite(site);
    setSearchValue("");
  };

  // useEffect(() => {
  //   if (id) {
  //     setSite(
  //       providers.find((provider) => provider.id === Number(id as string))
  //     );
  //   }
  // }, [id]);

  return (
    <SitesContext.Provider
      value={{
        searchValue,
        updateSearchValue,
        site,
        selectSite,
        selectedCountry,
        setSelectedCountry,
      }}
    >
      {children}
    </SitesContext.Provider>
  );
};

export default SitesContext;
