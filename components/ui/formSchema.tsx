import * as z from "zod";

export const formSchema = z.object({
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
