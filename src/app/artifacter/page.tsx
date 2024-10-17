import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getArtifactersByUser } from "./lib/prisma";
import { DataTable } from "./components/ui/data-table";
import { columns } from "./components/columns";

const ArtifacterPage = async () => {
  const session = await auth();
  if (!session || !session.user?.id) return redirect("/");

  const artifacter = await getArtifactersByUser(session.user.id);

  return (
    <div className="mx-6 py-10">
      <DataTable columns={columns} data={artifacter} />
    </div>
  );
};

export default ArtifacterPage;
