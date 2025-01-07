// import React, { useEffect, useState } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";

// import {
//   getCountProduct,
//   getProductStatisticsByCategory,
// } from "../../../services/productServices";
// import { getCountPet } from "../../../services/petServices";
// import { getCountUser } from "../../../services/userServices";
// import { getCountService } from "../../../services/serviceServices";
// import { getCountPost } from "../../../services/postServices";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// const Dashboard = () => {
//   const [countProduct, setCountProduct] = useState(0);
//   const [countPet, setCountPet] = useState(0);
//   const [countUser, setCountUser] = useState(0);
//   const [countService, setCountService] = useState(0);
//   const [countPost, setCountPost] = useState(0);
//   const [pieData, setPieData] = useState({
//     labels: [],
//     datasets: [
//       {
//         data: [],
//         backgroundColor: [],
//         hoverBackgroundColor: [],
//       },
//     ],
//   });

//   const fetchCountProduct = async () => {
//     const data = await getCountProduct();
//     console.log("check data", data);
//     if (data && data.errCode === 0) {
//       setCountProduct(data.data);
//     }
//   };

//   const fetchCountPet = async () => {
//     const data = await getCountPet();
//     if (data && data.errCode === 0) {
//       setCountPet(data.data);
//     }
//   };

//   const fetchCountUser = async () => {
//     const data = await getCountUser();
//     if (data && data.errCode === 0) {
//       console.log(data);
//       setCountUser(data.data);
//     }
//   };

//   const fetchCountService = async () => {
//     const data = await getCountService();
//     if (data && data.errCode === 0) {
//       setCountService(data.data);
//     }
//   };

//   const fetchCountPost = async () => {
//     const data = await getCountPost();
//     if (data && data.errCode === 0) {
//       setCountPost(data.data);
//     }
//   };

//   const fetchProductStatisticsByCategory = async () => {
//     try {
//       const data = await getProductStatisticsByCategory();
//       if (data && data.errCode === 0 && data.data.length > 0) {
//         const categories = data.data.map((item) => item.category);
//         const percentages = data.data.map((item) =>
//           parseFloat(item.percentage)
//         );
//         setPieData({
//           labels: categories,
//           datasets: [
//             {
//               data: percentages,
//               backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
//               hoverBackgroundColor: [
//                 "#FF6384",
//                 "#36A2EB",
//                 "#FFCE56",
//                 "#4BC0C0",
//               ],
//             },
//           ],
//         });
//       } else {
//         console.log("No data available or API error:", data.message);
//       }
//     } catch (error) {
//       console.log("Error fetching category data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCountProduct();
//     fetchCountPet();
//     fetchCountUser();
//     fetchCountService();
//     fetchCountPost();
//     fetchProductStatisticsByCategory();
//   }, []);

//   const stats = [
//     {
//       label: "Products",
//       value: countProduct,
//       icon: "📦",
//       color: "bg-blue-500",
//     },
//     { label: "Pets", value: countPet, icon: "🐾", color: "bg-green-500" },
//     {
//       label: "Users",
//       value: countUser,
//       icon: "👤",
//       color: "bg-yellow-500",
//     },
//     {
//       label: "Services",
//       value: countService,
//       icon: "🛠️",
//       color: "bg-red-500",
//     },
//     {
//       label: "Posts",
//       value: countPost,
//       icon: "✍️",
//       color: "bg-purple-500",
//     },
//   ];

//   // Mock data for revenue chart
//   const revenueData = {
//     labels: [
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//       "Sunday",
//     ],
//     datasets: [
//       {
//         label: "Revenue ($)",
//         data: [500, 700, 800, 600, 900, 1000, 750],
//         backgroundColor: "rgba(59, 130, 246, 0.7)", // Tailwind's blue-500
//         borderColor: "rgba(59, 130, 246, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const revenueOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Weekly Revenue",
//       },
//     },
//   };

//   return (
//     <div className="px-4">
//       <div className="space-y-5">
//         {/* Title */}
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-gray-700">
//             Dashboard Overview
//           </h1>
//           <p className="text-gray-500">Summary of your business activity</p>
//         </div>

//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
//           {stats.map((stat, index) => (
//             <div
//               key={index}
//               className={`flex items-center justify-between p-4 rounded-lg shadow-lg ${stat.color} text-white`}
//             >
//               <div className="text-4xl">{stat.icon}</div>
//               <div>
//                 <h2 className="text-lg font-semibold">{stat.label}</h2>
//                 <p className="text-2xl font-bold">{stat.value}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Charts Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Revenue Bar Chart */}
//           <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
//             <Bar data={revenueData} options={revenueOptions} />
//           </div>

//           {/* Product Category Pie Chart */}
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold text-gray-700 mb-4">
//               Product Distribution by Category
//             </h2>
//             {pieData ? (
//               <Pie data={pieData} />
//             ) : (
//               <p className="text-gray-500">Loading data...</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
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

