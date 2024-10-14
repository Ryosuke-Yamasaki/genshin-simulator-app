import {
  importArtifactDataState,
  imageState,
  previewState,
} from "@/app/artifact-scanner/state";
import { Button } from "@/components/ui/button";

import { useTransition } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { importArtifactData } from "../lib/utils";

const SubmitButton = () => {
  const preview = useRecoilValue(previewState);
  const image = useRecoilValue(imageState);
  const setArtifactData = useSetRecoilState(importArtifactDataState);
  const [isPending, startTransition] = useTransition();

  const handleImportImage = () => {
    startTransition(async () => {
      if (image) {
        const imagePath = URL.createObjectURL(image);
        const data = (await importArtifactData(
          imagePath
        )) as ImportArtifactData;
        setArtifactData(data);
        console.log(data);
      }
    });
  };

  return (
    <Button
      onClick={handleImportImage}
      className="w-full"
      disabled={!preview || isPending}
    >
      {isPending ? "聖遺物をインポート中..." : "聖遺物をインポート"}
    </Button>
  );
};

export default SubmitButton;
