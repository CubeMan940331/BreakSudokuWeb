#include <cstring>
#include <stdexcept>

#include "./BreakSudokuC/Sudoku.h"
#include "./BreakSudokuC/sudoku_solver.h"

#include <emscripten/bind.h>

using namespace emscripten;

int checkSudoku(val jsArray) {
    if (!jsArray.isArray()) {
        throw std::runtime_error("Input must be an array.");
    }

    if (jsArray["length"].as<unsigned>() != 81) {
        throw std::runtime_error("Sudoku must contain exactly 81 numbers.");
    }

    Sudoku s;

    for (int i = 0; i < 81; i++) {
        s.puzzle[i / 9][i % 9] = jsArray[i].as<uint8_t>();
    }

    int ret = check_sudoku(&s);

    if(ret>=1){
        for(int i=0;i<81;++i){
            jsArray.set(i, s.puzzle[i/9][i%9]);
        }
    }

    return ret;
}

EMSCRIPTEN_BINDINGS(sudoku_module) {
    function("checkSudoku", &checkSudoku);
}