import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Link, redirect } from "react-router";
import { loginWithGoogle } from "~/appwrite/auth";
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
     <FullLoader/>
    );
}

export default function SignIn() {
  return (
    <main className="auth">
      <section className="size-full glassmorphism flex-center px-6">
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
              Sign in with Google to manage destinations, itineraries, and user
              activity with ease.
            </p>
          </article>

          <ButtonComponent
            type="button"
            iconCss="e-search-icon"
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
        </div>
      </section>
    </main>
  );
}
