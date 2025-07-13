import { NextResponse } from 'next/server';

export async function GET() {
  const base = 'http://localhost:3000/api';

  // Helper to fetch any sub-endpoint safely
  const fetchJSON = async (path: string) => {
    try {
      const res = await fetch(`${base}${path}`);
      return await res.json();
    } catch (err) {
      return { error: true, message: `Failed to fetch ${path}` };
    }
  };

  const [parking, weather, mta, streets] = await Promise.all([
    fetchJSON('/parking/today'),
    fetchJSON('/weather/alerts'),
    fetchJSON('/mta/status'),       // still mocked or down
    fetchJSON('/streets/closures')  // fallback works!
  ]);

  const vibe = {
    date: new Date().toISOString().split('T')[0],
    parking,
    weather: {
      count: weather?.count || 0,
      alerts: weather?.alerts || [],
    },
    mta: {
      lines: mta?.lines || [],
      status: mta?.error ? 'Unavailable' : 'Live'
    },
    streets: {
      count: streets?.count || 0,
      closures: streets?.closures || [],
      warning: streets?.warning || null
    }
  };

  return NextResponse.json(vibe);
}