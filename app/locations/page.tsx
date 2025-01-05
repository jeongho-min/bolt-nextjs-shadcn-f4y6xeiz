import { LocationFinder } from "./components/location-finder";
import { LocationList } from "./components/location-list";
import { LocationMap } from "./components/location-map";

export default function LocationsPage() {
  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">지점 찾기</h1>
        {/* <LocationFinder /> */}
        <LocationMap />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">전체 지점</h2>
          <LocationList />
        </div>
      </div>
    </main>
  );
}
