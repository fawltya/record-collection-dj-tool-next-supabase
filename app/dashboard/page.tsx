import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { DataTable } from "./table";
import { columns } from "./table-header";
import Search from "@/components/ui/search";
import { AddRecord } from "@/components/ui/add-record";
import { EditRecord } from "@/components/ui/edit-record";

interface PageProps {
  searchParams: {
    query?: string;
    edit?: string | null;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const query = searchParams?.query || "";
  const editRecordId = searchParams?.edit || null;
  const supabase = createClient(cookies());

  let queryBuilder = supabase
    .from("record_collection")
    .select()
    .limit(50)
    .order("song_title", { ascending: true });

  if (query) {
    const searchCondition = `song_title.ilike.%${query}%,artist.ilike.%${query}%,album.ilike.%${query}%`;
    queryBuilder = queryBuilder.or(searchCondition);
  }

  const { data: recordCollection } = await queryBuilder;

  return (
    <div className="container mx-auto">
      <div className="flex flex-row mb-6 gap-10">
        <Search />
        <AddRecord />
      </div>
      <DataTable columns={columns} data={recordCollection || []} />
      {editRecordId && <EditRecord recordId={editRecordId} />}
    </div>
  );
}
