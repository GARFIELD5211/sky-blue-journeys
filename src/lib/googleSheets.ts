/**
 * Google Sheets Integration
 * 
 * HOW TO SET UP:
 * 1. Create a Google Sheet with 3 tabs: "Hajj", "Umrah", "Visas"
 * 2. Go to File → Share → Publish to the web → Entire Document → CSV → Publish
 * 3. Copy the Sheet ID from the URL (the long string between /d/ and /edit)
 * 4. Paste it in the GOOGLE_SHEET_ID constant below
 * 
 * SHEET FORMAT — "Hajj" and "Umrah" tabs:
 * | Package   | Price   | Duration | Feature1          | Feature2         | ... |
 * |-----------|---------|----------|-------------------|------------------|-----|
 * | Economy   | $4,500  | 21 Days  | Return Flights    | Hajj Visa        | ... |
 * | Standard  | $6,500  | 21 Days  | Return Flights    | Hajj Visa        | ... |
 * | Premium   | $12,000 | 25 Days  | Return Flights(B) | Hajj Visa        | ... |
 * 
 * Row 1 = headers. Each feature column name = feature label.
 * Cell value: "yes" or "true" or "1" = included, anything else or empty = not included.
 * OR just put the feature name in the cell (non-empty = included, empty = not included).
 * 
 * ALTERNATIVE simpler format:
 * | Package | Price | Duration | Highlight | Feature | Included |
 * Each row is one feature of one package. "Highlight" = "yes" for the popular package.
 * 
 * SHEET FORMAT — "Visas" tab:
 * | Country      | Flag | Types              | ProcessingTime | SuccessRate |
 * |--------------|------|--------------------|----------------|-------------|
 * | UAE / Dubai   | 🇦🇪  | Tourist,Business,Work | 3-5 Days       | 99%         |
 */

// ⚠️ REPLACE THIS with your actual Google Sheet ID
export const GOOGLE_SHEET_ID = "13cl13WG0FEXmW5LsAUB5UYe-2S3fOABotQGrlSSzYiU";

const SHEET_CSV_URL = (sheetId: string, tabName: string) =>
  `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;

function parseCSV(csv: string): string[][] {
  const rows: string[][] = [];
  let current = "";
  let inQuotes = false;
  let row: string[] = [];

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    if (inQuotes) {
      if (char === '"' && csv[i + 1] === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        row.push(current.trim());
        current = "";
      } else if (char === "\n" || (char === "\r" && csv[i + 1] === "\n")) {
        row.push(current.trim());
        rows.push(row);
        row = [];
        current = "";
        if (char === "\r") i++;
      } else {
        current += char;
      }
    }
  }
  if (current || row.length) {
    row.push(current.trim());
    rows.push(row);
  }
  return rows;
}

export interface PackageData {
  name: string;
  price: string;
  duration: string;
  highlight: boolean;
  features: { label: string; included: boolean }[];
}

export interface VisaData {
  country: string;
  flag: string;
  types: string[];
  processingTime: string;
  successRate: string;
}

export interface FlightData {
  from: string;
  to: string;
  airline: string;
  departDate: string;
  arriveDate: string;
  departTime: string;
  arriveTime: string;
  price: string;
  class: string;
  stops: string;
}

/**
 * Fetch package data from a Google Sheet tab.
 * Expected columns: Package, Price, Duration, Highlight, Feature, Included
 * Each row = one feature line. Multiple rows per package.
 */
export async function fetchPackages(tabName: string): Promise<PackageData[]> {
  if (!GOOGLE_SHEET_ID) return [];

  const url = SHEET_CSV_URL(GOOGLE_SHEET_ID, tabName);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`);

  const csv = await res.text();
  const rows = parseCSV(csv);
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.toLowerCase().trim());
  const pkgIdx = headers.indexOf("package");
  const priceIdx = headers.indexOf("price");
  const durationIdx = headers.indexOf("duration");
  const highlightIdx = headers.indexOf("highlight");
  const featureIdx = headers.indexOf("feature");
  const includedIdx = headers.indexOf("included");

  if (pkgIdx === -1 || featureIdx === -1) return [];

  const map = new Map<string, PackageData>();

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const name = r[pkgIdx] || "";
    if (!name) continue;

    if (!map.has(name)) {
      map.set(name, {
        name,
        price: r[priceIdx] || "",
        duration: r[durationIdx] || "",
        highlight: isTruthy(r[highlightIdx]),
        features: [],
      });
    }

    const feature = r[featureIdx] || "";
    if (feature) {
      map.get(name)!.features.push({
        label: feature,
        included: includedIdx !== -1 ? isTruthy(r[includedIdx]) : true,
      });
    }
  }

  return Array.from(map.values());
}

