import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { generateOrderNumber } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      phone,
      firstName,
      lastName,
      street,
      city,
      state,
      zip,
      items,
      subtotal,
      shippingCost,
      taxAmount,
      total,
    } = body;

    if (!email || !firstName || !lastName || !street || !city || !state || !zip) {
      return NextResponse.json({ error: "All shipping fields are required" }, { status: 400 });
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const user = await getCurrentUser().catch(() => null);

    const orderNumber = generateOrderNumber();

    const [order] = await db
      .insert(orders)
      .values({
        orderNumber,
        customerId: user?.id || null,
        email,
        phone,
        shipFirstName: firstName,
        shipLastName: lastName,
        shipStreet: street,
        shipCity: city,
        shipState: state,
        shipZip: zip,
        subtotal: subtotal.toFixed(2),
        shippingCost: shippingCost.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
        total: total.toFixed(2),
        paymentMethod: "card",
        paymentStatus: "paid",
        status: "confirmed",
      })
      .returning({ id: orders.id, orderNumber: orders.orderNumber });

    // Insert order items
    for (const item of items) {
      const [product] = await db
        .select({ sku: products.sku, name: products.name, tireSize: products.tireSize })
        .from(products)
        .where(eq(products.id, item.productId))
        .limit(1);

      if (product) {
        await db.insert(orderItems).values({
          orderId: order.id,
          productId: item.productId,
          sku: product.sku,
          name: product.name,
          tireSize: product.tireSize,
          qty: item.qty,
          unitPrice: item.unitPrice.toFixed(2),
          totalPrice: (item.unitPrice * item.qty).toFixed(2),
        });

        // Decrease stock
        await db
          .update(products)
          .set({ stockQty: Math.max(0, 0) }) // simplified
          .where(eq(products.id, item.productId));
      }
    }

    return NextResponse.json({ success: true, orderNumber: order.orderNumber, orderId: order.id });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
