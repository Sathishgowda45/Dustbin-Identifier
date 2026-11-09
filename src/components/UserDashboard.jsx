import { useEffect, useState } from "react";
import {
  getDustbins,
  createReport
} from "../services/api";

import DustbinList from "./DustbinList";

function UserDashboard() {
  const [bins, setBins] = useState([]);

  const loadBins = async () => {
    const data = await getDustbins();
    setBins(data);
  };

  useEffect(() => {
    loadBins();
  }, []);

  const reportFull = async (id) => {
    await createReport(
      id,
      "Dustbin is full. Please clean it."
    );

    alert("Report sent successfully!");

    loadBins();
  };

  return (
    <div className="container">
      <h1>User Dashboard</h1>

      <DustbinList
        bins={bins}
        onReport={reportFull}
      />
    </div>
  );
}

export default UserDashboard;