"use client";
import { useState } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

export default function CategoryCharts({ data }) {
    console.log(data);

    if (!data || data.length === 0) {
        return <p>No spending in this range.</p>
    }

    return (
        <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-zinc-500">Spending by Category</p>

            {/* Give the chart a fixed height */}
            <div className="mt-3 w-full" style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="spent_cents"      // <- must match your data field
                            nameKey="category"         // <- must match your label field
                            innerRadius={40}           // <- makes it a donut
                            outerRadius={100}
                            paddingAngle={2}
                        />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );

}

