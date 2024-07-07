import Standings from "@/app/components/dashboard/cards/standings/standings";

export default function Page() {
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <Standings />
    </div>
  );
}
