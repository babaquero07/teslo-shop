import { redirect } from "next/navigation";

import { auth } from "@/auth.config";
import Title from "@/components/ui/title/Title";

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user) {
    // redirect("/auth/login?returnTo=/profile");
    redirect("/");
  }

  return (
    <div>
      <Title title="Profile" />

      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
