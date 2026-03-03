.PHONY: all clean webasm

all: webasm
clean:
	rm docs/sudoku.js
	rm docs/sudoku.wasm

docs/sudoku.js docs/sudoku.wasm: wasm_wrapper.cpp ./BreakSudokuC/sudoku_solver.c
	emcc wasm_wrapper.cpp ./BreakSudokuC/sudoku_solver.c \
	-O3 \
    -s WASM \
    -s MODULARIZE \
    -s EXPORT_NAME="SudokuModule" \
    -s EXPORT_ES6 \
    --bind \
    -o docs/sudoku.js

webasm: docs/sudoku.js docs/sudoku.wasm
