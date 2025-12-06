import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useDarkMode } from "../contexts/DarkModeContext";

export function ResultsGraph({ metrics }: { metrics: any[] }) {
  const { darkMode } = useDarkMode();

  const chartData = metrics.map(m => ({
    metric: m.name,
    score: m.score
  }));

  return (
    <div className="grid md:grid-cols-2 gap-10 mt-10">

      {/* Radar Chart */}
      <div className={`rounded-xl p-6 shadow-lg ${darkMode ? "bg-gray-800/40 border border-gray-700" : "bg-white"}`}>
        <h3 className={`text-xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Performance Radar
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" stroke={darkMode ? "#fff" : "#000"} />
            <PolarRadiusAxis angle={30} domain={[0, 10]} stroke={darkMode ? "#fff" : "#000"} />
            <Radar
              name="Score"
              dataKey="score"
              fill="#4f46e5"
              fillOpacity={0.6}
              stroke="#4f46e5"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className={`rounded-xl p-6 shadow-lg ${darkMode ? "bg-gray-800/40 border border-gray-700" : "bg-white"}`}>
        <h3 className={`text-xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Score Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="metric" stroke={darkMode ? "#fff" : "#000"} />
            <YAxis domain={[0, 10]} stroke={darkMode ? "#fff" : "#000"} />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
