import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { getAllUsers } from "~/appwrite/auth";
import { Header, TableCard } from "~/components";
import { cn, formatDate } from "~/lib/utils";
import type { Route } from "./+types/users";

export const loader = async () => {
  const { users, total } = await getAllUsers(10, 0);

  return { users, total };
};

export default function Users({ loaderData }: Route.ComponentProps) {
  const { users } = loaderData;

  return (
    <main className="all-users wrapper">
      <Header
        title="Manage Users"
        description="Filter, sort, and access detailed user profiles"
      />
      <TableCard>
        <GridComponent
          dataSource={users}
          gridLines="None"
          allowPaging={true}
          pageSettings={{ pageSize: 10 }}
          allowSorting={true}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="name"
              headerText="Name"
              width="200"
              textAlign="Left"
              template={(props: UserData) => (
                <div className="flex items-center gap-1.5 px-4">
                  <img
                    src={props.imageUrl || "/assets/images/david.webp"}
                    alt="user"
                    className="rounded-full size-8 aspect-square"
                    referrerPolicy="no-referrer"
                  />
                  <span>{props.name}</span>
                </div>
              )}
            />
            <ColumnDirective
              field="email"
              headerText="Email Address"
              width="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="joinedAt"
              headerText="Date Joined"
              width="140"
              textAlign="Left"
              template={({ joinedAt }: { joinedAt: string }) =>
                formatDate(joinedAt)
              }
            />
            <ColumnDirective
              field="userRole"
              headerText="Role"
              width="100"
              textAlign="Left"
              template={({ userRole }: UserData) => (
                <article
                  className={cn(
                    "userRole-column",
                    userRole === "user" ? "bg-success-50" : "bg-light-300"
                  )}
                >
                  <div
                    className={cn(
                      "size-1.5 rounded-full",
                      userRole === "user" ? "bg-success-500" : "bg-gray-500"
                    )}
                  />
                  <h3
                    className={cn(
                      "font-inter text-xs font-medium",
                      userRole === "user" ? "text-success-700" : "text-gray-500"
                    )}
                  >
                    {userRole}
                  </h3>
                </article>
              )}
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort]} />
        </GridComponent>
      </TableCard>
    </main>
  );
}
