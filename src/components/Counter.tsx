import React from "react";

interface CounterProps {
    value: number | string;
    /** optional total (ignored here) kept for compatibility */
    total?: number;
}

const MAX_PER_SUIT = 13;

const Counter: React.FC<CounterProps> = ({ value }) => {
    const n = Number(value);
    const numeric = !Number.isNaN(n) && isFinite(n);

    // Display modulo 1..13 when numeric; otherwise show the string (e.g., 'Start')
    const display = numeric ? (((n - 1) % MAX_PER_SUIT) + 1) : value;
    const isMax = numeric && (((n - 1) % MAX_PER_SUIT) + 1) === MAX_PER_SUIT;

    return (
        <div className="mt-4">
            <div className={`relative inline-flex items-center justify-center rounded-2xl px-10 py-6 shadow-lg transform transition-all duration-300 min-w-[14rem] border ${isMax ? 'border-yellow-400 ring-2 ring-yellow-300/30' : 'border-gray-200'}`} style={{ backgroundColor: '#ede0cd' }}>
                {/* decorative suits in each corner (moved slightly outward to give padding) */}
                <span className="absolute top-3 left-5 text-lg text-gray-700">♠</span>
                <span className="absolute top-3 right-5 text-lg text-red-400">♥</span>
                <span className="absolute bottom-3 left-5 text-xl text-red-400">♦</span>
                <span className="absolute bottom-3 right-5 text-lg text-gray-700">♣</span>

                <div className="flex flex-col items-center text-center leading-none">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Current &#35;</span>
                    <span className={`mt-2 text-4xl font-extrabold ${isMax ? 'text-yellow-700' : 'text-gray-900'}`}>{display}</span>
                </div>
            </div>
        </div>
    );
};

export default Counter;
