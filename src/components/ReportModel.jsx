import { useState } from "react";

function ReportModel({ dustbin, onSubmit, onClose }) {
  const [message, setMessage] = useState("Dustbin is full");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(dustbin._id, message);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          minWidth: "350px",
        }}
      >
        <h3>Report Dustbin: {dustbin.binId}</h3>

        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            required
          />

          <button type="submit">Submit Report</button>
          <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportModel;
