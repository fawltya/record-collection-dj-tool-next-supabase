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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
    console.log("Supabase client:", supabase);

    console.log("onSubmit clicked");
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
    console.log("Supabase response:", data, error);

    if (error) {
      console.error("Error inserting record:", error);
      return;
    }

    console.log("Record added:", values);
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Add a new record</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add a new record</DrawerTitle>
            <DrawerDescription>
              Fill in the record details here.
            </DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="song_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Song Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Name the tune</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>

          <DrawerFooter>
            {/* <DrawerClose asChild>
              <Button variant="outline">Save</Button>
            </DrawerClose>
            <Button>Save and add another</Button> */}
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
