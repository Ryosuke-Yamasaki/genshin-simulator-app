import { artifactDataState, imageState, previewState } from "@/atoms/ocr";
import { Button } from "@/components/ui/button";
import { importArtifactData } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  const preview = useRecoilValue(previewState);
  const image = useRecoilValue(imageState);
  const setArtifactData = useSetRecoilState(artifactDataState);

  const handleImportImage = async () => {
    if (image) {
      const imagePath = URL.createObjectURL(image);
      const data = (await importArtifactData(imagePath)) as ArtifactImportData;
      setArtifactData(data);
      console.log(data);
    }
  };

  return (
    <Button
      onClick={handleImportImage}
      className="w-full"
      disabled={!preview || pending}
    >
      {pending ? "聖遺物をインポート中..." : "聖遺物をインポート"}
    </Button>
  );
};

export default SubmitButton;
