import Sidebar from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

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
    .select();

    return (
        <>
        </>
        <pre>{JSON.stringify(recordCollection, null, 2)}</pre>)
    
}
