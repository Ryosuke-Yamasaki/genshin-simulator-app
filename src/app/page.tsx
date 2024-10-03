import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      hello
      <SignIn />
      <SignOut />
      {JSON.stringify(session, null, 2)}
    </div>
  );
}