import {
  getCountProduct,
  getProductStatisticsByCategory,
} from "../../../services/productServices";
import { getCountPet } from "../../../services/petServices";
import { getCountUser } from "../../../services/userServices";
import { getCountService } from "../../../services/serviceServices";
import { getCountPost } from "../../../services/postServices";
import { getRevenueStats } from "../../../services/orderServices"; // Đảm bảo bạn đã có API này

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
  const [countProduct, setCountProduct] = useState(0);
  const [countPet, setCountPet] = useState(0);
  const [countUser, setCountUser] = useState(0);
  const [countService, setCountService] = useState(0);
  const [countPost, setCountPost] = useState(0);
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
  });

  // Biến cho biểu đồ doanh thu
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [
      {
        label: "Doanh thu ($)",
        data: [],
        backgroundColor: "rgba(59, 130, 246, 0.7)", // Tailwind's blue-500
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Doanh thu theo tháng",
      },
    },
  };

  // Hàm lấy doanh thu theo năm và tháng
  const fetchRevenueData = async () => {
    try {
      const data = await getRevenueStats(selectedYear, selectedMonth);
      console.log("data thông kê", data);

      if (data && data.success === true) {
        // Chỉ có một đối tượng trong mảng `data` trả về, bạn có thể lấy doanh thu từ đó
        const revenue = data.data[0].totalRevenue;

        setRevenueData({
          labels: [`Tháng ${selectedMonth}/${selectedYear}`], // Hiển thị tháng/năm
          datasets: [
            {
              label: `Doanh thu tháng ${selectedMonth}/${selectedYear}`,
              data: [parseFloat(revenue)], // Doanh thu của tháng này
              backgroundColor: "rgba(59, 130, 246, 0.7)",
              borderColor: "rgba(59, 130, 246, 1)",
              borderWidth: 1,
            },
          ],
        });
      } else {
        console.log("Error fetching revenue data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  // Các API khác
  const fetchCountProduct = async () => {
    const data = await getCountProduct();
    if (data && data.errCode === 0) {
      setCountProduct(data.data);
    }
  };

  const fetchCountPet = async () => {
    const data = await getCountPet();
    if (data && data.errCode === 0) {
      setCountPet(data.data);
    }
  };

  const fetchCountUser = async () => {
    const data = await getCountUser();
    if (data && data.errCode === 0) {
      setCountUser(data.data);
    }
  };

  const fetchCountService = async () => {
    const data = await getCountService();
    if (data && data.errCode === 0) {
      setCountService(data.data);
    }
  };

  const fetchCountPost = async () => {
    const data = await getCountPost();
    if (data && data.errCode === 0) {
      setCountPost(data.data);
    }
  };

  const fetchProductStatisticsByCategory = async () => {
    try {
      const data = await getProductStatisticsByCategory();
      if (data && data.errCode === 0 && data.data.length > 0) {
        const categories = data.data.map((item) => item.category);
        const percentages = data.data.map((item) =>
          parseFloat(item.percentage)
        );
        setPieData({
          labels: categories,
          datasets: [
            {
              data: percentages,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
              ],
            },
          ],
        });
      }
    } catch (error) {
      console.log("Error fetching category data:", error);
    }
  };

  // Sử dụng useEffect để gọi API khi trang được load hoặc khi năm/tháng thay đổi
  useEffect(() => {
    fetchCountProduct();
    fetchCountPet();
    fetchCountUser();
    fetchCountService();
    fetchCountPost();
    fetchProductStatisticsByCategory();
    fetchRevenueData(); // Gọi dữ liệu doanh thu khi lần đầu render hoặc khi năm/tháng thay đổi
  }, [selectedYear, selectedMonth]); // Re-fetch doanh thu khi year/month thay đổi

  // Danh sách các thẻ thống kê
  const stats = [
    {
      label: "Products",
      value: countProduct,
      icon: "📦",
      color: "bg-blue-500",
    },
    { label: "Pets", value: countPet, icon: "🐾", color: "bg-green-500" },
    {
      label: "Users",
      value: countUser,
      icon: "👤",
      color: "bg-yellow-500",
    },
    {
      label: "Services",
      value: countService,
      icon: "🛠️",
      color: "bg-red-500",
    },
    {
      label: "Posts",
      value: countPost,
      icon: "✍️",
      color: "bg-purple-500",
    },
  ];

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

        {/* Year and Month Selector */}
        <div className="flex justify-center items-center space-x-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="p-2 border rounded-md"
          >
            {[2022, 2023, 2024, 2025].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="p-2 border rounded-md"
          >
            {[...Array(12).keys()].map((index) => (
              <option key={index} value={index + 1}>
                Tháng {index + 1}
              </option>
            ))}
          </select>
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
            {pieData ? (
              <Pie data={pieData} />
            ) : (
              <p className="text-gray-500">Loading data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
