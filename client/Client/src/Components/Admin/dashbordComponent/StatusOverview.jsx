// StatusOverview.jsx
import React from 'react';
import RequestStatusChart from './RequestStatusChart';
import BinLocationMap from './BinLocationMap';

const StatusOverview = ({ requestStatus, binLocations }) => {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RequestStatusChart requestStatus={requestStatus} />
        <BinLocationMap binLocations={binLocations} />
      </div>
    </div>
  );
};

export default StatusOverview;