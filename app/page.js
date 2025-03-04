"use client";

import React, { useState } from "react";

export default function Page() {
  const [searchInput, setSearchInput] = useState("");
  const [cryptoData, setCryptoData] = useState(null);
  const [error, setError] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    if (!searchInput) return;

    try {
      const res = await fetch(`/api/crypto?token=${searchInput}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setCryptoData(null);
      } else {
        setCryptoData(data.data);
        setError(null);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch crypto data");
      setCryptoData(null);
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1>Crypto Price Finder</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter token symbol (e.g., BTC)"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", fontSize: "16px", marginLeft: "10px" }}>
          Search
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {cryptoData && (
        <div style={{ marginTop: "20px" }}>
          {/* نمایش داده‌ها برای توکن مورد نظر */}
          {cryptoData[searchInput.toUpperCase()] ? (
            <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px", display: "inline-block" }}>
              <h2>{searchInput.toUpperCase()}</h2>
              <p>
                <strong>Price:</strong> $
                {cryptoData[searchInput.toUpperCase()].quote.USD.price.toFixed(2)}
              </p>
              <p>
                <strong>Market Cap:</strong> $
                {cryptoData[searchInput.toUpperCase()].quote.USD.market_cap.toLocaleString()}
              </p>
            </div>
          ) : (
            <p>No data found for {searchInput.toUpperCase()}</p>
          )}
        </div>
      )}
    </div>
  );
}
