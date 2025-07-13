import { NextResponse } from 'next/server';

let cache: {
  date: string;
  data: {
    date: string;
    alternateSideParking: string;
    reason: string;
  };
} | null = null;

export async function GET() {
  const today = new Date().toISOString().split('T')[0];

  // Use cache if valid
  if (cache && cache.date === today) {
    return NextResponse.json(cache.data);
  }

  // Fetch from NYC Open Data
  const url = `https://data.cityofnewyork.us/resource/bc7w-a6em.json?$where=date='${today}'`;
  const res = await fetch(url);
  const data = await res.json();

  const isSuspended = data.length > 0;
  const reason = isSuspended ? data[0]?.reason || 'Unspecified Reason' : 'N/A';

  const result = {
    date: today,
    alternateSideParking: isSuspended ? 'Suspended' : 'In Effect',
    reason
  };

  // Cache it
  cache = {
    date: today,
    data: result
  };

  return NextResponse.json(result);
}