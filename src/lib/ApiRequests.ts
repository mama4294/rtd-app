export async function getStopDetails(stopID: string) {
  const url = `https://nodejs-prod.rtd-denver.com/api/v2/nextride/stops/${stopID}`;
  const headers = new Headers({
    authority: "nodejs-prod.rtd-denver.com",
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "api-key": "e7b926a1-cddb-46e7-bb27-6d134e5b5feb",
    dnt: "1",
    "if-none-match": 'W/"9c5-oXAWjEx6QWwhR6cnavtSTc3zKwQ"',
    origin: "https://app.rtd-denver.com",
    referer: "https://app.rtd-denver.com/",
  });

  const request = new Request(url, {
    method: "GET",
    headers: headers,
  });

  const res = await fetch(request, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
