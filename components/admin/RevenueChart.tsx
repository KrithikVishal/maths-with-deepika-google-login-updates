"use client";

import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Note: lib/orders.ts exports an OrderRow for e-commerce orders with a different shape.
// This component's OrderRow describes revenue-chart-specific data; keeping it local is intentional.
type OrderRow = {
  createdAt: string;
  total: number;
  paymentStatus?: string;
  status?: string;
};

export function RevenueChart({ orders }: { orders: OrderRow[] }) {
  const data = useMemo(() => {
    // Filter paid orders
    const paidOrders = orders.filter((o) => o.paymentStatus === "paid");

    // Group by UTC date (YYYY-MM-DD) to avoid timezone-based day collisions across years
    const grouped = paidOrders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toISOString().slice(0, 10); // "YYYY-MM-DD"
      acc[date] = (acc[date] || 0) + order.total;
      return acc;
    }, {} as Record<string, number>);

    // Get last 30 days in UTC
    const result = [];
    const now = Date.now();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now - i * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().slice(0, 10); // "YYYY-MM-DD"
      const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
      result.push({
        date: label,
        revenue: grouped[dateStr] || 0,
      });
    }

    return result;
  }, [orders]);

  if (!orders.some((o) => o.paymentStatus === "paid")) {
    return <div className="p-10 text-center text-ink/60">No revenue data yet.</div>;
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1B2A53" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#1B2A53" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8A8D9B" }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8A8D9B" }} tickFormatter={(val) => `₹${val}`} />
          <Tooltip
            contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
            itemStyle={{ color: "#1B2A53", fontWeight: "bold" }}
            formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, "Revenue"]}
          />
          <Area type="monotone" dataKey="revenue" stroke="#1B2A53" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
