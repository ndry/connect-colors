import { useRecoilState, useRecoilValue } from "recoil"
import { Figure, cellGap, cellSize, figureGhostCoordsRecoil, figureOnPointerIndexRecoil } from "./data-recoil/playing-data"
import { Cell } from "./Cell"



export const GameFigure = ({ ctrGameFigure, sequenceNumber, figureIndex,
}: {
    ctrGameFigure: Figure, sequenceNumber: number, figureIndex: number
}) => {
    const [pointerFigureIndex, setPointerFigureIndex] =
        useRecoilState(figureOnPointerIndexRecoil);

    const isGhost = figureIndex === pointerFigureIndex;

    const currentCellSize = isGhost
        ? [cellSize[0] - 0.02, cellSize[1] - 0.02, cellSize[2] + 0.15]
        : cellSize;
    const currentGap = isGhost ? (cellGap + 0.02) : cellGap;

    const figuraСells = ctrGameFigure.map((el, index1) => {

        return [el.map((el, index) => {
            const position = isGhost ?
                [
                    ((currentCellSize[0] + currentGap) * index),
                    index1 * (currentCellSize[1] + currentGap),
                    0.02
                ] as [number, number, number]
                : [
                    (currentCellSize[0] + currentGap) * index,
                    index1 * (currentCellSize[1] + currentGap),
                    0.02
                ] as [number, number, number]


            return (el === 0 ? null :
                <Cell
                    value={el}
                    key={index}
                    position={position}
                    size={currentCellSize}
                    isGhost={isGhost}
                />
            )
        })]
    });

    const [xItem, yItem, zItem] = useRecoilValue(figureGhostCoordsRecoil);
    const [xGhost, yGhost, zGhost] = isGhost
        ? [xItem, yItem, zItem]
        : [1.5, sequenceNumber * 1.5, 0]


    return (
        <group
            position={[xGhost, yGhost, zGhost + 0.05]}

            onPointerDown={() => {
                setPointerFigureIndex(figureIndex);
            }} >
            {figuraСells}
        </group >)

}