import { useAuth } from "../AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div>
          <span className="mr-4">{user?.email}</span>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
      <p>This is the protected Irrixa dashboard.</p>
    </div>
  );
};

export default Dashboard;
