import React, { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import switchIcon from "../assets/switch.svg";

interface BackSelectorProps {
    selected: string;
    setSelected: (p: string) => void;
    playerPosition?: 'top' | 'bottom'; // För 2-player mode: top = player 1 (roterad), bottom = player 2
    isOpen?: boolean; // Extern kontroll av open state
    onOpenChange?: (open: boolean) => void; // Callback för att uppdatera extern state
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

const BackSelector: React.FC<BackSelectorProps> = ({ selected, setSelected, playerPosition, isOpen: externalOpen, onOpenChange }) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const backs = useAvailableBacks();

    // Använd extern state om tillgänglig, annars intern
    const open = externalOpen !== undefined ? externalOpen : internalOpen;
    const setOpen = (value: boolean) => {
        if (onOpenChange) {
            onOpenChange(value);
        } else {
            setInternalOpen(value);
        }
    };

    // Placera modal på rätt planhalva
    const getModalAlignment = () => {
        if (!playerPosition) return 'items-center'; // Centrerad för 1-player mode
        // Player 1 (top): items-start pt-[4.5rem] (nu när modalen är roterad 180° behöver vi items-start)
        // Player 2 (bottom): items-end pb-[4.5rem] (margin bottom)
        return playerPosition === 'top' ? 'items-start pt-[4.5rem]' : 'items-end pb-[4.5rem]';
    };

    // Högre z-index för player 1 så deras modal alltid är över player 2's
    const getZIndex = () => {
        return playerPosition === 'top' ? 'z-[60]' : 'z-[55]';
    };

    // Rotera modalen för player 1 eftersom den nu är utanför det roterade området
    const getRotation = () => {
        return playerPosition === 'top' ? 'rotate-180' : '';
    };

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

            {open && createPortal(
                <div
                    className={`fixed inset-0 flex ${getModalAlignment()} justify-center ${getZIndex()}`}
                    onClick={() => setOpen(false)}
                >
                    <div className={`bg-white rounded-xl shadow-lg p-4 max-w-3xl w-full mx-4 max-h-[80vh] overflow-hidden ${getRotation()}`} onClick={(e) => e.stopPropagation()}>
                        <p className="text-md text-gray-600 mb-4">Klicka på en design för att använda den som kortbaksida.</p>

                        <div className="grid grid-cols-4 gap-2">
                            {backs.map((b) => (
                                <button
                                    key={b.name}
                                    onClick={() => {
                                        setSelected(b.src);
                                        setOpen(false);
                                    }}
                                    className={`border rounded-md overflow-hidden shadow-sm bg-white p-2 ${selected === b.src ? 'ring-2 ring-yellow-300' : 'hover:scale-105'} transition-transform`}
                                >
                                    <img src={b.src} alt={b.name} className="w-full h-24 object-contain block bg-white" draggable={false} />
                                    <div className="text-xs text-center mt-1 text-gray-600 truncate">{b.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default BackSelector;
