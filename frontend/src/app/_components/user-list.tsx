import Link from "next/link";
import { User } from "../types";
import { UserIcon } from "lucide-react";
import { getUsers } from "@/actions/get-users";

export default async function UserList() {
  const users = await getUsers();
  return (
    <ul className="pt-4 space-y-4">
      {users.map((user) => renderUserItem(user))}
    </ul>
  );

  function renderUserItem(user: User) {
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
                No of Todo&apos;s: {user.todo_count}
              </p>
            </div>
          </div>
        </Link>
      </li>
    );
  }
}
