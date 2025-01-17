"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
} from "@mui/material";
import { ISite } from "@/app/api/sites";

interface ISitesList {
  list: ISite[] | null;
  isPending: boolean;
  wasSubmitted: boolean;
}

const SitesList = ({ list, isPending, wasSubmitted }: ISitesList) => {
  const router = useRouter();

  const onSelectSite = (site: ISite) => {
    router.push(`/sites/${site.id}`);
  };

  if (isPending) {
    return <Box>Loading...</Box>;
  }

  return (
    <Paper elevation={0}>
      {list?.length ? (
        <List disablePadding>
          {list?.map((site) => {
            return (
              <ListItem
                onClick={() => onSelectSite(site)}
                key={site.id}
                sx={{
                  backgroundColor: "#f5fefd",
                  padding: "8px 25px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#e0ecea",
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      component="span" // Avoid nested <p> issue
                      fontWeight="bold"
                      sx={{ color: "#1F2937", fontSize: "16px" }}
                    >
                      {site.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ color: "#374151", display: "block" }}
                    >
                      {site.location}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      ) : wasSubmitted ? (
        <Box>No results</Box>
      ) : null}
    </Paper>
  );
};

export default SitesList;
