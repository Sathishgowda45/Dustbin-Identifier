function DustbinList({ bins, onReport }) {
  return (
    <div>
      <h2>Dustbins</h2>

      {bins.map((bin) => (
        <div className="card" key={bin._id}>
          <h3>{bin.binId}</h3>

          <p>City: {bin.city}</p>
          <p>Area: {bin.area}</p>
          <p>Street: {bin.street}</p>
          <p>Landmark: {bin.landmark}</p>

          <h4>Status: {bin.status}</h4>

          <button onClick={() => onReport(bin._id)}>
            Report Full
          </button>
        </div>
      ))}
    </div>
  );
}

export default DustbinList;