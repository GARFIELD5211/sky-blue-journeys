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

// Two URL strategies: gviz (requires public share) and pub (requires publish to web with gid)
const SHEET_CSV_URL = (sheetId: string, tabName: string) => {
  // Primary: gviz URL uses tab name directly (requires "Anyone with the link" sharing)
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
};

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
  priceSharing: string;
  priceQuad: string;
  priceTriple: string;
  priceDouble: string;
  duration: string;
  highlight: boolean;
  hotel: string;
  makkahHotel: string;
  makkahNights: string;
  makkahDistance: string;
  madinaHotel: string;
  madinaNights: string;
  madinaDistance: string;
  distanceFromHaram: string;
  roomSharing: string;
  meals: string;
  transport: string;
  guide: string;
  flightRoute: string;
  flightSchedule: string;
  visa: string;
  ticket: string;
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

export interface TourData {
  name: string;
  from: string;
  to: string;
  packageType: string;
  duration: string;
  days: string;
  hotel: string;
  distanceFromHaram: string;
  roomSharing: string;
  meals: string;
  transport: string;
  guide: string;
  price: string;
  image: string;
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

  const headers = rows[0].map((h) => h.toLowerCase().replace(/\s+/g, "").trim());
  
  // Support both "package" and "name" as the package name column
  const pkgIdx = headers.indexOf("package") !== -1 ? headers.indexOf("package") : headers.indexOf("name");
  const priceIdx = headers.indexOf("price");
  const durationIdx = headers.indexOf("duration");
  const highlightIdx = headers.indexOf("highlight");
  const findH = (key: string) => headers.findIndex((h) => h.includes(key));
  const findExact = (key: string) => headers.indexOf(key);
  const hotelIdx = findH("hotel");
  const distIdx = findH("distance");
  const roomIdx = findH("room");
  const mealsIdx = findH("meals");
  const transportIdx = findH("transport");
  const guideIdx = findH("guide");
  const priceSharingIdx = findExact("pricesharing") !== -1 ? findExact("pricesharing") : findH("sharing");
  const priceQuadIdx = findExact("pricequad") !== -1 ? findExact("pricequad") : findH("quad");
  const priceTripleIdx = findExact("pricetriple") !== -1 ? findExact("pricetriple") : findH("triple");
  const priceDoubleIdx = findExact("pricedouble") !== -1 ? findExact("pricedouble") : findH("double");
  const makkahHotelIdx = findExact("makkahhotel");
  const makkahNightsIdx = findExact("makkahnights");
  const makkahDistIdx = findExact("makkahdistance");
  const madinaHotelIdx = findExact("madinahotel");
  const madinaNightsIdx = findExact("madinanights");
  const madinaDistIdx = findExact("madinadistance");
  const flightRouteIdx = findExact("flightroute");
  const flightScheduleIdx = findExact("flightschedule");
  const visaIdx = findExact("visa");
  const ticketIdx = findExact("ticket");

  if (pkgIdx === -1) return [];

  const getVal = (r: string[], idx: number) => idx !== -1 ? r[idx] || "" : "";

  // Check if using column-based features (Feature1, Feature2, ...) or row-based (Feature, Included)
  const featureIdx = headers.indexOf("feature");
  const includedIdx = headers.indexOf("included");
  
  // Find all Feature columns (Feature1, Feature2, Feature3, etc.)
  const featureColIndices: number[] = [];
  headers.forEach((h, idx) => {
    if (/^feature\d+$/.test(h)) {
      featureColIndices.push(idx);
    }
  });

  const useColumnFeatures = featureColIndices.length > 0;

  if (useColumnFeatures) {
    // Column-based: each row is a package, features are in Feature1, Feature2, etc.
    // Values like "Visa✓" = included, "Laundry✗" = not included
    return rows.slice(1)
      .filter((r) => r[pkgIdx])
      .map((r) => {
        const features = featureColIndices
          .map((idx) => {
            const val = r[idx] || "";
            if (!val) return null;
            const included = !val.includes("✗") && !val.includes("✘") && !val.toLowerCase().includes("no");
            const label = val.replace(/[✓✗✘]/g, "").trim();
            return { label, included };
          })
          .filter(Boolean) as { label: string; included: boolean }[];

        return {
          name: r[pkgIdx] || "",
          price: getVal(r, priceIdx),
          priceSharing: getVal(r, priceSharingIdx),
          priceQuad: getVal(r, priceQuadIdx),
          priceTriple: getVal(r, priceTripleIdx),
          priceDouble: getVal(r, priceDoubleIdx),
          duration: getVal(r, durationIdx),
          highlight: isTruthy(getVal(r, highlightIdx)),
          hotel: getVal(r, hotelIdx),
          makkahHotel: getVal(r, makkahHotelIdx),
          makkahNights: getVal(r, makkahNightsIdx),
          makkahDistance: getVal(r, makkahDistIdx),
          madinaHotel: getVal(r, madinaHotelIdx),
          madinaNights: getVal(r, madinaNightsIdx),
          madinaDistance: getVal(r, madinaDistIdx),
          distanceFromHaram: getVal(r, distIdx),
          roomSharing: getVal(r, roomIdx),
          meals: getVal(r, mealsIdx),
          transport: getVal(r, transportIdx),
          guide: getVal(r, guideIdx),
          flightRoute: getVal(r, flightRouteIdx),
          flightSchedule: getVal(r, flightScheduleIdx),
          visa: getVal(r, visaIdx),
          ticket: getVal(r, ticketIdx),
          features,
        };
      });
  }

