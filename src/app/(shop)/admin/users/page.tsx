export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedUsers } from "@/actions";

import { redirect } from "next/navigation";

import Title from "@/components/ui/title/Title";
import UsersTable from "./ui/UsersTable";

export default async function AdminPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Users maintenance" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>
    </>
  );
}
