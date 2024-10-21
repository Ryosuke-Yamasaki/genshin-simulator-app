import { auth } from "@/lib/db/auth";
import { redirect } from "next/navigation";
import ImageUploadForm from "./components/image-upload/form";
import PreviewArtifact from "./components/preview-artifact";

const ArtifactScannerPage = async () => {
  const session = await auth();
  if (!session) return redirect("/");

  return (
    <div className="flex">
      <ImageUploadForm />
      <PreviewArtifact />
    </div>
  );
};

export default ArtifactScannerPage;
