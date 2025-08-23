#include "BreakSudoku/sudoku_complex_solver.hpp"
int main(){
    cubeman::Sudoku sudoku(std::cin);
    cubeman::sudoku_complex_solver solver;
    bool val=solver.solve(sudoku);
    for(char i=0;i<9;++i){
        for(char j=0;j<9;++j) std::cout<<(int)(sudoku.puzzle[i][j])<<' ';
    }
    std::cout<<'\n';
    return !val;
}
