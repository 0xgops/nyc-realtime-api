import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://api.weather.gov/alerts/active?area=NY');
  const data = await res.json();

  // Extract only relevant fields from active alerts
  const alerts = (data.features || []).map((alert: any) => ({
    event: alert.properties.event,
    severity: alert.properties.severity,
    headline: alert.properties.headline,
    description: alert.properties.description,
    effective: alert.properties.effective,
    expires: alert.properties.expires
  }));

  return NextResponse.json({
    count: alerts.length,
    alerts
  });
}