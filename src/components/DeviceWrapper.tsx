import React from 'react';

interface DeviceWrapperProps {
    children: React.ReactNode;
}

const DeviceWrapper: React.FC<DeviceWrapperProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile-first container */}
            <div className="mobile-container">
                {children}
            </div>
        </div>
    );
};

export default DeviceWrapper;