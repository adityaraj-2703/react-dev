import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import './GameBoard.css'

const checkWinner = (rows,cols,diag,antiDiag,currPlayer) =>{
        // for (let i = 0; i < 3; i++) {
        //     if (arr[i][0] && arr[i][0] === arr[i][1] && arr[i][1] === arr[i][2]) {
        //     return arr[i][0];
        //     }
        // }
        // for (let j = 0; j < 3; j++) {
        //     if (arr[0][j] && arr[0][j] === arr[1][j] && arr[1][j] === arr[2][j]) {
        //     return arr[0][j];
        //     }
        // }
        // if (arr[0][0] && arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2]) {
        //     return arr[0][0];
        // }
        // if (arr[0][2] && arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0]){
        //     return arr[0][2];
        // }
        // return null;
        if(Math.abs(rows[0])===3 || Math.abs(rows[1])===3 || Math.abs(rows[2])===3 
        || Math.abs(cols[0])===3 || Math.abs(cols[1])===3 || Math.abs(cols[2])===3 
        || Math.abs(diag)===3 || Math.abs(antiDiag)===3){
            return currPlayer==='X'?'0':'X';
        }
        return null;


}



const GameBoard = () => {
    const [board,setBoard] = useState(Array.from({length:3}, ()=> Array(3).fill(null)));
    const [currPlayer,setcurrPlayer] = useState('X'); //1 for X, 0 for O
    const [winner,setWinner] = useState(null);
    const [rows,setRows] = useState([]);
    const [cols,setCols] = useState([]);
    const [diag,setDiag] = useState(0);
    const [antiDiag,setAntiDiag] = useState(0);

    console.log(board);

    const moveref = useRef(0);

    const handleClick = (row,col) => {
        if(board[row][col]!==null || winner) return;
        const player = currPlayer==='X'?1:-1;
        const newBoard = board.map((r,i)=>{
            if(i!==row) return r;
            return r.map((cell,j)=>(j===col?currPlayer:cell))
        });
        const newRows = rows.map((i)=>{
            if(i===row){
                return i+player;
            }
            return i;
        })
        setRows(newRows);
        const newCols = cols.map((i)=>{
            if(i===col){
                return i+player;
            }
            return i;
        })
        setCols(newCols);

        if(row===col){
            setDiag(diag+player);
        }
        if((row+col) === 2){
            setAntiDiag(antiDiag+player);
        }
        setBoard(newBoard);
        setcurrPlayer(currPlayer==='X'?'O':'X');
        moveref.current = moveref.current+1;

    }

    const handleRestart= () => {
    setBoard(Array.from({length:3}, ()=> Array(3).fill(null)));
    setcurrPlayer('X');
    setWinner(null);
    setRows([]);
    setCols([]);
    setDiag(0);
    setAntiDiag(0);
    moveref.current = 0;
    
  };

  const isDraw = board.flat().every(cell=>cell!==null)
  const isDraweff = moveref.current === 9? true : false;
  useEffect(()=>{
        // setWinner(checkWinner(board));
        setWinner(checkWinner(rows,cols,diag,antiDiag,currPlayer));

    },[board]);

  return (
    <div className='container'>
        <h1>Tic Tac Toe</h1>
        <h3>CurrPlayer : {currPlayer==='X'?"X":"O"}</h3>
        {winner ? <h3>Winner: {winner==='X'?"X":"O"}</h3> : isDraweff ? <h3>Its a Draw</h3>:null}
        <div className='game-board'>
            {board.map((row,i)=>(
                // <div key = {i} className='game-board-row'>
                    row.map((cell,j)=>(
                        <div key = {`${i}-${j}`} className='game-board-cell' onClick={()=>handleClick(i,j)}>
                            {cell}
                            </div>
                    ))
                // </div>
            ))}
        </div>
        <button onClick={handleRestart}>Restart Game</button>
    </div>
  )
}

export default GameBoard