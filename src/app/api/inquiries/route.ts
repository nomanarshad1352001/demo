import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { companyName, contactName, email, phone, country, inquiryType, productInterest, estimatedQuantity, message } = body;

    if (!companyName || !contactName || !email || !inquiryType) {
      return Response.json(
        { error: "Missing required fields: companyName, contactName, email, inquiryType" },
        { status: 400 }
      );
    }

    const [inserted] = await db
      .insert(inquiries)
      .values({
        companyName,
        contactName,
        email,
        phone: phone || null,
        country: country || null,
        inquiryType,
        productInterest: productInterest || null,
        estimatedQuantity: estimatedQuantity || null,
        message: message || null,
      })
      .returning();

    return Response.json({ success: true, id: inserted.id }, { status: 201 });
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return Response.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allInquiries = await db
      .select()
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt))
      .limit(50);

    return Response.json(allInquiries);
  } catch (error) {
    console.error("Fetch inquiries error:", error);
    return Response.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}
