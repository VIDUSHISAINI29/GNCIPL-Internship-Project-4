import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

export default function PieChart({ holdings }) {
  const chartRef = useRef(null);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));

  // Observe dark mode changes dynamically
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!holdings || holdings.length === 0) return;

    const chart = echarts.getInstanceByDom(chartRef.current) || echarts.init(chartRef.current);
    chart.clear();

    const data = holdings.map(h => ({
      name: h.ticker,
      value: h.invested
    }));

    const option = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        textStyle: {
          color: isDark ? "#f0e6d2" : "#333",
        }
      },
      title: {
        text: "Holdings Distribution",
        left: "center",
        top: "0%",
        textStyle: {
          color: isDark ? "#f0e6d2" : "#333",
          fontSize: 18,
          fontWeight: "bold",
        }
      },
      legend: {
        top: "8%",
        left: "center",
        textStyle: {
          color: isDark ? "#f0e6d2" : "#333",
          fontWeight: "500"
        }
      },
      series: [
        {
          name: "Investment",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2
          },
          label: {
            show: true,
            position: "outside",
            formatter: "{b}: ${c}",
            color: isDark ? "#f0e6d2" : "#333"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: "bold",
              color: "#d4af37"
            }
          },
          data
        }
      ]
    };

    chart.setOption(option);
    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [holdings, isDark]);

  return (
    <div
      className="hidden md:flex justify-center items-center"
      ref={chartRef}
      style={{ height: 400, width: "100%" }}
    />
  );
}
