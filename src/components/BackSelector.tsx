import React, { useState, useMemo } from "react";
import switchIcon from "../assets/switch.svg";

interface BackSelectorProps {
    selected: string;
    setSelected: (p: string) => void;
}

function useAvailableBacks(): { src: string; name: string }[] {
    return useMemo(() => {
        // Load common image types from assets root (so existing files still work)
        const rootModules = import.meta.glob('../assets/backs/*.{png,jpg,jpeg,svg}', { eager: true }) as Record<string, unknown>;

        const modules = { ...rootModules };

        const list: { src: string; name: string }[] = Object.entries(modules)
            .map(([path, mod]) => {
                const maybeMod = mod as { default?: string } | string;
                const src = typeof maybeMod === 'string' ? maybeMod : (maybeMod && maybeMod.default) ? maybeMod.default : '';
                const name = path.split('/').pop()!.replace(/\.(png|jpe?g|svg)$/, '');
                return { src, name };
            })
            .filter((i) => i.src);

        list.sort((a, b) => a.name.localeCompare(b.name));
        return list;
    }, []);
}

const BackSelector: React.FC<BackSelectorProps> = ({ selected, setSelected }) => {
    const [open, setOpen] = useState(false);
    const backs = useAvailableBacks();

    return (
        <>
            {/* Icon button bottom-right; placed absolutely inside PlayArea */}
            <button
                className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 rounded-full shadow-md flex items-center justify-center z-30 hover:scale-105 transition-transform"
                onClick={() => setOpen(true)}
                aria-label="Byt kortbaksida"
            >
                {/* switch icon from assets */}
                <img src={switchIcon} alt="Byt baksida" className="w-5 h-5" draggable={false} />
            </button>

            {open && (
                <div className="fixed inset-0 flex items-center justify-center z-40" onClick={() => setOpen(false)}>
                    <div className="bg-white rounded-xl shadow-lg p-4 max-w-3xl w-full mx-4 max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute top-3 right-5 text-2xl text-gray-500 hover:text-black"
                            onClick={() => setOpen(false)}
                            aria-label="Stäng"
                        >
                            &times;
                        </button>
                        <p className="text-md text-gray-600 mb-4">Klicka på en design för att använda den som kortbaksida.</p>

                        <div className="grid grid-cols-2 gap-2 overflow-auto max-h-[564px]">
                            {backs.map((b) => (
                                <button
                                    key={b.name}
                                    onClick={() => {
                                        setSelected(b.src);
                                        setOpen(false);
                                    }}
                                    className={`border rounded-md overflow-hidden shadow-sm bg-white p-2 ${selected === b.src ? 'ring-2 ring-yellow-300' : 'hover:scale-105'} transition-transform`}
                                >
                                    <img src={b.src} alt={b.name} className="w-full h-36 object-contain block bg-white" draggable={false} />
                                    <div className="text-xs text-center mt-1 text-gray-600 truncate">{b.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BackSelector;
