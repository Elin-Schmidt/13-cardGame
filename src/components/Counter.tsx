import React from "react";

interface CounterProps {
    value: number | string;
}

const Counter: React.FC<CounterProps> = ({ value }) => (
    <div className="mt-4 text-4xl font-extrabold text-gray-800 drop-shadow-sm">
        {value}
    </div>
);

export default Counter;
