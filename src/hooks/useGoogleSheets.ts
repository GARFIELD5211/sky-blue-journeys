import { useQuery } from "@tanstack/react-query";
import { fetchPackages, fetchVisas, fetchFlights, fetchTours, GOOGLE_SHEET_ID, type PackageData, type VisaData, type FlightData, type TourData } from "@/lib/googleSheets";

export function usePackages(tabName: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["packages", tabName],
    queryFn: () => fetchPackages(tabName),
    enabled: !!GOOGLE_SHEET_ID,
    staleTime: 60_000,
    refetchInterval: 60_000,
  });

  return { packages: data || [], isLoading };
}

export function useVisas() {
  const { data, isLoading } = useQuery({
    queryKey: ["visas"],
    queryFn: fetchVisas,
    enabled: !!GOOGLE_SHEET_ID,
    staleTime: 60_000,
    refetchInterval: 60_000,
  });

  return { visas: data || [], isLoading };
}

export function useFlights() {
  const { data, isLoading } = useQuery({
    queryKey: ["flights"],
    queryFn: fetchFlights,
    enabled: !!GOOGLE_SHEET_ID,
    staleTime: 60_000,
    refetchInterval: 60_000,
  });

  return { flights: data || [], isLoading };
}

export function useTours() {
  const { data, isLoading } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchTours,
    enabled: !!GOOGLE_SHEET_ID,
    staleTime: 60_000,
    refetchInterval: 60_000,
  });

  return { tours: data || [], isLoading };
}
