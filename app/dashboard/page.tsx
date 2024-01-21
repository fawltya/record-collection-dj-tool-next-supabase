import Sidebar from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { DataTable } from "./table";
import { CollectionHeaders, columns } from "./table-header";

// export default async function Page() {
//   return (
//     <>
//       <Sidebar />
//     </>
//   );
// }

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: recordCollection } = await supabase
    .from("record_collection")
    .select()
    .limit(20)
    .order("album", { ascending: false });

  return (
    <>
      <div className="container mx-auto">
        <DataTable columns={columns} data={recordCollection} />
      </div>
    </>
  );
}
