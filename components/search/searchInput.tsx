"use client";
import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSitesContext } from "@/hooks/useSitesContext";

const SearchInput = () => {
  const { searchValue, updateSearchValue } = useSitesContext();

  return (
    <TextField
      variant="outlined"
      placeholder="E.g.: Rio de Janeiro"
      onChange={(e) => updateSearchValue(e.target.value)}
      value={searchValue}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
