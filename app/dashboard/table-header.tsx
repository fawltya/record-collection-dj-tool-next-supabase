"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CollectionHeaders = {
  song_title: string;
  artist: string;
  album: string;
  genre: string;
};

export const columns: ColumnDef<CollectionHeaders>[] = [
  {
    accessorKey: "song_title",
    header: "Title",
  },
  {
    accessorKey: "artist",
    header: "Artist",
  },
  {
    accessorKey: "album",
    header: "Album",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
];
