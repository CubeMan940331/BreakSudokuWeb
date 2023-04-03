#include"BreakSudoku35.h"
int main(){
    cubeman::Sudoku sudoku(std::cin);
    bool val=cubeman::sudoku_complex_solver(sudoku).solve();
    for(char i=0;i<9;++i){
        for(char j=0;j<9;++j) std::cout<<(int)(sudoku.puzzle[i][j])<<' ';
    }
    std::cout<<'\n';
    return !val;
}