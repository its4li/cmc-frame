// app/api/crypto/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  // دریافت پارامتر token از Query String
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token symbol or name is required" }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_CMC_API_KEY;
  const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";

  try {
    const response = await axios.get(url, {
      params: { symbol: token.toUpperCase() }, // فرض می‌کنیم جستجو بر اساس نماد است
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
      },
    });
    // استخراج داده قیمت ارز از پاسخ
    const data = response.data.data;
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching crypto data:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to fetch crypto data" }, { status: 500 });
  }
}
