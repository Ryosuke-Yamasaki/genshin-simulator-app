"use client";

import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRecoilState } from "recoil";
import { previewState } from "@/lib/store/state";
import Image from "next/image";
import FormWrapper from "../form-wrapper";
import { useFormState } from "react-dom";
import { importArtifact } from "@/app/artifact-scanner/actions/import-artifact";
import { Label } from "@/components/ui/label";
import SubmitButton from "./submit-button";

const ImageUploadForm = () => {
  const [previews, setPreviews] = useRecoilState(previewState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filePreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(filePreviews);
    }
  };

  const [state, formAction] = useFormState(importArtifact, null);

  return (
    <>
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
                multiple
                onChange={handleChange}
              />
            </div>
            {previews && (
              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  画像のプレビュー
                </Label>
                <div className="mt-1 space-y-2">
                  {previews.map((preview, i) => (
                    <div key={i}>
                      <Image
                        src={preview}
                        alt={`プレビュー ${i + 1}`}
                        width={500}
                        height={500}
                        className="max-w-full h-auto rounded-lg border border-gray-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <CardFooter className="px-0 pt-6">
            <SubmitButton />
          </CardFooter>
        </form>
      </FormWrapper>
      {state && <div>{JSON.stringify(state, null, 1)}</div>}
    </>
  );
};

export default ImageUploadForm;
