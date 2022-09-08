import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import * as actions from "../store/actions";
import errorSound from "../assets/error.mp3";

const useErrorSound = () => {
    const { isError } = useSelector((state) => state.sudoku);
    const dispatch = useDispatch();
    const [play] = useSound(errorSound);

    useEffect(() => {
        if (isError) {
            play();
            dispatch(actions.setIsError(false));
        }
    }, [isError, play, dispatch]);
};

export default useErrorSound;
