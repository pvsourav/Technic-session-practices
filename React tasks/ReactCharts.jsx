import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ChartTabsApp = () => {
  const [activeTab, setActiveTab] = useState('line');

  const lineData = [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 45 },
    { name: 'Mar', value: 35 },
    { name: 'Apr', value: 60 },
    { name: 'May', value: 50 },
    { name: 'Jun', value: 75 }
  ];

  const barData = [
    { name: 'Product A', sales: 120 },
    { name: 'Product B', sales: 200 },
    { name: 'Product C', sales: 150 },
    { name: 'Product D', sales: 180 },
    { name: 'Product E', sales: 90 }
  ];

  const histogramData = [
    { range: '0-10', frequency: 5 },
    { range: '10-20', frequency: 12 },
    { range: '20-30', frequency: 18 },
    { range: '30-40', frequency: 25 },
    { range: '40-50', frequency: 15 },
    { range: '50-60', frequency: 8 }
  ];

  const pieData = [
    { name: 'Desktop', value: 45, color: '#0088FE' },
    { name: 'Mobile', value: 35, color: '#00C49F' },
    { name: 'Tablet', value: 15, color: '#FFBB28' },
    { name: 'Other', value: 5, color: '#FF8042' }
  ];

  const tabs = [
    { id: 'line', label: 'Line Chart' },
    { id: 'bar', label: 'Bar Chart' },
    { id: 'histogram', label: 'Histogram' },
    { id: 'pie', label: 'Pie Chart' }
  ];

  const renderChart = () => {
    switch (activeTab) {
      case 'line':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Line Chart</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'bar':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Bar Chart</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'histogram':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Histogram</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={histogramData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Legend />
                <Bar dataKey="frequency" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'pie':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Pie Chart</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Sample React Program
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">

          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 text-sm font-medium text-center transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white border-b-2 border-blue-500'
                    : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="bg-white">
            {renderChart()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartTabsApp;