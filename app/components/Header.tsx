import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";
// import getActualDateTimeFormat = IntlBase.getActualDateTimeFormat;
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { InfoIcon } from "lucide-react";
import Alert from "./Alert";
import Tooltip from "./Tooltip";
import { useDemoUser } from "~/hooks/useDemouser";

interface Props {
  title: string;
  description: string;
  ctaText?: string;
  ctaUrl?: string;
}

const Header = ({ title, description, ctaText, ctaUrl }: Props) => {
  const {pathname} = useLocation();

  const {isUserDemo, tripsLimitReached } = useDemoUser();
  
   const isTripsPage = pathname === "/trips" ;
   const isCreateTripPage = pathname === "/trips/create" ;
   const isSomeTripPage = pathname.startsWith("/trips") ;

  return (
    <div>
      <header className="header">
        <article>
          <h1
            className={cn(
              "text-dark-100 mt-6",
              pathname === "/"
                ? "text-2xl md:text-4xl font-bold"
                : "text-xl md:text-2xl font-semibold"
            )}
          >
            {title}
          </h1>
          <div className="flex gap-2 items-center">
            <p
              className={cn(
                "text-gray-100 font-normal",
                pathname === "/" ? "text-base md:text-lg" : "text-sm md:text-lg"
              )}
            >
              {description}
            </p>
            {isUserDemo && isSomeTripPage && !isCreateTripPage && (
              <Tooltip text="Demo user can't edit">
                <InfoIcon size={18} className="cursor-pointer" />
              </Tooltip>
            )}
          </div>
        </article>

        {ctaText && ctaUrl && (
          <Link
            to={ctaUrl}
            onClick={(e) => tripsLimitReached && e.preventDefault()}
            className={
              tripsLimitReached ? "pointer-events-none opacity-50" : ""
            }
          >
            <ButtonComponent
              type="button"
              className="button-class !h-11 !w-full md:w-[240px]"
            >
              <span className="p-16-semibold text-white">{ctaText}</span>
              <img
                src="/assets/icons/magic-star.svg"
                alt="AI"
                className="size-5"
              />
            </ButtonComponent>
          </Link>
        )}
      </header>
      {isUserDemo && isTripsPage && tripsLimitReached && (
        <div className="mt-6">
          <Alert variant="info">
            Demo user can't create more than 10 trips
          </Alert>
        </div>
      )}
    </div>
  );
};
export default Header;
