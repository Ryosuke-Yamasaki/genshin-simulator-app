import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ImageUploadForm from "./components/image-upload-form";
import PreviewArtifact from "./components/preview-artifact";
import { fetchArtifacts } from "./fetcher";
import RegisterArtifactFrom from "./components/register-artifact-form";

const ArtifactScannerPage = async () => {
  const session = await auth();
  if (!session) return redirect("/");

  const artifacts = await fetchArtifacts();
  console.log(artifacts);

  return (
    <div className="flex mx-10">
      <RegisterArtifactFrom />
      <ImageUploadForm />
      <PreviewArtifact />
    </div>
  );
};

export default ArtifactScannerPage;
