import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Travel Agency Dashboard" },
    {
      name: "description",
      content: "Welcome to our brand new Travel Admin Dashboard!",
    },
  ];
}

export default function Home() {
  return <div>Home</div>;
}
