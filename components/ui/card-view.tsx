import React from "react";
import { CollectionHeaders } from "@/app/dashboard/table-header";
import { EditRecord } from "@/components/ui/edit-record";
import { Separator } from "./separator";
import { Ratings } from "./ratings";
interface RecordCardProps {
  data: CollectionHeaders;
}

const RecordCard: React.FC<RecordCardProps> = ({ data }) => {
  return (
    <div className="border rounded-md p-4 mb-2 flex flex-row justify-between">
      <div className="">
        <h2 className="text-md md:text-lg font-bold">{data.song_title}</h2>
        <p className="text-sm md:text-md">{data.artist}</p>

        <p className="text-xs md:text-sm italic mb-2">{data.album}</p>
        <Ratings
          className="flex-row flex gap-1"
          rating={typeof data.rating === "number" ? data.rating : 0}
        />
      </div>

      <div className="text-right flex flex-col content-evenly text-nowrap">
        <p className="text-md md:text-lg">
          {data.key} {data.bpm && data.key ? " | " : ""}{" "}
          {data.bpm ? `${data.bpm} BPM` : ""}
        </p>
        <p className="text-xs md:text-sm">
          {data.genre} {data.sub_genre ? `| ${data.sub_genre}` : ""}
        </p>
        {/* <Separator className="my-2" /> */}
        <div className="pt-2">
          <EditRecord recordId={data.uuid} />
        </div>
      </div>
    </div>
  );
};

export default RecordCard;
