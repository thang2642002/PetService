import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  // Mock data for statistics
  const stats = [
    { label: "Products", value: 120, icon: "📦", color: "bg-blue-500" },
    { label: "Pets", value: 45, icon: "🐾", color: "bg-green-500" },
    { label: "Users", value: 230, icon: "👤", color: "bg-yellow-500" },
    { label: "Services", value: 15, icon: "🛠️", color: "bg-red-500" },
    { label: "Posts", value: 85, icon: "✍️", color: "bg-purple-500" },
  ];

  // Mock data for revenue chart
  const revenueData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Revenue ($)",
        data: [500, 700, 800, 600, 900, 1000, 750],
        backgroundColor: "rgba(59, 130, 246, 0.7)", // Tailwind's blue-500
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Revenue",
      },
    },
  };

  // Mock data for pie chart (category distribution)
  const pieData = {
    labels: ["Food", "Toys", "Accessories", "Medicine"],
    datasets: [
      {
        data: [50, 30, 15, 25], // Mock percentages
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="px-4">
      <div className="space-y-5">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-700">
            Dashboard Overview
          </h1>
          <p className="text-gray-500">Summary of your business activity</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg shadow-lg ${stat.color} text-white`}
            >
              <div className="text-4xl">{stat.icon}</div>
              <div>
                <h2 className="text-lg font-semibold">{stat.label}</h2>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Bar Chart */}
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <Bar data={revenueData} options={revenueOptions} />
          </div>

          {/* Product Category Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Product Distribution by Category
            </h2>
            <Pie data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
