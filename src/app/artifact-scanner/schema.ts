import { z } from "zod";

export const postArtifacterSchema = z.object({
  setId: z.string({ required_error: "セット効果は必須です" }),
  quality: z.string({ required_error: "セット効果は必須です" }),
  typeId: z.string({ required_error: "装備部位は必須です" }),
  mainOption: z.string({ required_error: "メインオプションは必須です" }),
  subOptionAttribute0: z.string({ required_error: "サブオプションは必須です" }),
  subOptionValue0: z.string({ required_error: "サブオプションは必須です" }),
  subOptionAttribute1: z.string({ required_error: "サブオプションは必須です" }),
  subOptionValue1: z.string({ required_error: "サブオプションは必須です" }),
  subOptionAttribute2: z.string({ required_error: "サブオプションは必須です" }),
  subOptionValue2: z.string({ required_error: "サブオプションは必須です" }),
  subOptionAttribute3: z.string({ required_error: "サブオプションは必須です" }),
  subOptionValue3: z.string({ required_error: "サブオプションは必須です" }),
});
