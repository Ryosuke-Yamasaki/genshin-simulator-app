import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { previewState } from "@/lib/store/state";
import Image from "next/image";
import { useRecoilValue } from "recoil";

const PreviewImage = () => {
  const previews = useRecoilValue(previewState);
  return (
    <>
      {previews && (
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            画像のプレビュー
          </Label>
          <Carousel className="w-[330px] mx-auto">
            <CarouselContent>
              {previews.map((preview, i) => (
                <CarouselItem key={i}>
                  <Image
                    src={preview}
                    alt={`プレビュー ${i + 1}`}
                    width={500}
                    height={500}
                    className="max-w-full h-auto rounded-lg border border-gray-200"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious type="button" />
            <CarouselNext type="button" />
          </Carousel>
        </div>
      )}
    </>
  );
};

export default PreviewImage;
