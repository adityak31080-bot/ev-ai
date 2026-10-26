export default async (request) => {
  if (request.method !== "POST") {
    return Response.json(
      { error: "POST requests only" },
      { status: 405 }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "API key is not configured in Netlify." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const message = String(body.message || "").trim();

    if (!message) {
      return Response.json(
        { error: "Please enter a message." },
        { status: 400 }
      );
    }

    const response = await
