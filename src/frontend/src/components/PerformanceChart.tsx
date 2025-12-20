import { LineChart, Line, AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useDarkMode } from '../contexts/DarkModeContext';
import { motion } from 'motion/react';
import { useState } from 'react';

interface PerformanceChartProps {
  data?: any[];
  type?: 'line' | 'area' | 'bar' | 'radar';
}

export function PerformanceChart({ data, type = 'area' }: PerformanceChartProps) {
  const { darkMode } = useDarkMode();
  const [chartType, setChartType] = useState(type);

  // Mock historical data
  const historicalData = data || [
    { session: 'S1', clarity: 0.75, engagement: 0.72, filler: 0.68, pace: 0.78, technical: 0.70, overall: 0.73 },
    { session: 'S2', clarity: 0.78, engagement: 0.76, filler: 0.71, pace: 0.80, technical: 0.73, overall: 0.76 },
    { session: 'S3', clarity: 0.81, engagement: 0.79, filler: 0.74, pace: 0.82, technical: 0.76, overall: 0.78 },
    { session: 'S4', clarity: 0.84, engagement: 0.81, filler: 0.76, pace: 0.83, technical: 0.78, overall: 0.80 },
    { session: 'S5', clarity: 0.87, engagement: 0.84, filler: 0.78, pace: 0.84, technical: 0.80, overall: 0.83 },
    { session: 'Current', clarity: 0.89, engagement: 0.85, filler: 0.78, pace: 0.84, technical: 0.80, overall: 0.82 },
  ];

  // Mock radar data
  const radarData = [
    { parameter: 'Clarity', score: 0.89, fullMark: 1 },
    { parameter: 'Engagement', score: 0.85, fullMark: 1 },
    { parameter: 'Filler', score: 0.78, fullMark: 1 },
    { parameter: 'Pace', score: 0.84, fullMark: 1 },
    { parameter: 'Technical', score: 0.80, fullMark: 1 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-4 rounded-lg shadow-lg ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <p className={`mb-2 ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span style={{ color: entry.color }}>{entry.name}: </span>
              <span className="font-semibold">{entry.value.toFixed(2)}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const chartColors = {
    clarity: '#EAB308',
    engagement: '#3B82F6',
    filler: '#10B981',
    pace: '#F97316',
    technical: '#8B5CF6',
    overall: '#EC4899',
  };

  const renderChart = () => {
    const commonProps = {
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    if (chartType === 'area') {
      return (
        <AreaChart data={historicalData} {...commonProps}>
          <defs>
            <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColors.clarity} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={chartColors.clarity} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColors.engagement} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={chartColors.engagement} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColors.overall} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={chartColors.overall} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
          <XAxis 
            dataKey="session" 
            stroke={darkMode ? '#9CA3AF' : '#6B7280'}
            tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280' }}
          />
          <YAxis 
            domain={[0, 1]}
            stroke={darkMode ? '#9CA3AF' : '#6B7280'}
            tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ color: darkMode ? '#E5E7EB' : '#1F2937' }}
          />
          <Area 
            type="monotone" 
            dataKey="clarity" 
            stroke={chartColors.clarity} 
            fill="url(#colorClarity)"
            strokeWidth={2}
            name="Clarity"
          />
          <Area 
            type="monotone" 
            dataKey="engagement" 
            stroke={chartColors.engagement} 
            fill="url(#colorEngagement)"
            strokeWidth={2}
            name="Engagement"
          />
          <Area 
            type="monotone" 
            dataKey="overall" 
            stroke={chartColors.overall} 
            fill="url(#colorOverall)"
            strokeWidth={3}
            name="Overall"
          />
        </AreaChart>
      );
    }

    if (chartType === 'line') {
      return (
        <LineChart data={historicalData} {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
          <XAxis 
            dataKey="session" 
            stroke={darkMode ? '#9CA3AF' : '#6B7280'}
            tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280' }}
          />
          <YAxis 
            domain={[0, 1]}
            stroke={darkMode ? '#9CA3AF' : '#6B7280'}
            tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: darkMode ? '#E5E7EB' : '#1F2937' }} />
          <Line type="monotone" dataKey="clarity" stroke={chartColors.clarity} strokeWidth={2} name="Clarity" dot={{ r: 4 }} />
          <Line type="monotone" dataKey="engagement" stroke={chartColors.engagement} strokeWidth={2} name="Engagement" dot={{ r: 4 }} />
          <Line type="monotone" dataKey="filler" stroke={chartColors.filler} strokeWidth={2} name="Filler" dot={{ r: 4 }} />
          <Line type="monotone" dataKey="pace" stroke={chartColors.pace} strokeWidth={2} name="Pace" dot={{ r: 4 }} />
          <Line type="monotone" dataKey="technical" stroke={chartColors.technical} strokeWidth={2} name="Technical" dot={{ r: 4 }} />
          <Line type="monotone" dataKey="overall" stroke={chartColors.overall} strokeWidth={3} name="Overall" dot={{ r: 5 }} />
        </LineChart>
      );
    }

    if (chartType === 'bar') {
      return (
        <BarChart data={historicalData} {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
          <XAxis 
            dataKey="session" 
            stroke={darkMode ? '#9CA3AF' : '#6B7280'}
            tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280' }}
          />
          <YAxis 
            domain={[0, 1]}
            stroke={darkMode ? '#9CA3AF' : '#6B7280'}
            tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: darkMode ? '#E5E7EB' : '#1F2937' }} />
          <Bar dataKey="clarity" fill={chartColors.clarity} name="Clarity" />
          <Bar dataKey="engagement" fill={chartColors.engagement} name="Engagement" />
          <Bar dataKey="filler" fill={chartColors.filler} name="Filler" />
          <Bar dataKey="pace" fill={chartColors.pace} name="Pace" />
          <Bar dataKey="technical" fill={chartColors.technical} name="Technical" />
        </BarChart>
      );
    }

    if (chartType === 'radar') {
      return (
        <RadarChart data={radarData} {...commonProps}>
          <PolarGrid stroke={darkMode ? '#374151' : '#e5e7eb'} />
          <PolarAngleAxis 
            dataKey="parameter" 
            tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280' }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 1]} 
            tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280' }}
          />
          <Radar 
            name="Score" 
            dataKey="score" 
            stroke={chartColors.engagement} 
            fill={chartColors.engagement} 
            fillOpacity={0.6}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      );
    }

    return null;
  };

  return (
    <motion.div
      className={`rounded-xl shadow-md p-6 ${
        darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-xl ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
          Performance Analytics
        </h3>
        <div className="flex gap-2">
          {['area', 'line', 'bar', 'radar'].map((t) => (
            <motion.button
              key={t}
              onClick={() => setChartType(t as any)}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                chartType === t
                  ? darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        {renderChart()}
      </ResponsiveContainer>
    </motion.div>
  );
}