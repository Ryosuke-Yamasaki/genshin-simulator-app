import { auth } from "@/lib/db/auth";
import { redirect } from "next/navigation";
import { getArtifactersByUser } from "@/lib/db/artifact/prisma";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

const ArtifacterPage = async () => {
  const session = await auth();
  if (!session || !session.user?.id) return redirect("/");

  const artifacters = await getArtifactersByUser(session.user.id);

  return (
    <div className="mx-6 py-10">
      <DataTable columns={columns} data={artifacters} />
    </div>
  );
};

export default ArtifacterPage;
