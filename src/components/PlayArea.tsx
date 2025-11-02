import React from "react";

interface PlayAreaProps {
    children: React.ReactNode;
}

const PlayArea: React.FC<PlayAreaProps> = ({ children }) => {
    return (
        <div className="relative w-full max-w-md mx-auto">
            {/* outer rim */}
            <div
                className="rounded-3xl bg-amber-900/10 p-2 shadow-lg"
                style={{ backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(255,255,255,0.02))" }}
            >
                {/* inner felt surface - responsive min-height so it fits better on phones */}
                <div className="rounded-2xl bg-felt p-4 sm:p-6 flex items-center justify-center min-h-[14rem] sm:min-h-[20rem] md:min-h-[24rem]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PlayArea;
