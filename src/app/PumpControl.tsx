"use client";
import { useState } from "react";

export default function PumpControl({
  initialStatus,
  initialManual,
  onSuccess,
}: {
  initialStatus: number;
  initialManual: boolean;
  onSuccess: () => void;
}) {
  const [manual, setManual] = useState(initialManual);
  const [pump, setPump] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleModeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newManual = e.target.checked;
    setManual(newManual);
    await updatePump(pump, newManual);
  };

  const handlePumpToggle = async () => {
    const newPump = pump === 1 ? 0 : 1;
    setPump(newPump);
    await updatePump(newPump, manual);
  };

  async function updatePump(pumpVal: number, manualVal: boolean) {
    setLoading(true);
    await fetch("/api/pump-control", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pumpStatus: pumpVal, manual: manualVal }),
    });
    setLoading(false);
    if (onSuccess) onSuccess();
  }

  return (
    <div className="d-flex align-items-center gap-3 bg-white shadow-sm p-3 rounded mb-4 justify-content-center card-animate fade-in">
      <div className="form-check form-switch fs-5">
        <input
          className="form-check-input"
          type="checkbox"
          id="manualSwitch"
          checked={manual}
          onChange={handleModeChange}
          disabled={loading}
          style={{cursor:"pointer"}}
        />
        <label className="form-check-label fw-semibold ms-2" htmlFor="manualSwitch">
          Mode Manual
        </label>
      </div>
      <button
        className={`btn px-4 fw-bold btn-animate ${pump === 1 ? "btn-success" : "btn-outline-secondary"}`}
        onClick={handlePumpToggle}
        disabled={!manual || loading}
        style={{ opacity: !manual || loading ? 0.6 : 1, pointerEvents: !manual || loading ? "none" : "auto", fontSize: "1.2em" }}
      >
        {loading ? (
          <span className="spinner-border spinner-border-sm me-2"></span>
        ) : pump === 1 ? "Matikan Pompa" : "Nyalakan Pompa"}
      </button>
      <span className={`status-badge ms-3 ${pump === 1 ? "on" : "off"}`}>
        Pompa {pump === 1 ? "ON" : "OFF"}
      </span>
    </div>
  );
}