import Sidebar from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { DataTable } from "./table";
import { CollectionHeaders, columns } from "./table-header";
import Search from "@/components/ui/search";
import { AddRecord } from "@/components/ui/add-edit-record";
import { Button } from "nextra/components";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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
    <>
      <div className="container mx-auto">
        <div className="flex flex-row mb-6 gap-10">
          <Search />
          <AddRecord />
        </div>
        <DataTable columns={columns} data={recordCollection} />
      </div>
    </>
  );
}
