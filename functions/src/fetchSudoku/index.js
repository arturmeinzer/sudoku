const axios = require("axios");
const functions = require("firebase-functions");
const cors = require("cors")({origin: true});

const transform = (valuesString) => {
    const puzzleArray = [];
    for (let i = 0; i < valuesString.length; i += 1) {
        const value = valuesString[i] === "." ?
            0:
            parseInt(valuesString[i], 10);
        puzzleArray.push(value);
    }

    return puzzleArray;
};

const fetchSolution = async (puzzle) => {
    const options = {
        method: "GET",
        url: "https://sudoku-generator1.p.rapidapi.com/sudoku/solve",
        params: {
            puzzle,
        },
        headers: {
            "X-RapidAPI-Key": process.env.RAPID_API_KEY,
            "X-RapidAPI-Host": process.env.RAPID_API_HOST,
        },
    };

    try {
        const response = await axios.request(options);
        return response.data.solution;
    } catch (error) {
        return {error};
    }
};

const fetchSudoku = async (difficulty, seed) => {
    const params = {};
    if (difficulty) {
        params.difficulty = difficulty;
    } else if (seed) {
        params.seed = seed;
    } else {
        return {
            error: "missing params",
        };
    }

    const options = {
        method: "GET",
        url: "https://sudoku-generator1.p.rapidapi.com/sudoku/generate",
        params,
        headers: {
            "X-RapidAPI-Key": process.env.RAPID_API_KEY,
            "X-RapidAPI-Host": process.env.RAPID_API_HOST,
        },
    };

    try {
        const response = await axios.request(options);
        const solution = await fetchSolution(response.data.puzzle);
        if (solution.error) {
            return {
                error: solution.error,
            };
        }
        return {
            puzzle: transform(response.data.puzzle),
            solution: transform(solution),
            seed: response.data.seed,
        };
    } catch (error) {
        return {error};
    }
};

exports.fetchSudoku = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        const data = req.query;
        const difficulty = data.difficulty;
        const seed = data.seed;

        if (!difficulty && !seed) {
            return res.status(400).send({
                data: {
                    status: 400,
                    message: "Parameter difficulty or seed missing",
                },
            });
        }

        const fetchResponse = await fetchSudoku(difficulty, seed);

        if (fetchResponse.error) {
            return res.status(500).send({
                data: {
                    status: 500,
                    message: fetchResponse.error.toString(),
                },
            });
        } else {
            return res.status(200).send({
                data: {
                    status: 200,
                    ...fetchResponse,
                },
            });
        }
    });
});
