"use client";

import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SubmitButton from "./submit-button";
import { useRecoilState, useSetRecoilState } from "recoil";
import { imageState, previewState } from "@/atoms/ocr";
import Image from "next/image";
import FormWrapper from "./form-wrapper";
import FormLabel from "./ui/form-label";

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

  return (
    <FormWrapper formTitle="聖遺物のインポート">
      <div className="space-y-4">
        <div>
          <FormLabel htmlFor="file" labelName="画像の選択" />
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
            <FormLabel labelName="プレビュー" />
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
        <SubmitButton />
      </CardFooter>
    </FormWrapper>
  );
};

export default ImageUploadForm;
