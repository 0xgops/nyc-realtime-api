import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

export async function GET() {
  try {
    const proxiedUrl = 'https://corsproxy.io/?https://web.mta.info/status/serviceStatus.txt';
    const res = await fetch(proxiedUrl);
    const xml = await res.text();

    const parser = new XMLParser({ ignoreAttributes: false });
    const json = parser.parse(xml);

    const subwayLines = json?.service?.subway?.line;

    if (!subwayLines) {
      throw new Error('❌ Could not find subway line data in response');
    }

    const subwayStatus = subwayLines.map((line: any) => ({
      name: line.name,
      status: line.status,
      text: line.text || ''
    }));

    return NextResponse.json({
      updated: new Date().toISOString(),
      lines: subwayStatus
    });
  } catch (err: any) {
    console.error('❌ MTA fetch fail:', err.message || err);
    return NextResponse.json(
      { error: 'Failed to load subway status.' },
      { status: 500 }
    );
  }
}