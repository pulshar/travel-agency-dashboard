import { Outlet, redirect } from "react-router";
import { getExistingUser, storeUserData } from "~/appwrite/auth";
import { account } from "~/appwrite/client";
import Footer from "~/components/Footer";
import RootNavbar from "~/components/RootNavbar";

export async function clientLoader() {
  try {
    const user = await account.get();

    if (!user.$id) return redirect("/sign-in");

    const existingUser = await getExistingUser(user.$id);
    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (e) {
    console.log("Error fetching user", e);
    return redirect("/sign-in");
  }
}

export default function PageLayout() {
  return (
    <div className="bg-light-200">
      <RootNavbar />
      <Outlet />
      <Footer />
    </div>
  );
}
