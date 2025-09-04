import { useOutletContext } from "react-router";

type UserType = {
  email: string;
  tripsCreated?: number;
};

type OutletContextType = { user: UserType };

export function useDemoUser(passedUser?: UserType) {

  const outletContext = useOutletContext<OutletContextType>();
  const user = passedUser ?? outletContext?.user;

  const isUserDemo = user?.email === "userdemo@userdemo.com";
  const totalTrips = isUserDemo ? user.tripsCreated ?? 0 : 0;
  const tripsLimitReached = totalTrips >= 1;

  return { user, isUserDemo, totalTrips, tripsLimitReached };
}