import { PagerComponent } from "@syncfusion/ej2-react-grids";
import { useState } from "react";
import { useNavigate, useSearchParams, type LoaderFunctionArgs } from "react-router";
import { getAllTrips } from "~/appwrite/trips";
import { Header, TripCard } from "~/components";
import { parseTripData } from "~/lib/utils";
import type { Route } from "./+types/trips";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const limit = 8;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const offset = (page - 1) * limit;

  const { allTrips, total } = await getAllTrips(limit, offset);

  return {
    trips: allTrips.map(({ $id, tripDetails, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetails),
      imageUrls: imageUrls ?? [],
    })),
    total,
    limit,
  };
};

export default function Trips({ loaderData }: Route.ComponentProps) {
  const trips = loaderData.trips as Trip[] | [];

  const [searchParams] = useSearchParams();
    const navigate = useNavigate();
  const initialPage = Number(searchParams.get("page") || "1");

  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}`, { replace: false });
  };
  return (
    <main className="all-users wrapper">
      <Header
        title="Manage Trips"
        description="View, create, and edit AI generated trips"
        ctaText="Create a trip"
        ctaUrl="/trips/create"
      />

      <section className="pb-10 md:pb-20">
        <div className="trip-grid mb-10">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id}
              name={trip.name}
              imageUrl={trip.imageUrls[0]}
              location={trip.itinerary?.[0]?.location ?? ""}
              tags={[trip.interests, trip.travelStyle]}
              price={trip.estimatedPrice}
            />
          ))}
        </div>

        <PagerComponent
          totalRecordsCount={loaderData.total}
          pageSize={loaderData.limit}
          currentPage={currentPage}
          click={(args) => handlePageChange(args.currentPage)}
        />
      </section>
    </main>
  );
}
