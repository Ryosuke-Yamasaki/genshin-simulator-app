"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "./submit-button";
import { useRecoilState, useSetRecoilState } from "recoil";
import { imageState, previewState } from "@/atoms/ocr";
import Image from "next/image";

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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">聖遺物をインポート</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              画像を選択
            </Label>
            <Input
              id="file"
              name="file"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          {preview && (
            <div className="mt-4">
              <Label className="block text-sm font-medium text-gray-700">
                プレビュー
              </Label>
              <Image
                src={preview}
                alt="プレビュー"
                width={500}
                height={500}
                className="max-w-full h-auto rounded-lg border border-gray-200"
              />
            </div>
          )}
        </div>
        <CardFooter className="px-0 pt-6">
          <SubmitButton />
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ImageUploadForm;
