import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ImageUploadForm from "./components/image-upload-form";
import PreviewArtifact from "./components/preview-artifact";
import { fetchArtifactSets, fetchArtifactTypes } from "./fetcher";
import RegisterArtifactFrom from "./components/register-artifact-form";

const ArtifactScannerPage = async () => {
  const session = await auth();
  if (!session) return redirect("/");

  const artifactSets = await fetchArtifactSets();
  const artifactTypes = await fetchArtifactTypes();

  return (
    <div className="flex">
      <RegisterArtifactFrom
        artifactSets={artifactSets}
        artifactTypes={artifactTypes}
      />
      <ImageUploadForm />
      <PreviewArtifact />
    </div>
  );
};

export default ArtifactScannerPage;
