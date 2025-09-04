import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { UserStarIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { Link, redirect } from "react-router";
import { loginWithDemoUser, loginWithGoogle } from "~/appwrite/auth";
import { account } from "~/appwrite/client";
import FullLoader from "~/components/FullLoader";

export async function clientLoader() {
  try {
    const user = await account.get().catch(() => null);

    if (user && user.$id) {
      return redirect("/");
    }
    return null;
  } catch (e) {
    console.error("Error fetching user at sign-in:", e);
  }
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return (
    <AnimatePresence>
      <FullLoader />
    </AnimatePresence>
  );
}

export default function SignIn() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">
            <div className="sign-in-card">
              <header className="header">
                <Link to="/">
                  <img
                    src="/assets/icons/logo.svg"
                    alt="logo"
                    className="size-[32px]"
                  />
                </Link>
                <h1 className="p-28-bold text-gray-700">Tourall</h1>
              </header>

              <article className="px-8">
                <h2 className="text-xl font-semibold text-gray-700 text-center">
                  Start your travel journey
                </h2>

                <p className="text-center text-gray-100">
                  Sign in with Google to manage destinations, itineraries, and
                  user activity with ease.
                </p>
              </article>

              <ButtonComponent
                type="button"
                className="button-class !h-11 !w-full"
                onClick={loginWithGoogle}
              >
                <img
                  src="/assets/icons/google.svg"
                  className="size-5"
                  alt="google"
                />
                <span className="p-18-semibold text-white">
                  Sign in with Google
                </span>
              </ButtonComponent>
              <div className="after:border-border text-gray-500/50 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center  after:border-t w-[85%] mx-auto py-6">
                <span className="bg-white relative z-10 px-2 text-gray-100">
                  or continue as
                </span>
              </div>
              <ButtonComponent
                type="button"
                className="button-class-secondary !h-11 !w-full"
                onClick={loginWithDemoUser}
              >
                <UserStarIcon size={18} />
                <span className="p-16-semibold">Explore as admin</span>
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary-500/15 relative hidden lg:block overflow-hidden">
        <img
          src="/assets/images/bg-img.jpg"
          alt="Image"
          className="absolute opacity-80 blur-[1px] inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </main>
  );
}
