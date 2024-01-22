"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Ratings } from "@/components/ui/ratings";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export type CollectionHeaders = {
  song_title: string;
  artist: string;
  album: string;
  genre: string;
  sub_genre: string;
  bpm: number;
  key: string;
  notes: string;
  rating: number;
};

export const columns: ColumnDef<CollectionHeaders>[] = [
  {
    accessorKey: "bpm",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BPM
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "key",
    header: "Key",
  },
  {
    accessorKey: "song_title",
    header: "Title",
  },
  {
    accessorKey: "artist",
    header: "Artist",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "sub_genre",
    header: "Sub-Genre",
  },
  {
    accessorKey: "album",
    header: "Album",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: (info) => {
      const ratingValue = info.getValue();
      return (
        <Ratings rating={typeof ratingValue === "number" ? ratingValue : 0} />
      );
    },
  },
];
