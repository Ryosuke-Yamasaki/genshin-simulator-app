import { auth } from "@/auth";
import { redirect } from "next/navigation";

const ArtifactScannerPage = async () => {
  const session = await auth();
  if (!session) return redirect("/");

  return <div>ArtifactScannerPage</div>;
};

export default ArtifactScannerPage;
