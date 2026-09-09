import React, { useState, useEffect } from "react";
import { healthService } from "../services/healthService";

const HealthCheck = () => {
  const [health, setHealth] = useState({
    server: { status: "checking" },
    client: { status: "ok" },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkHealth = async () => {
    setLoading(true);
    const serverHealth = await healthService.checkServerHealth();
    const clientHealth = {
      status: "ok",
      timestamp: new Date().toISOString(),
      online: navigator.onLine,
      connection: navigator.connection?.effectiveType || "unknown",
    };

    setHealth({
      server: serverHealth,
      client: clientHealth,
    });
    setLoading(false);
  };

  const isServerOk = health.server.status === "connected";

  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.9px] md:text-[36px]">
            System status
          </h1>
          <p className="mt-2 text-[14px] text-[#5f5f5d]">
            Live diagnostic health of server and client services
          </p>
        </div>

        <button
          type="button"
          onClick={checkHealth}
          disabled={loading}
          className="btn-ghost btn-sm"
        >
          <i
            className={`ti ti-refresh ${loading ? "animate-spin" : ""} text-[14px]`}
          ></i>
          {loading ? "Checking..." : "Refresh"}
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Server Card */}
        <div className="rounded-xl border border-[#eceae4] bg-[#fcfbf8] p-5">
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-[#5f5f5d]">API Server</span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium ${
                isServerOk
                  ? "border border-[rgba(28,28,28,0.4)] text-[#1c1c1c]"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isServerOk ? "bg-emerald-600" : "bg-red-500"
                }`}
              ></span>
              {isServerOk ? "Operational" : "Disconnected"}
            </span>
          </div>

          <div className="mt-4 space-y-1.5 text-[13px] text-[#5f5f5d]">
            <p>
              Status:{" "}
              <span className="text-[#1c1c1c] font-medium">
                {health.server.status}
              </span>
            </p>
            {health.server.data?.uptime && (
              <p>
                Uptime:{" "}
                <span className="text-[#1c1c1c] font-medium">
                  {Math.floor(health.server.data.uptime)}s
                </span>
              </p>
            )}
            {health.server.data?.database && (
              <p>
                Database:{" "}
                <span className="text-[#1c1c1c] font-medium">
                  {health.server.data.database}
                </span>
              </p>
            )}
            {health.server.error && (
              <p className="text-red-600 mt-2">{health.server.error}</p>
            )}
          </div>
        </div>

        {/* Client Card */}
        <div className="rounded-xl border border-[#eceae4] bg-[#fcfbf8] p-5">
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-[#5f5f5d]">Client App</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(28,28,28,0.4)] px-2.5 py-1 text-[12px] font-medium text-[#1c1c1c]">
              <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
              Connected
            </span>
          </div>

          <div className="mt-4 space-y-1.5 text-[13px] text-[#5f5f5d]">
            <p>
              Network:{" "}
              <span className="text-[#1c1c1c] font-medium">
                {health.client.online ? "Online" : "Offline"}
              </span>
            </p>
            <p>
              Connection:{" "}
              <span className="text-[#1c1c1c] font-medium">
                {health.client.connection}
              </span>
            </p>
            <p>
              Checked:{" "}
              <span className="text-[#1c1c1c] font-medium">
                {new Date(health.client.timestamp).toLocaleTimeString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCheck;