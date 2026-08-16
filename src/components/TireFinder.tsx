"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const WIDTHS = [155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325, 335];
const ASPECT_RATIOS = [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85];
const DIAMETERS = [14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 26];

// Generate years from current year back 30 years
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => currentYear - i);

interface Make { id: number; name: string }
interface Model { id: number; name: string }
interface Trim { id: number; year: number; name: string }

export default function TireFinder() {
  const router = useRouter();
  const [tab, setTab] = useState<"vehicle" | "size">("vehicle");

  // Size search state
  const [width, setWidth] = useState("");
  const [aspectRatio, setAspectRatio] = useState("");
  const [diameter, setDiameter] = useState("");

  // Vehicle search state
  const [year, setYear] = useState("");
  const [makeId, setMakeId] = useState("");
  const [modelId, setModelId] = useState("");
  const [trimId, setTrimId] = useState("");
  
  const [makes, setMakes] = useState<Make[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [trims, setTrims] = useState<Trim[]>([]);
  const [loading, setLoading] = useState(false);

  // Load makes when year changes
  useEffect(() => {
    if (!year) {
      setMakes([]);
      setMakeId("");
      setModels([]);
      setModelId("");
      setTrims([]);
      setTrimId("");
      return;
    }
    
    setLoading(true);
    fetch(`/api/vehicles/makes?year=${year}`)
      .then(res => res.json())
      .then(data => {
        setMakes(data.makes || []);
        setMakeId("");
        setModels([]);
        setModelId("");
        setTrims([]);
        setTrimId("");
      })
      .catch(() => setMakes([]))
      .finally(() => setLoading(false));
  }, [year]);

  // Load models when make changes
  useEffect(() => {
    if (!makeId || !year) {
      setModels([]);
      setModelId("");
      setTrims([]);
      setTrimId("");
      return;
    }
    
    setLoading(true);
    fetch(`/api/vehicles/models?makeId=${makeId}&year=${year}`)
      .then(res => res.json())
      .then(data => {
        setModels(data.models || []);
        setModelId("");
        setTrims([]);
        setTrimId("");
      })
      .catch(() => setModels([]))
      .finally(() => setLoading(false));
  }, [makeId, year]);

  // Load trims when model changes
  useEffect(() => {
    if (!modelId || !year) {
      setTrims([]);
      setTrimId("");
      return;
    }
    
    setLoading(true);
    fetch(`/api/vehicles/trims?modelId=${modelId}&year=${year}`)
      .then(res => res.json())
      .then(data => {
        setTrims(data.trims || []);
        setTrimId("");
      })
      .catch(() => setTrims([]))
      .finally(() => setLoading(false));
  }, [modelId, year]);

  const searchBySize = () => {
    if (width && aspectRatio && diameter) {
      const size = `${width}/${aspectRatio}R${diameter}`;
      router.push(`/shop?tireSize=${encodeURIComponent(size)}`);
    }
  };

  const searchByVehicle = () => {
    if (trimId) {
      router.push(`/shop?trimId=${trimId}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full">
      {/* Tabs */}
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setTab("vehicle")}
          className={`flex-1 py-3 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
            tab === "vehicle"
              ? "bg-red-600 text-white shadow-md"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-4-4v4m-6 4h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm0 0V9a2 2 0 012-2h8a2 2 0 012 2v2" />
          </svg>
          Shop by Vehicle
        </button>
        <button
          onClick={() => setTab("size")}
          className={`flex-1 py-3 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
            tab === "size"
              ? "bg-red-600 text-white shadow-md"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Shop by Size
        </button>
      </div>

      {tab === "vehicle" ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 bg-white appearance-none cursor-pointer"
            >
              <option value="">Select Year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <select
              value={makeId}
              onChange={(e) => setMakeId(e.target.value)}
              disabled={!year || loading}
              className="w-full border border-gray-300 rounded-lg px-4 py-3.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 bg-white appearance-none cursor-pointer"
            >
              <option value="">{loading ? "Loading..." : makes.length > 0 ? "Select Make" : year ? "No makes found" : "Select Make"}</option>
              {makes.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              disabled={!makeId || loading}
              className="w-full border border-gray-300 rounded-lg px-4 py-3.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 bg-white appearance-none cursor-pointer"
            >
              <option value="">{loading ? "Loading..." : models.length > 0 ? "Select Model" : makeId ? "No models found" : "Select Model"}</option>
              {models.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <select
              value={trimId}
              onChange={(e) => setTrimId(e.target.value)}
              disabled={!modelId || loading}
              className="w-full border border-gray-300 rounded-lg px-4 py-3.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 bg-white appearance-none cursor-pointer"
            >
              <option value="">{loading ? "Loading..." : trims.length > 0 ? "Select Trim" : modelId ? "No trims found" : "Select Trim"}</option>
              {trims.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={searchByVehicle}
            disabled={!trimId}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition text-base"
          >
            Find My Tires
          </button>
          <p className="text-xs text-gray-500 text-center">
            Select your vehicle to see compatible tires
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Width</label>
              <select
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-3.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 bg-white appearance-none cursor-pointer"
              >
                <option value="">---</option>
                {WIDTHS.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Aspect Ratio</label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-3.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 bg-white appearance-none cursor-pointer"
              >
                <option value="">---</option>
                {ASPECT_RATIOS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Rim Diameter</label>
              <select
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-3.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 bg-white appearance-none cursor-pointer"
              >
                <option value="">---</option>
                {DIAMETERS.map((d) => (
                  <option key={d} value={d}>{d}&quot;</option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-600">
              Example: <span className="font-mono font-semibold">225/45R17</span> - Found on your tire sidewall
            </p>
          </div>
          <button
            onClick={searchBySize}
            disabled={!width || !aspectRatio || !diameter}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition text-base"
          >
            Search Tires
          </button>
        </div>
      )}
    </div>
  );
}
