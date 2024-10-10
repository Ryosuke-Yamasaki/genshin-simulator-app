import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ImageUploadForm from "./components/image-upload-form";
import PreviewArtifact from "./components/preview-artifact";
import { fetchArtifactSets } from "./fetcher";
import RegisterArtifactFrom from "./components/register-artifact-form";

const ArtifactScannerPage = async () => {
  const session = await auth();
  if (!session) return redirect("/");

  const artifactSets = await fetchArtifactSets();

  return (
    <div className="flex">
      <RegisterArtifactFrom artifactSets={artifactSets} />
      <ImageUploadForm />
      <PreviewArtifact />
    </div>
  );
};

export default ArtifactScannerPage;
