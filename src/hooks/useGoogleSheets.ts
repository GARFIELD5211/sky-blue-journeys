import { useQuery } from "@tanstack/react-query";
import { fetchPackages, fetchVisas, GOOGLE_SHEET_ID, type PackageData, type VisaData } from "@/lib/googleSheets";

export function usePackages(tabName: string, fallback: PackageData[]) {
  const { data } = useQuery({
    queryKey: ["packages", tabName],
    queryFn: () => fetchPackages(tabName),
    enabled: !!GOOGLE_SHEET_ID,
    staleTime: 60_000, // refetch every 60s for near-real-time updates
    refetchInterval: 60_000,
  });

  return data && data.length > 0 ? data : fallback;
}

export function useVisas(fallback: VisaData[]) {
  const { data } = useQuery({
    queryKey: ["visas"],
    queryFn: fetchVisas,
    enabled: !!GOOGLE_SHEET_ID,
    staleTime: 60_000,
    refetchInterval: 60_000,
  });

  return data && data.length > 0 ? data : fallback;
}
