import Link from "next/link";
import { UserIcon } from "lucide-react";
import { getUsers } from "@/actions/get-users";

export default async function UserList() {
  const users = await getUsers();
  type UserType = Awaited<ReturnType<typeof getUsers>>[number];
  return (
    <ul className="pt-4 space-y-4">
      {users.map((user) => renderUserItem(user))}
    </ul>
  );
  // get type from the users array
  function renderUserItem(user: UserType) {
    return (
      <li key={user.id}>
        <Link href={`/${user.username}/todos`}>
          <div className="flex p-4 bg-elevated rounded-lg hover:shadow hover:outline outline outline-primary/20 hover:outline-primary cursor-pointer transition-all">
            <div className="flex mr-4 items-center">
              <UserIcon strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-1 text-header">
                {user.username}
              </h2>
              <p className="text-sm text-primary/80">
                No of Todo&apos;s: {user.todoCount}
              </p>
            </div>
          </div>
        </Link>
      </li>
    );
  }
}
