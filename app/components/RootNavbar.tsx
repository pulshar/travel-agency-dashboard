import { LogOutIcon } from "lucide-react";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router";
import { logoutUser } from "~/appwrite/auth";
import { cn } from "~/lib/utils";
import Tooltip from "./Tooltip";

export default function RootNavbar() {
  const navigation = useNavigation();
  const isNavigating = navigation.state !== "idle";

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const user = useLoaderData();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/sign-in");
  };

  return (
    <nav
      className={cn(
        location.pathname === `/travel/${params.tripId}`
          ? "bg-white"
          : "bg-white/90 backdrop-blur",
        "w-full fixed z-50 border-b border-gray-200"
      )}
    >
      <header className="root-nav wrapper">
        <Link to="/" className="link-logo">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            className="size-[30px]"
          />
          <h1>Tourall</h1>
        </Link>

        <aside>
          {user.userRole === "admin" && (
            <Link
              to="/dashboard"
              className={`inline-flex items-center justify-center gap-2 text-base font-medium px-6 py-1.5 border border-gray-500 rounded-md text-gray-700 transition-colors duration-200 hover:bg-light-300 hover:text-dark-100 ${
                isNavigating && "disabled bg-light-300"
              }`}
            >
              Admin Panel
            </Link>
          )}

          <img
            className="hidden sm:block"
            src={user?.imageUrl || "/assets/images/david.webp"}
            alt="user"
            referrerPolicy="no-referrer"
          />
          <Tooltip text="Log out" position="bottom">
            <button onClick={handleLogout} className="cursor-pointer group">
              <LogOutIcon
                strokeWidth={1.5}
                className="group-hover:translate-x-[2px] transition-transform"
              />
            </button>
          </Tooltip>
        </aside>
      </header>
    </nav>
  );
}
