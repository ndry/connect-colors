import { useRecoilValue } from "recoil";
import { GameFigure } from "./game-figure";
import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { levelRecoil } from "./level-recoil";

export const GameFiguresArea = () => {
    const level = useRecoilValue(levelRecoil);

    const { camera } = useThree();
    useLayoutEffect(() => camera.lookAt(3, 0, 4), [camera]);

    return level.state.figures.map((el, index) => <group
        key={index}
        position={[-4, 0, index * 4]}
    >
        <GameFigure
            figureIndex={index}
        />
    </group>);
};