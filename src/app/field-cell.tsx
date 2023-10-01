import { Group } from "three";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { figureGhostCoordsRecoil, figureOnPointerIndexRecoil } from "./playing-data";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { CellDecoration } from "./cell-decoration";


export const FieldCell = ({
    gameOver,
    position,
    coords,
    value,
    putPointerFigure,
}: {
    gameOver: boolean,
    position: [number, number, number];
    size: number[],
    coords: [number, number],
    value: number,
    putPointerFigure: (coords: [number, number] | undefined) => void
}) => {

    const pointerFigureIndex = useRecoilValue(figureOnPointerIndexRecoil);
    const setFigureCoords = useSetRecoilState(figureGhostCoordsRecoil);

    const cellRef = useRef<Group>(null);

    const [time, setTime] = useState<number>();
    useEffect(() => {
        if (value === 0) {
            setTime(Date.now());
        }
    }, [value]);

    // todo: make animation of CellDecoration
    useFrame(() => {
        if (time === undefined) { return; }
        const t = Date.now() - time;
        const y = Math.max(0, 1 - t / 500);
        cellRef.current?.scale.set(y, y, y);
        cellRef.current?.rotation.set(y * 0.4, y * 0.4, y * 0.4);

        if (y === 0) {
            cellRef.current?.scale.set(1, 1, 1);
        }
    });

    return <CellDecoration
        value={value}
        gameOver={gameOver}
        ref={cellRef}
        position={position}
        onPointerUp={() => { putPointerFigure(coords); }}
        onPointerOver={() => setFigureCoords(
            pointerFigureIndex !== undefined
                ? position
                : [0, 0, 0])
        }
    />;
};