CXX_flag:=-O3 -std=c++17

.PHONY: all clean lib

all: solve.out
clean:
	make -C BreakSudoku clean
	rm *.out

lib:
	make -C BreakSudoku

solve.out: lib solve.cpp
	g++ $(CXX_flag) -o solve.out solve.cpp BreakSudoku/Sudoku.o BreakSudoku/sudoku_complex_solver.o
