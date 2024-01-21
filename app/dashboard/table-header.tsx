"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Ratings } from "@/components/ui/ratings";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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
    header: "BPM",
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
    cell: (info) => <Ratings rating={info.getValue()} />,
  },
];
