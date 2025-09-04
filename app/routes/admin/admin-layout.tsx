import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { AnimatePresence } from "motion/react";
import { Outlet, redirect, useLoaderData, useNavigation } from "react-router";
import { getExistingUser, storeUserData } from "~/appwrite/auth";
import { account } from "~/appwrite/client";
import { MobileSidebar, NavItems } from "~/components";
import FullLoader from "~/components/FullLoader";

export async function clientLoader() {
  try {
    const user = await account.get();

    if (!user.$id) return redirect("/sign-in");

    const existingUser = await getExistingUser(user.$id);

    if (existingUser?.userRole === "user") {
      return redirect("/");
    }

    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (e) {
    console.log("Error in clientLoader", e);
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

export default function AdminLayout() {
  const navigation = useNavigation();
  const isNavigating = navigation.state !== "idle";
  const user = useLoaderData<UserData>(); 
  return (
    <div className="admin-container">
      {isNavigating && (
        <AnimatePresence>
          <FullLoader />
        </AnimatePresence>
      )}
      <div className="admin-layout">
        <MobileSidebar />

        <aside className="w-full max-w-[280px] hidden lg:block">
          <SidebarComponent width={280} enableGestures={false}>
            <NavItems />
          </SidebarComponent>
        </aside>

        <aside className="children">
          <Outlet context={{ user }} />
        </aside>
      </div>
    </div>
  );
}
