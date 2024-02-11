import React from 'react';

const TabularData = ({ data }) => {
  return (
    <div className="overflow-x-auto ">
      {/* <h2 className="text-xl font-bold mb-4">Tabular Data</h2> */}
      <table className=" divide-y divide-gray-200">
      {/* <table className="w-full divide-y divide-gray-200"> */}
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Change</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className={`px-6 py-4 whitespace-nowrap ${item.change < 0 ? 'text-red-500' : 'text-green-500'}`}>{item.change}</td>
              <td className={`px-6 py-4 whitespace-nowrap ${item.percentChange < 0 ? 'text-red-500' : 'text-green-500'}`}>{item.percentChange}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.volume}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.marketCap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabularData;
