import { useResetRecoilState } from "recoil";
import { figureGhostCoordsRecoil, gameFiguresRecoil, figureOnPointerIndexRecoil, playingFieldRecoil } from "./data-recoil/playing-data";


export const ResetBtn = () => {

    const resetFiedl = useResetRecoilState(playingFieldRecoil);
    const resetFigure = useResetRecoilState(gameFiguresRecoil);
    const resetHeldFigure = useResetRecoilState(figureOnPointerIndexRecoil);
    const resetFigureCoords = useResetRecoilState(figureGhostCoordsRecoil);

    const reset = () => {
        resetFiedl()
        resetFigure()
        resetHeldFigure()
        resetFigureCoords()
    }

    return <button onClick={() => {
        reset()
    }}>reset</button>
}





