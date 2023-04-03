var mtx=Array(9);
for(i=0;i<9;++i){
    mtx[i]=Array(9);
    for(j=0;j<9;++j) mtx[i][j]=0;
}

var position_x=0,position_y=0;

function update_n(n,x,y){
    const sudoku_cell=document.getElementById(`sudoku${x}${y}`);
    mtx[x][y]=n;
    if(n>0) sudoku_cell.innerText=String(n);
    else sudoku_cell.innerText=" ";
}

function update_position(x,y){
    const old_sudoku_cell=document.getElementById(`sudoku${position_x}${position_y}`);
    old_sudoku_cell.style.backgroundColor="rgb(45,45,45)";
    position_x=x;
    position_y=y;
    const sudoku_cell=document.getElementById(`sudoku${position_x}${position_y}`);
    sudoku_cell.style.backgroundColor="rgb(30,30,30)";
}

update_position(0,0);

document.getElementById("erase").addEventListener("click",()=>{
    update_n(0,position_x,position_y);
});
for(i=0;i<9;++i){
    const nButton=document.getElementById(`n${i+1}`);
    nButton.addEventListener("click",(item=this)=>{
        const n=parseInt(item.target.id[1]);
        update_n(n,position_x,position_y);
    });
    for(j=0;j<9;++j){
        const sudoku_cell=document.getElementById(`sudoku${i}${j}`);
        sudoku_cell.addEventListener("click",(item=this)=>{
            const x=parseInt(item.target.id[6]);
            const y=parseInt(item.target.id[7]);
            update_position(x,y);
        });
    }
}

document.addEventListener("keydown",(ev)=>{
    for(n=1;n<=9;++n){
        if(ev.key==String(n)){
            update_n(n,position_x,position_y);
            return;
        }
    }
    if(ev.key=="Backspace" || ev.key==" "){
        update_n(0,position_x,position_y);
        return;
    }
    let dx=0,dy=0;
    if(ev.key=="ArrowUp"){
        if(position_x-1>=0) dx=-1;
    }
    else if(ev.key=="ArrowDown"){
        if(position_x+1<9) dx=1;
    }
    else if(ev.key=="ArrowLeft"){
        if(position_y-1>=0) dy=-1;
    }
    else if(ev.key=="ArrowRight"){
        if(position_y+1<9) dy=1;
    }
    update_position(position_x+dx,position_y+dy);
});

document.getElementById("submit").addEventListener("click",()=>{
    fetch("/solve",{
        method: "POST",
        body: JSON.stringify(mtx),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response)=>{return response.json()})
    .then((data)=>{
        for(i=0;i<9;++i){
            for(j=0;j<9;++j) update_n(data["mtx"][i][j],i,j);
        }
        if(data["val"]){
            document.getElementById("waring").style.visibility="visible";
        }
    });
});

document.getElementById("clear").addEventListener("click",()=>{
    document.getElementById("waring").style.visibility="hidden";
    for(i=0;i<9;++i){
        for(j=0;j<9;++j) update_n(0,i,j);
    }
});