  // No feature columns found — return packages without features if we have row data
  if (featureIdx === -1) {
    return rows.slice(1)
      .filter((r) => r[pkgIdx])
      .map((r) => ({
        name: r[pkgIdx] || "",
        price: getVal(r, priceIdx),
        priceSharing: getVal(r, priceSharingIdx),
        priceQuad: getVal(r, priceQuadIdx),
        priceTriple: getVal(r, priceTripleIdx),
        priceDouble: getVal(r, priceDoubleIdx),
        duration: getVal(r, durationIdx),
        highlight: isTruthy(getVal(r, highlightIdx)),
        hotel: getVal(r, hotelIdx),
        makkahHotel: getVal(r, makkahHotelIdx),
        makkahNights: getVal(r, makkahNightsIdx),
        makkahDistance: getVal(r, makkahDistIdx),
        madinaHotel: getVal(r, madinaHotelIdx),
        madinaNights: getVal(r, madinaNightsIdx),
        madinaDistance: getVal(r, madinaDistIdx),
        distanceFromHaram: getVal(r, distIdx),
        roomSharing: getVal(r, roomIdx),
        meals: getVal(r, mealsIdx),
        transport: getVal(r, transportIdx),
        guide: getVal(r, guideIdx),
        flightRoute: getVal(r, flightRouteIdx),
        flightSchedule: getVal(r, flightScheduleIdx),
        visa: getVal(r, visaIdx),
        ticket: getVal(r, ticketIdx),
        features: [],
      }));
  }

  const map = new Map<string, PackageData>();
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const name = r[pkgIdx] || "";
    if (!name) continue;

    if (!map.has(name)) {
      map.set(name, {
        name,
        price: getVal(r, priceIdx),
        priceSharing: getVal(r, priceSharingIdx),
        priceQuad: getVal(r, priceQuadIdx),
        priceTriple: getVal(r, priceTripleIdx),
        priceDouble: getVal(r, priceDoubleIdx),
        duration: getVal(r, durationIdx),
        highlight: isTruthy(getVal(r, highlightIdx)),
        hotel: getVal(r, hotelIdx),
        makkahHotel: getVal(r, makkahHotelIdx),
        makkahNights: getVal(r, makkahNightsIdx),
        makkahDistance: getVal(r, makkahDistIdx),
        madinaHotel: getVal(r, madinaHotelIdx),
        madinaNights: getVal(r, madinaNightsIdx),
        madinaDistance: getVal(r, madinaDistIdx),
        distanceFromHaram: getVal(r, distIdx),
        roomSharing: getVal(r, roomIdx),
        meals: getVal(r, mealsIdx),
        transport: getVal(r, transportIdx),
        guide: getVal(r, guideIdx),
        flightRoute: getVal(r, flightRouteIdx),
        flightSchedule: getVal(r, flightScheduleIdx),
        visa: getVal(r, visaIdx),
        ticket: getVal(r, ticketIdx),
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

  const url = SHEET_CSV_URL(GOOGLE_SHEET_ID, "Visa");
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

/**
 * Fetch tour data from the "Tours" tab.
 * Expected columns: Name, From, To, PackageType, Duration, Days, Hotel, DistanceFromHaram, RoomSharing, Meals, Transport, Guide, Price, Image
 */
export async function fetchTours(): Promise<TourData[]> {
  if (!GOOGLE_SHEET_ID) return [];

  const url = SHEET_CSV_URL(GOOGLE_SHEET_ID, "Tours");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch tours sheet: ${res.status}`);

  const csv = await res.text();
  const rows = parseCSV(csv);
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.toLowerCase().replace(/\s+/g, "").trim());
  const find = (key: string) => headers.findIndex((h) => h.includes(key));
  const nameIdx = find("name");
  const fromIdx = find("from");
  const toIdx = find("to");
  const typeIdx = find("packagetype") !== -1 ? find("packagetype") : find("type");
  const durIdx = find("duration");
  const daysIdx = find("days");
  const hotelIdx = find("hotel");
  const distIdx = find("distance");
  const roomIdx = find("room");
  const mealsIdx = find("meals");
  const transportIdx = find("transport");
  const guideIdx = find("guide");
  const priceIdx = find("price");
  const imgIdx = find("image");

  if (nameIdx === -1) return [];

  const get = (r: string[], idx: number) => idx !== -1 ? r[idx] || "" : "";

  return rows.slice(1)
    .filter((r) => r[nameIdx])
    .map((r) => ({
      name: get(r, nameIdx),
      from: get(r, fromIdx),
      to: get(r, toIdx),
      packageType: get(r, typeIdx),
      duration: get(r, durIdx),
      days: get(r, daysIdx),
      hotel: get(r, hotelIdx),
      distanceFromHaram: get(r, distIdx),
      roomSharing: get(r, roomIdx),
      meals: get(r, mealsIdx),
      transport: get(r, transportIdx),
      guide: get(r, guideIdx),
      price: get(r, priceIdx),
      image: get(r, imgIdx),
    }));
}
