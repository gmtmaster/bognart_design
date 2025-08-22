// app/api/umami/route.js
import { NextResponse } from "next/server";

const UMAMI_URL = "https://api.umami.is/v1";
const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
const UMAMI_KEY = process.env.UMAMI_API_KEY;

const VALID_TYPES = [
    "stats",
    "pageviews",
    "events",
    "referrers",
    "browsers",
    "devices",
    "operating-systems",
    "countries",
];

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "stats";

    if (!VALID_TYPES.includes(type)) {
        return NextResponse.json({ error: true, message: "Invalid type" }, { status: 400 });
    }

    const url = `${UMAMI_URL}/websites/${WEBSITE_ID}/${type}`;
    console.log("[Umami Proxy] Fetching:", url);

    try {
        const res = await fetch(url, {
            headers: { Authorization: `Bearer ${UMAMI_KEY}` },
            cache: "no-store",
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: true, status: res.status, message: await res.text() },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: true, message: err.message }, { status: 500 });
    }
}
