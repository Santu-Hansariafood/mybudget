import React, { useRef, useEffect } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = {
    profileImage: "https://i.pravatar.cc/150?img=12",
  };
  const username = localStorage.getItem("username") || "User";
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      new Calendar(calendarRef.current, {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        selectable: true,
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        },
        events: [
          {
            title: "Sample Event",
            date: new Date().toISOString().split("T")[0],
          },
        ],
      }).render();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome back, {username} 👋
            </h2>
            <p className="text-gray-500">{currentDate}</p>
          </div>
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
          />
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Your Calendar
          </h3>
          <div ref={calendarRef} className="fc fc-media-screen"></div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => navigate("/addbudget")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            + Add Budget
          </button>
          <button
            onClick={() => navigate("/budget")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            + Show Budget
          </button>
          <button
            onClick={() => navigate("/addtransaction")}
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            + Add Transaction
          </button>
          <button
            onClick={() => navigate("/transaction")}
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            + Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
