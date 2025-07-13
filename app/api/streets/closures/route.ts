import { NextResponse } from 'next/server';

export async function GET() {
  const url = `https://data.cityofnewyork.us/resource/td5q-ry6d.json?$limit=10`;

  try {
    // Setup 5-second timeout controller
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`NYC API returned HTTP ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error('Expected array but got: ' + typeof data);
    }

    const closures = data.map((item: any) => ({
      street: item.street_name || item.on_street_name || 'Unknown',
      borough: item.borough || item.borough_name || 'N/A',
      reason: item.eventtype || item.event_type || 'N/A',
      start: item.start_date_time || item.startdatetime || 'N/A',
      end: item.end_date_time || item.enddatetime || 'N/A',
      sponsor: item.sponsor || item.org_name || item.organization || 'N/A'
    }));

    return NextResponse.json({
      count: closures.length,
      closures
    });

  } catch (err: any) {
    console.error('❌ NYC fetch full error:', err.name || err.message || err);

    return NextResponse.json({
      count: 0,
      closures: [],
      warning: 'NYC street closure data unavailable',
      error: err.name || err.message || 'Unknown error'
    });
  }
}