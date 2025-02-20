import { handleGetSiteById } from "@/app/api/sites";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guilherme's React 19, Next.js 15 skills",
  description: "Generated by create next app",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const site = await handleGetSiteById(id);

  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>{site.name_en}</h1>
      <br />
      <h3 dangerouslySetInnerHTML={{ __html: site.short_description_en }}></h3>
      <br />
      <p dangerouslySetInnerHTML={{ __html: site.justification_en }}></p>
      <p>Date inscribed: {site.date_inscribed}</p>
      <p>Location: {site.states_name_en}</p>
      <p>longitude: {site.longitude}</p>
      <p>latitude: {site.latitude}</p>
      <p>Area (hectares): {site.area_hectares}</p>
      <p>Criteria: {site.criteria_txt}</p>
      <p>Category: {site.category}</p>

      <p>Unique number: {site.unique_number}</p>
      <p>ID: {site.id_no}</p>
      <p>Iso code: {site.iso_code}</p>
      <p>udnp code: {site.udnp_code}</p>
      <p>Transboundary: {site.transboundary}</p>
    </div>
  );
}
