import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../service";

const Dashboard = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    api
      .get("/account/balance")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err, err.response.message);
      });
  }, []);
  return (
    <section className="w-full h-screen bg-gradient-to-b from-rose-800 via-rose-500 to-rose-800 space-y-4">
      <Appbar firstName={data?.userData?.firstName} />
      <BalanceComponent balance={data?.balance} />
      <UserComponent />
    </section>
  );
};

export default Dashboard;

function Appbar({ firstName }) {
  const navigate = useNavigate();

  const quotation =
    typeof firstName === "string" ? firstName[0].toUpperCase() : "NA";
  return (
    <div className="w-full py-4 px-6 flex justify-between items-center bg-rose-200 drop-shadow-lg">
      <h1
        className="rose-gradient text-xl font-bold font-inter bg-clip-text text-transparent cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        PayTM App
      </h1>
      <div className="flex items-center gap-2">
        <p className="text-lg">Hello</p>
        <div className="size-8 rounded-full flex items-center justify-center font-inter !bg-gradient-to-b rose-gradient">
          <p className="text-white font-bold text-lg font-nunito">
            {quotation}
          </p>
        </div>
      </div>
    </div>
  );
}

function BalanceComponent({ balance }) {
  const currentBalance = typeof balance === "number" ? balance : (0).toFixed(2);
  return (
    <div className="w-full items-center flex gap-4 px-10 mt-8 text-white">
      <h1 className="text-2xl font-nunito font-bold border-b-2 border-white">
        Your balance
      </h1>
      <h3 className="text-xl font-inter font-semibold">Rs {currentBalance}</h3>
    </div>
  );
}

function UserComponent() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/user/bulk").then((res) => setUsers(res.data.users));
  }, []);

  function handleSendMoney(id, firstName) {
    navigate(`/send?id=${id}&firstname=${firstName}`);
  }
  return (
    <div className="w-full mt-10 px-10 space-y-4">
      <h1 className="text-2xl text-white font-nunito font-bold">Users</h1>
      <input
        type="text"
        className="w-full px-4 py-2 rounded-md border-2 border-white focus:outline-none placeholder:text-gray-200 font-nunito text-white font-medium"
        placeholder="Search users..."
      />
      <div className="flex flex-col gap-6 mt-4">
        {users.length > 0 ? (
          users.map((item) => (
            <div
              key={item._id}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full flex items-center justify-center font-inter bg-rose-200 ">
                  <p className="text-black font-bold text-lg font-nunito">
                    {item.firstName[0].toUpperCase()}
                  </p>
                </div>
                <span className="text-white font-semibold font-nunito">
                  {item.firstName} {item.lastName}
                </span>
              </div>
              <button
                className="bg-rose-200 text-black px-4 py-2 rounded-md shadow-md text-sm font-medium font-inter cursor-pointer hover:bg-rose-300 transition-colors duration-200"
                onClick={() =>
                  handleSendMoney(item._id, item.firstName)
                }
              >
                Send Money
              </button>
            </div>
          ))
        ) : (
          <div className="text-white font-nunito font-semibold text-2xl text-center">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}
