import { previewState } from "@/atoms/ocr-state";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { useRecoilValue } from "recoil";
import Tesseract from "tesseract.js";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  const preview = useRecoilValue(previewState);

  const handleImportClick = () => {
    if (preview) {
      Tesseract.recognize(preview, "eng", {
        logger: (m) => console.log(m),
      })
        .then(({ data: { text } }) => {
          console.log(text);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Button onClick={handleImportClick} className="w-full" disabled={pending}>
      {pending ? "聖遺物をインポート中..." : "聖遺物をインポート"}
    </Button>
  );
};

export default SubmitButton;
