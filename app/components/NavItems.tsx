import {
  Link,
  NavLink,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router";
import { logoutUser } from "~/appwrite/auth";
import { sidebarItems } from "~/constants";
import { cn } from "~/lib/utils";
import BtnLoader from "./BtnLoader";

export default function NavItems({
  handleClick,
}: {
  handleClick?: () => void;
}) {
  const user = useLoaderData();
  const navigate = useNavigate();

  const navigation = useNavigation();
  const isNavigating = navigation.state !== "idle";

  const handleLogout = async () => {
    await logoutUser();
    navigate("/sign-in");
  };
  return (
    <section className="nav-items">
      <Link to="/" className="link-logo">
        <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
        <h1>Tourall</h1>
      </Link>

      <div className="container">
        <nav>
          {sidebarItems.map(({ id, href, icon, label }) => (
            <NavLink
              to={href}
              key={id}
              className={({ isActive, isPending }) =>
                cn(
                  "group nav-item",
                  isActive && "bg-primary-100 !text-white pointer-events-none",
                  isPending && "bg-primary-100/70 !text-white pointer-events-none justify-between"
                )
              }
              onClick={handleClick}
            >
              {({ isPending }) => (
                <>
                  <span>{label}</span>
                  {isPending && isNavigating && <BtnLoader borderColor="border-light-300" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <footer className="nav-footer">
          <img
            src={user?.imageUrl || "/assets/images/david.webp"}
            alt={user?.name || "David"}
            referrerPolicy="no-referrer"
          />

          <article>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </article>

          <button onClick={handleLogout} className="cursor-pointer">
            <img
              src="/assets/icons/logout.svg"
              alt="logout"
              className="size-6 ml-2"
            />
          </button>
        </footer>
      </div>
    </section>
  );
}
