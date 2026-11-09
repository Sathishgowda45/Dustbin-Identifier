import { useEffect, useState } from "react";

import {
  getDustbins,
  addDustbin,
  updateDustbinStatus,
  getReports
} from "../services/api";

function AdminDashboard() {
  const [bins, setBins] = useState([]);
  const [reports, setReports] = useState([]);

  const [form, setForm] = useState({
    binId: "",
    city: "",
    area: "",
    street: "",
    landmark: ""
  });

  const loadData = async () => {
    setBins(await getDustbins());
    setReports(await getReports());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDustbin(form);

    alert("Dustbin Added Successfully!");

    setForm({
      binId: "",
      city: "",
      area: "",
      street: "",
      landmark: ""
    });

    loadData();
  };

  return (
    <div className="container">

      <h1>Admin Dashboard</h1>

      <h2>Add New Dustbin</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Bin ID"
          value={form.binId}
          onChange={(e) =>
            setForm({
              ...form,
              binId: e.target.value
            })
          }
        />

        <input
          placeholder="City"
          value={form.city}
          onChange={(e) =>
            setForm({
              ...form,
              city: e.target.value
            })
          }
        />

        <input
          placeholder="Area"
          value={form.area}
          onChange={(e) =>
            setForm({
              ...form,
              area: e.target.value
            })
          }
        />

        <input
          placeholder="Street"
          value={form.street}
          onChange={(e) =>
            setForm({
              ...form,
              street: e.target.value
            })
          }
        />

        <input
          placeholder="Landmark"
          value={form.landmark}
          onChange={(e) =>
            setForm({
              ...form,
              landmark: e.target.value
            })
          }
        />

        <button type="submit">
          Add Dustbin
        </button>

      </form>

      <hr />

      <h2>All Dustbins</h2>

      {bins.map((bin) => (
        <div className="card" key={bin._id}>

          <h3>{bin.binId}</h3>

          <p>Status: {bin.status}</p>

          {bin.status === "Full" && (
            <button
              onClick={async () => {
                await updateDustbinStatus(
                  bin._id,
                  "Available"
                );

                loadData();
              }}
            >
              Mark Available
            </button>
          )}

        </div>
      ))}

      <hr />

      <h2>Reports</h2>

      {reports.map((report) => (
        <div className="card" key={report._id}>

          <p>{report.message}</p>

          <p>Status: {report.status}</p>

          {report.dustbinId && (
            <p>
              Dustbin: {report.dustbinId.binId}
            </p>
          )}

        </div>
      ))}

    </div>
  );
}

export default AdminDashboard;