"use client";
import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { supabase } from "@/utils/supabase/supabaseClient";
import { formSchema } from "./formSchema";
import { TrashIcon } from "@radix-ui/react-icons";
import * as z from "zod";
import { CollectionHeaders } from "@/app/dashboard/table-header";

interface EditRecordProps {
  recordId: string;
}

export function EditRecord({ recordId }: EditRecordProps) {
  const [recordData, setRecordData] = useState<CollectionHeaders | null>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: recordData || {},
  });

  useEffect(() => {
    const fetchRecordData = async () => {
      if (recordId) {
        const { data, error } = await supabase
          .from("record_collection")
          .select("*")
          .eq("uuid", recordId)
          .single();

        if (error) {
          console.error("Error fetching record data:", error);
        } else {
          setRecordData(data);
          form.reset(data);
        }
      }
    };

    fetchRecordData();
  }, [recordId, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { error } = await supabase
      .from("record_collection")
      .update([
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
      ])
      .eq("uuid", recordId);

    if (error) {
      console.error("Error updating record:", error);
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 900);
      toast.success(`${recordData?.song_title} has been updated.`, {
        duration: 1000,
      });
    }
  };

  const handleDelete = async () => {
    const { data: fetchData, error: fetchError } = await supabase
      .from("record_collection")
      .select("song_title")
      .eq("uuid", recordId)
      .single();

    if (fetchError) {
      console.error("Error fetching record data:", fetchError);
      return;
    }

    const { error: deleteError } = await supabase
      .from("record_collection")
      .delete()
      .eq("uuid", recordId);

    if (deleteError) {
      console.error("Error deleting record:", deleteError);
    } else {
      toast.error(`${fetchData?.song_title} binned!`, {
        duration: 1000,
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit Record</Button>
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

                <FormField
                  control={form.control}
                  name="key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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

              <div className="flex flex-row justify-between gap-2">
                <Button type="submit" className="w-full">
                  Submit
                </Button>
                <Button variant="outline" className="py-4">
                  <TrashIcon
                    onClick={handleDelete}
                    className="h-max w-5 text-red-700"
                  />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
