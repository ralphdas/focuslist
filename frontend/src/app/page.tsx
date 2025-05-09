import UserList from "./_components/user-list";

export default async function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl text-header">Users</h1>
      <p className="text text-primary/90">
        This is a simple example application to demonstrate the usage of Workers
        Sites with a Next.js application.
      </p>

      <UserList />
    </div>
  );
}
