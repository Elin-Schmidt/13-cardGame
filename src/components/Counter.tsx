import React from "react";

interface CounterProps {
    value: number | string;
}

const Counter: React.FC<CounterProps> = ({ value }) => (
    <div className="mt-4 text-lg font-semibold text-gray-800">
        {value}
    </div>
);

export default Counter;
