"use client";

import { SitesContextProvider } from "@/context/sitesContext";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
const DynamicSearchComponent = dynamic(() => import("./siteSearch"), {
  ssr: false,
  loading: () => <Box>Loading...</Box>,
});

export default function DynamicSearch() {
  return (
    <SitesContextProvider>
      <DynamicSearchComponent />
    </SitesContextProvider>
  );
}
