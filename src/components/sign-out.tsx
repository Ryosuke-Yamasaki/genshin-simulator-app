import { signOut } from "@/lib/db/auth";
import { Button } from "@/components/ui/button";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Signout</Button>
    </form>
  );
}
