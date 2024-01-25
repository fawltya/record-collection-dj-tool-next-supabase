"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Ratings } from "@/components/ui/ratings";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export type CollectionHeaders = {
  uuid: string;
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
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "key",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Key
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      );
    },
  },
  {
    accessorKey: "song_title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      );
    },
  },
  {
    accessorKey: "artist",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Artist
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      );
    },
  },
  {
    accessorKey: "genre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Genre
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      );
    },
  },
  {
    accessorKey: "sub_genre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sub-Genre
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      );
    },
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
