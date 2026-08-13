import { auth, signOut } from "@/auth";

export default async function AuthStatus() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <div className="mt-auto border-t border-border px-3 pt-4">
      <div className="mb-3 truncate px-1 text-xs text-muted">
        {session.user.email}
      </div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button
          type="submit"
          className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-muted transition hover:bg-zinc-50 hover:text-foreground"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
