type Sensor = {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  pumpStatus: number;
  timestamp: string;
  _id?: string;
};

export default function SensorTable({ data }: { data: Sensor[] }) {
  return (
    <div className="table-responsive rounded shadow-sm bg-white fade-in">
      <table className="table table-striped table-hover align-middle mb-0">
        <thead className="table-success">
          <tr>
            <th>Waktu</th>
            <th>Suhu (°C)</th>
            <th>Kelembapan (%)</th>
            <th>Tanah</th>
            <th>Pompa</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row._id ?? i}>
              <td className="small">
                {new Date(row.timestamp).toLocaleString()}
              </td>
              <td>{row.temperature}</td>
              <td>{row.humidity}</td>
              <td>{row.soilMoisture}</td>
              <td>
                <span className={`status-badge ${row.pumpStatus === 1 ? "on" : "off"}`}>
                  {row.pumpStatus === 1 ? "ON" : "OFF"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}