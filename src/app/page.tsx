"use client";
import { useEffect, useState } from "react";
import SensorCards from "./SensorCards";
import PumpControl from "./PumpControl";
import SensorTable from "./SensorTable";

type Sensor = {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  pumpStatus: number;
  timestamp: string;
};

export default function HomePage() {
  const [latest, setLatest] = useState<Sensor | null>(null);
  const [history, setHistory] = useState<Sensor[]>([]);
  const [pumpStatus, setPumpStatus] = useState(0);
  const [manual, setManual] = useState(false);

  const fetchAll = async () => {
    const res = await fetch("/api/history");
    const data = await res.json();
    setHistory(data);
    if (data.length > 0) setLatest(data[0]);

    const pumpRes = await fetch("/api/pump-control");
    const pumpData = await pumpRes.json();
    setPumpStatus(pumpData.pumpStatus);
    setManual(pumpData.manual);
  };

  useEffect(() => {
    fetchAll();
    const interval = setInterval(() => {
      fetchAll();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-vh-100 bg-light py-4 px-2 fade-in">
      <div className="container">
        <h1 className="display-5 fw-bold text-center mb-4 text-success" style={{
          letterSpacing: "2px"
        }}>
          <span style={{ filter: "drop-shadow(0 0 2px #a8ff78)" }}>🌱 Smart Garden Dashboard</span>
        </h1>
        <SensorCards latest={latest} />
        <PumpControl
          initialStatus={pumpStatus}
          initialManual={manual}
          onSuccess={fetchAll}
        />
        <h2 className="h5 fw-bold mb-3 ms-2 text-success">
          Riwayat Data Sensor
        </h2>
        <SensorTable data={history} />
        <footer className="text-center text-secondary small mt-4">
          &copy; {new Date().getFullYear()} Smart Garden - Next.js + MongoDB + Bootstrap
        </footer>
      </div>
    </div>
  );
}