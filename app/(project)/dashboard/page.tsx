import { handleAuth } from "@/app/actions/handle-auth";
import { auth } from "@/app/lib/auth"
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
    // lado do server
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Protected Dashboard</h1>
            <p className="mb-5">{session?.user?.email ? session?.user?.email : "Usuario nao está logado!!"}</p>
            {
                session?.user?.email && (
                    <form
                        action={handleAuth}
                    >
                        <button type="submit" className="border rounded-md px-2 cursor-pointer">
                            Logout
                        </button>
                    </form>
                )
            }

            <Link href='/payment'>
                Pagamentos
            </Link>
        </div>
    )
}