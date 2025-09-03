import {Link, useLoaderData, useLocation, useNavigate, useParams} from "react-router";
import {logoutUser} from "~/appwrite/auth";
import {cn} from "~/lib/utils";

export default function RootNavbar() {
    const navigate = useNavigate();
    const location = useLocation()
    const params = useParams();
    const user = useLoaderData();

    const handleLogout = async () => {
        await logoutUser();
        navigate('/sign-in')
    }

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
                className={cn(
                  "inline-block text-base font-medium px-4 py-1.5 border border-gray-500 rounded-md text-dark-100 transition-colors duration-200 hover:bg-light-300",
                  {
                    "text-dark-100": location.pathname.startsWith("/travel"),
                  }
                )}
              >
                Admin Panel
              </Link>
            )}

            <img className="hidden sm:block"
              src={user?.imageUrl || "/assets/images/david.webp"}
              alt="user"
              referrerPolicy="no-referrer"
            />

            <button onClick={handleLogout} className="cursor-pointer">
              <img
                src="/assets/icons/logout.svg"
                alt="logout"
                className="size-6"
              />
            </button>
          </aside>
        </header>
      </nav>
    );
}