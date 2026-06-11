"use client";

import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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

    // Group by date
    const grouped = paidOrders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      acc[date] = (acc[date] || 0) + order.total;
      return acc;
    }, {} as Record<string, number>);

    // Get last 30 days
    const result = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      result.push({
        date: dateStr,
        revenue: grouped[dateStr] || 0,
      });
    }

    return result;
  }, [orders]);

  if (orders.length === 0) {
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