/**
 * Fetch visa data from the "Visas" tab.
 * Expected columns: Country, Flag, Types, ProcessingTime, SuccessRate
 */
export async function fetchVisas(): Promise<VisaData[]> {
  if (!GOOGLE_SHEET_ID) return [];

  const url = SHEET_CSV_URL(GOOGLE_SHEET_ID, "Visas");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch visas sheet: ${res.status}`);

  const csv = await res.text();
  const rows = parseCSV(csv);
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.toLowerCase().replace(/\s+/g, "").trim());
  const countryIdx = headers.indexOf("country");
  const flagIdx = headers.indexOf("flag");
  const typesIdx = headers.indexOf("types");
  const ptIdx = headers.findIndex((h) => h.includes("processing"));
  const srIdx = headers.findIndex((h) => h.includes("success"));

  if (countryIdx === -1) return [];

  return rows.slice(1)
    .filter((r) => r[countryIdx])
    .map((r) => ({
      country: r[countryIdx] || "",
      flag: r[flagIdx] || "🌍",
      types: (r[typesIdx] || "").split(",").map((t) => t.trim()).filter(Boolean),
      processingTime: r[ptIdx] || "",
      successRate: r[srIdx] || "",
    }));
}

function isTruthy(val: string | undefined): boolean {
  if (!val) return false;
  const v = val.toLowerCase().trim();
  return v === "yes" || v === "true" || v === "1";
}

/**
 * Fetch flight data from the "Flights" tab.
 * Expected columns: From, To, Airline, DepartDate, ArriveDate, DepartTime, ArriveTime, Price, Class, Stops
 */
export async function fetchFlights(): Promise<FlightData[]> {
  if (!GOOGLE_SHEET_ID) return [];

  const url = SHEET_CSV_URL(GOOGLE_SHEET_ID, "Flights");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch flights sheet: ${res.status}`);

  const csv = await res.text();
  const rows = parseCSV(csv);
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.toLowerCase().replace(/\s+/g, "").trim());
  const fromIdx = headers.indexOf("from");
  const toIdx = headers.indexOf("to");
  const airlineIdx = headers.indexOf("airline");
  const ddIdx = headers.indexOf("departdate");
  const adIdx = headers.indexOf("arrivedate");
  const dtIdx = headers.indexOf("departtime");
  const atIdx = headers.indexOf("arrivetime");
  const priceIdx = headers.indexOf("price");
  const classIdx = headers.indexOf("class");
  const stopsIdx = headers.indexOf("stops");

  if (fromIdx === -1 || toIdx === -1) return [];

  return rows.slice(1)
    .filter((r) => r[fromIdx] && r[toIdx])
    .map((r) => ({
      from: r[fromIdx] || "",
      to: r[toIdx] || "",
      airline: r[airlineIdx] || "",
      departDate: r[ddIdx] || "",
      arriveDate: r[adIdx] || "",
      departTime: r[dtIdx] || "",
      arriveTime: r[atIdx] || "",
      price: r[priceIdx] || "",
      class: r[classIdx] || "",
      stops: r[stopsIdx] || "",
    }));
}
