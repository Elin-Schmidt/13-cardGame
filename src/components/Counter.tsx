import React from "react";

interface CounterProps {
    value: number | string;
}

const Counter: React.FC<CounterProps> = ({ value }) => (
    <div className="mt-4">
        <div className="relative inline-flex items-center justify-center bg-white/95 border border-gray-200 rounded-2xl px-10 py-6 shadow-lg transform transition-all duration-300 min-w-[14rem]">
            {/* decorative suits in each corner (moved slightly outward to give padding) */}
            <span className="absolute top-3 left-5 text-sm text-gray-400">♠</span>
            <span className="absolute top-3 right-5 text-sm text-red-400">♥</span>
            <span className="absolute bottom-3 left-5 text-sm text-amber-600">♦</span>
            <span className="absolute bottom-3 right-5 text-sm text-gray-700">♣</span>

            <div className="flex flex-col items-center text-center leading-none">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Current &#35;</span>
                <span className="mt-2 text-4xl font-extrabold text-gray-900">{value}</span>
            </div>
        </div>
    </div>
);

export default Counter;
