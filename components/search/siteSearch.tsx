"use client";
import React, { useActionState, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import SearchInput from "@/components/search/searchInput";
import SitesList from "./sitesList";
import { useAppSelector } from "@/store/reduxHooks";
import { useSitesContext } from "@/hooks/useSitesContext";
import { handleGetSitesBySearchTerm } from "@/app/api/sites";

const SiteSearch = () => {
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const { countries } = useAppSelector((state) => state.defaultsSlice);
  const { selectedCountry, setSelectedCountry, searchValue } =
    useSitesContext();
  const [result, submitAction, isPending] = useActionState(async () => {
    const result = await handleGetSitesBySearchTerm(
      searchValue,
      selectedCountry
    );

    return result;
  }, null);

  return (
    <>
      <Box>
        <form action={submitAction}>
          <FormControl
            sx={{ m: 1, minWidth: 200, height: "56px" }}
            size="small"
          >
            <InputLabel id="demo-simple-select-standard-label">
              Country (optional)
            </InputLabel>
            <Select
              id="country"
              name="country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              sx={{
                height: "100%",
              }}
            >
              <MenuItem value="">Select country</MenuItem>
              {Object.keys(countries).map((key: string, index: number) => (
                <MenuItem
                  value={key}
                  key={index}
                  sx={{
                    maxWidth: "200px",
                    height: "100%",
                  }}
                >
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <SearchInput />
          </FormControl>

          <FormControl
            sx={{ m: 1, minWidth: 120, height: "56px", display: "flex" }}
            size="small"
          >
            <Button
              type="submit"
              disabled={isPending}
              onClick={() => setWasSubmitted(true)}
            >
              Search
            </Button>
          </FormControl>
        </form>
      </Box>
      <Box
        sx={{
          maxWidth: "500px",
          height: "300px",
          overflowY: "auto",
        }}
      >
        <SitesList
          list={result}
          isPending={isPending}
          wasSubmitted={wasSubmitted}
        />
      </Box>
    </>
  );
};

export default SiteSearch;
