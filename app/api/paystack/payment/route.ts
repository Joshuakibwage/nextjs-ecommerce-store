import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    console.log("Payment API request received");
    const { email, amount, orderId } = await request.json();

    const resp = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
        body: JSON.stringify({
          email,
          amount: amount * 100,
          reference: orderId, // use orderId as reference for easy verification later
          callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/verify`,
          metadata: {
            orderId,
          },
        }),
      }
    );

    const data = await resp.json();

    if (!resp.ok) {
      console.log("Failed response from paystack:", data);
      return NextResponse.json(
        { error: "Failed to initialize paystack transaction", details: data },
        { status: resp.status }
      );
    }

    console.log("Payment API Response:", data);

    // Map to camelCase for the frontend
    return NextResponse.json({
      success: true,
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
      accessCode: data.data.access_code,
    });

  } catch (error) {
    console.log("Payment API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    console.log("Payment API Finished");
  }
}