"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/utils/supabase/supabaseClient";

const formSchema = z.object({
  song_title: z.string().max(80, {
    message: "Your track title doesn't need to be this long...",
  }),
  artist: z.string().max(80, {
    message: "Your artist name doesn't need to be this long...",
  }),
  album: z.string().max(80, {
    message: "Your album name doesn't need to be this long...",
  }),
  genre: z.string().max(40, {
    message: "Your genre doesn't need to be this long...",
  }),
  sub_genre: z.string().max(80, {
    message: "Your sub_genre doesn't need to be this long...",
  }),
  bpm: z
    .number()
    .min(100, { message: "BPM must be between 100-200." })
    .max(200, { message: "BPM must be between 100-200." }),
  key: z.string().max(3, {
    message:
      "Your key should be in Camelot format and a maximum or 3 characters.",
  }),
  notes: z.string().max(1000, {
    message: "Your notes have a maximum 1000 characters.",
  }),
  rating: z
    .number()
    .min(0, { message: "Ratings should be between 0-5" })
    .max(5, { message: "Ratings should be between 0-5" }),
});

export function ProfileForm() {}

export function AddRecord() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      song_title: "",
      artist: "",
      album: "",
      genre: "",
      sub_genre: "",
      bpm: 174,
      key: "1A",
      notes: "",
      rating: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form values being sent:", values);

    const { data, error } = await supabase.from("record_collection").insert([
      {
        song_title: values.song_title,
        artist: values.artist,
        album: values.album,
        genre: values.genre,
        sub_genre: values.sub_genre,
        bpm: values.bpm,
        key: values.key,
        notes: values.notes,
        rating: values.rating,
      },
    ]);

    if (error) {
      console.error("Error inserting record:", error);
      return;
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add a new record</Button>
      </SheetTrigger>
      <SheetContent>
        <div className="mx-auto w-full max-w-sm">
          <SheetHeader>
            <SheetTitle className=" text-3xl mt-3">Add a new record</SheetTitle>
          </SheetHeader>
          <Separator className="mt-3" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-6"
            >
              <div className="flex flex-row align-bottom gap-3">
                {/* BPM Field */}
                <FormField
                  control={form.control}
                  name="bpm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BPM</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Key Field */}
                <FormField
                  control={form.control}
                  name="key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key</FormLabel>

                      {/* <div className="flex flex-row justify-between">
                        <FormLabel>Key</FormLabel>
                        <FormDescription>Camelot format</FormDescription>
                      </div> */}

                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Song Title Field */}
              <FormField
                control={form.control}
                name="song_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Song Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Artist Field */}
              <FormField
                control={form.control}
                name="artist"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artist</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Genre Field */}
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sub Genre Field */}
              <FormField
                control={form.control}
                name="sub_genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Genre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Album Field */}
              <FormField
                control={form.control}
                name="album"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Album</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Notes Field */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rating Field */}
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormDescription className="pb-10">
                      Rating from 0 to 5
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
