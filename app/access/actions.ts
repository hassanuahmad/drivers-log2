"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const handlePayment = async (email: string) => {
  console.log("BASE URL: ", BASE_URL);
  try {
    const res = await fetch(`${BASE_URL}/api/stripe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    console.log("res: ", res);

    if (!res.ok) {
      throw new Error("Failed to create checkout session");
    }

    const data = await res.json();

    if (data.url) {
      return { success: true, url: data.url };
    } else {
      throw new Error("No URL returned from checkout session creation");
    }
  } catch (error) {
    console.error("Error in handleSub:", error);
  }
};
