import React, { useEffect, useRef, useState, useContext } from "react";
import * as echarts from "echarts";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function PortfolioChart({id, title = "Portfolio Value Over Time" }) {
  const { token, user } = useContext(AuthContext);
  const API = import.meta.env.VITE_BACKEND_URL;

  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [transactions, setTransactions] = useState([]);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));

  // Observe dark mode changes dynamically
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Fetch portfolio(s) for the user
  useEffect(() => {
    if (!user || !token) return;

    const fetchUserPortfolio = async () => {
      try {
  

        const txRes = await axios.get(`${API}/portfolio/transaction/portfolio/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTransactions(txRes.data.transactions || []);
      } catch (err) {
        console.error("Failed to fetch portfolio/transactions:", err);
      }
    };

    fetchUserPortfolio();
  }, [user, token, API]);

  // Render chart
  useEffect(() => {
    if (!transactions.length || !chartRef.current) return;

    if (chartInstance.current) chartInstance.current.dispose();
    const chart = echarts.init(chartRef.current);
    chartInstance.current = chart;

    const dates = transactions.map((t) => new Date(t.date).toLocaleDateString());
    const values = transactions.map((t) => t.qty * t.price);

    const option = {
      backgroundColor: "transparent",
      title: {
        text: title,
        left: "center",
        textStyle: {
          color: "#D4AF37",
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: isDark ? "#1C1C1C" : "#fff",
        textStyle: { color: isDark ? "#FFD700" : "#000" },
        borderColor: isDark ? "#333" : "#ddd",
      },
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      xAxis: {
        type: "category",
        data: dates,
        axisLine: { lineStyle: { color: isDark ? "#aaa" : "#333" } },
        axisLabel: { color: isDark ? "#FFD700" : "#000" },
      },
      yAxis: {
        type: "value",
        axisLine: { lineStyle: { color: isDark ? "#aaa" : "#333" } },
        axisLabel: { color: isDark ? "#FFD700" : "#000" },
        splitLine: {
          lineStyle: { color: isDark ? "rgba(200,200,200,0.1)" : "rgba(0,0,0,0.1)" },
        },
      },
      series: [
        {
          data: values,
          type: "line",
          smooth: true,
          lineStyle: { color: "#D4AF37", width: 2 },
          areaStyle: { color: isDark ? "rgba(212,175,55,0.15)" : "rgba(212,175,55,0.25)" },
          symbol: "circle",
          symbolSize: 5,
          itemStyle: { color: "#FFD700" },
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [transactions, title, isDark]);

  if (!transactions.length) {
    return (
      <p className="p-4 text-center text-gray-500 dark:text-textLight">
        No transaction data yet.
      </p>
    );
  }

  return <div ref={chartRef} className="w-full h-72 sm:h-80 md:h-[400px]" />;
}
