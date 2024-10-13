import { z } from "zod";

export const postArtifacterSubOptionSchema = z.object({
  attribute: z.string({ required_error: "サブステータスは必須です" }),
  value: z.string({ required_error: "サブステータスは必須です" }),
});

export const postArtifacterSchema = z.object({
  setId: z.string({ required_error: "セット効果は必須です" }),
  quality: z.string({ required_error: "セット効果は必須です" }),
  typeId: z.string({ required_error: "装備部位は必須です" }),
  mainOption: z.string({ required_error: "メインオプションは必須です" }),
  subOptions: z.array(
    z.object({
      attribute: z.string({ required_error: "サブステータスは必須です" }),
      value: z.string({ required_error: "サブステータスは必須です" }),
    })
  ),
});
