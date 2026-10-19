import {
  FaUsers,
  FaHeart,
  FaCalendarCheck,
  FaClock,
} from "react-icons/fa6";

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Welcome to Care.io 👋
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <FaUsers className="text-3xl text-[#1479C9]" />
            <h2 className="card-title">Users</h2>
            <p className="text-3xl font-bold">120</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <FaHeart className="text-3xl text-[#F34E65]" />
            <h2 className="card-title">Services</h2>
            <p className="text-3xl font-bold">12</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <FaCalendarCheck className="text-3xl text-success" />
            <h2 className="card-title">Bookings</h2>
            <p className="text-3xl font-bold">45</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <FaClock className="text-3xl text-warning" />
            <h2 className="card-title">Pending</h2>
            <p className="text-3xl font-bold">8</p>
          </div>
        </div>
      </div>
    </div>
  );
}