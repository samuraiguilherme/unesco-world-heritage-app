/* eslint-disable  @typescript-eslint/no-explicit-any */

"use server";
import fs from "fs";
import csvParser from "csv-parser";

export interface IDefaults {
  [key: string]: string;
}

export interface ISite {
  id: string;
  name: string;
  location: string;
}

export interface ICompleteSite {
  unique_number: string;
  id_no: string;
  rev_bis: string;
  name_en: string;
  short_description_en: string;
  justification_en: string;
  date_inscribed: string;
  secondary_dates: string;
  danger: string;
  longitude: string;
  latitude: string;
  area_hectares: string;
  criteria_txt: string;
  category: string;
  states_name_en: string;
  iso_code: string;
  udnp_code: string;
  transboundary: string;
}

export const handleGetDefaults = async (): Promise<IDefaults> => {
  return new Promise((resolve) => {
    const results: any[] = [];

    fs.createReadStream("./whc-sites.csv")
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(
          results.reduce((acc, curr) => {
            if (!acc[curr.states_name_en]) {
              acc[curr.states_name_en] = curr.id_no;
            }
            return acc;
          }, {})
        );
      });
  });
};

export const handleGetSitesBySearchTerm = async (
  term: string,
  country?: string
): Promise<Array<ISite>> => {
  return new Promise((resolve) => {
    const results: any[] = [];

    fs.createReadStream("./whc-sites.csv")
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(
          results
            .filter((f) => {
              const condition = country
                ? new RegExp(term).test(f.name_en) &&
                  f.states_name_en == country
                : new RegExp(term).test(f.name_en);

              return condition;
            })
            .map((d: any) => ({
              id: d.id_no,
              name: d.name_en,
              location: d.states_name_en,
            }))
        );
      });
  });
};

export const handleGetSiteById = async (id: string): Promise<ICompleteSite> => {
  return new Promise((resolve) => {
    const results: any[] = [];

    fs.createReadStream("./whc-sites.csv")
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results.filter((f) => f.id_no == id)[0]);
      });
  });
};
