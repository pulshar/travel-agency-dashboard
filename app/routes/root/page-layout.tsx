import { AnimatePresence } from "motion/react";
import { Outlet, redirect, useNavigation } from "react-router";
import { getExistingUser, storeUserData } from "~/appwrite/auth";
import { account } from "~/appwrite/client";
import Footer from "~/components/Footer";
import FullLoader from "~/components/FullLoader";
import RootNavbar from "~/components/RootNavbar";

export async function clientLoader() {
  try {
    const user = await account.get().catch(() => null);

    if (!user || !user.$id) {
      return redirect("/sign-in");
    }

    const existingUser = await getExistingUser(user.$id);
    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (e) {
    console.error("Error fetching user at home:", e);
    return redirect("/sign-in");
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

export default function PageLayout() {
  const navigation = useNavigation();
  const isNavigating = navigation.state !== "idle";
  return (
    <div className="bg-light-200">
      <RootNavbar />
      {isNavigating && (
        <AnimatePresence>
          <FullLoader />
        </AnimatePresence>
      )}
      <Outlet />
      <Footer />
    </div>
  );
}
