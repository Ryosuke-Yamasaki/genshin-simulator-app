"use client";

import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRecoilState, useSetRecoilState } from "recoil";
import { imageState, previewState } from "@/lib/store/state";
import Image from "next/image";
import FormWrapper from "./form-wrapper";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { importArtifact } from "../actions/importArtifact/action";
import { Label } from "@/components/ui/label";

const ImageUploadForm = () => {
  const [preview, setPreview] = useRecoilState(previewState);
  const setImage = useSetRecoilState(imageState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      alert("画像ファイルを選択してください");
    }
  };

  const [message, formAction] = useFormState(importArtifact, null);

  return (
    <FormWrapper formTitle="聖遺物のインポート">
      <form action={formAction}>
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              画像の選択
            </Label>
            <Input
              id="file"
              name="file"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          {preview && (
            <div className="mt-4">
              <Label className="block text-sm font-medium text-gray-700">
                画像の選択
              </Label>
              <Image
                src={preview}
                alt="プレビュー"
                width={500}
                height={500}
                className="max-w-full h-auto mt-1 rounded-lg border border-gray-200"
              />
            </div>
          )}
        </div>
        <CardFooter className="px-0 pt-6">
          <Button type="submit" className="w-full">
            聖遺物をインポート
          </Button>
        </CardFooter>
      </form>
    </FormWrapper>
  );
};

export default ImageUploadForm;
