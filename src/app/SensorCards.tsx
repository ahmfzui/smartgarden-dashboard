type Sensor = {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  pumpStatus: number;
};

export default function SensorCards({ latest }: { latest: Sensor | null }) {
  return (
    <div className="row justify-content-center g-3 mb-4 fade-in">
      <div className="col-6 col-md-3">
        <div className="card text-center shadow-sm card-animate">
          <div className="card-body">
            <div className="fs-2 mb-2">🌡️</div>
            <div className="text-secondary">Suhu</div>
            <div className="fs-4 fw-bold">{latest?.temperature ?? "--"} °C</div>
          </div>
        </div>
      </div>
      <div className="col-6 col-md-3">
        <div className="card text-center shadow-sm card-animate">
          <div className="card-body">
            <div className="fs-2 mb-2">💧</div>
            <div className="text-secondary">Kelembapan</div>
            <div className="fs-4 fw-bold">{latest?.humidity ?? "--"} %</div>
          </div>
        </div>
      </div>
      <div className="col-6 col-md-3">
        <div className="card text-center shadow-sm card-animate">
          <div className="card-body">
            <div className="fs-2 mb-2">🌱</div>
            <div className="text-secondary">Tanah</div>
            <div className="fs-4 fw-bold">{latest?.soilMoisture ?? "--"}</div>
          </div>
        </div>
      </div>
      <div className="col-6 col-md-3">
        <div className="card text-center shadow-sm card-animate">
          <div className="card-body">
            <div className="fs-2 mb-2">{latest?.pumpStatus === 1 ? "🚰" : "🚱"}</div>
            <div className="text-secondary">Pompa</div>
            <div className="mt-2">
              <span className={`status-badge ${latest?.pumpStatus === 1 ? "on" : "off"}`}>
                {latest?.pumpStatus === 1 ? "ON" : "OFF"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}