import React, { useEffect } from 'react';
import { useState } from 'react';
import './GameBoardC4.css'
import { JsxFlags } from 'typescript';

const GameBoardC4 = () => {
    const [board, setBoard] = useState(Array.from({ length: 6 }, () => Array(7).fill(null)));
    const [currPlayer, setCurrPlayer] = useState('red');
    const [winner, setWinner] = useState(null);
    const [lastMove, setLastMove] = useState(null);
    console.log(board);

    const checkWinner = (currPlayer, i, j) => {
        
        const color = board[i][j];
        //for vertical
        let countx = 1;
        let up = i-1;
        while (up >= 0) {
            
            if (board[up][j]!==null && board[up][j] === color) {
                countx++;
            }
            else {
                break;
            }
            up--;
        }
        let down = i+1;
        while (down < 6) {
            if (board[down][j]!==null && board[down][j] === color) {
                countx++;
            }
            else {
                break;
            }
            down++;
        }
        if (countx >= 4) {
            setWinner(currPlayer);
            return;
        }
        //for horizontal
        let county = 0;
        let left = j;
        while (left >= 0) {
            if (board[i][left]!==null && board[i][left] === color) {
                county++;
            }
            else {
                break;
            }
            left--;
        }
        let right = j;
        while (right < 7) {
            if (board[i][right]!==null && board[i][right] === color) {
                county++;
            }
            else {
                break;
            }
            right++;
        }
        if (county >= 4) {
            setWinner(currPlayer);
        }

        //for antidiag
        let countadiag = 0;
        let l = j;
        let u = i;
        while (l >= 0 && u >= 0) {
            if (board[u][l]!==null && board[u][l] === color) {
                countadiag++;
            }
            else {
                break;
            }
            u--;
            l--;
        }
        let r = j;
        let d = i;
        while (r < 7 && d < 6) {
            if (board[d][r]!==null && board[d][r] === color) {
                countadiag++;
            }
            else {
                break;
            }
            r++;
            d++;
        }
        if (countadiag >= 4) {
            setWinner(currPlayer);
        }

        //for diagonal
        let countdiag = 0;
        l = j;
        d = i;
        while (l >= 0 && d < 6) {
            if (board[d][l]!==null && board[d][l] === color) {
                countdiag++;
            }
            else {
                break;
            }
            l--;
            d++;
        }
        r = j;
        u = i;
        while (r < 7 && u >= 0) {
            if (board[u][r]!==null && board[u][r] === color) {
                countdiag++;
            }
            else {
                break;
            }
            r++;
            u--;
        }
        if (countdiag >= 4) {
            setWinner(currPlayer);
        }

        console.log(countx, "countx");
        console.log(county, "county");
        console.log(countdiag, "countdiag");
        console.log(countadiag, "countadiag");


    }


    const handleClick = (i, j) => {
        if(winner) return;
        const player = currPlayer;
        let getX = -1;
        for (let y = 0; y < board[0].length; y++) {
            if (y == j) {
                for (let x = 5; x >= 0; x--) {
                    if (board[x][y] == null) {
                        getX = x;
                        break;
                    }
                }
            }
        }
        setBoard(prev => {
            const next = prev.map(row => row.slice());
            next[getX][j] = player;
            return next;
        });
        setLastMove({ i: getX, j, player });
        checkWinner(currPlayer, i, j);
        setCurrPlayer(p => (p === "red" ? "yellow" : "red"));


    }
    useEffect(() => {
        if (!lastMove || winner) return;
        checkWinner(lastMove.player, lastMove.i, lastMove.j);
      }, [board, lastMove, winner]); // ← correct dependency array
    
    return (
        <div className='container'>
            <h1>
                Connect4
            </h1>
            <h3>Current Player :{currPlayer}</h3>
            <h3> Winner : {winner}</h3>
            <div className='game-board-c4'>
                {board.map((row, i) => (
                    row.map((cell, j) => (
                        <div key={`${i}-${j}`} className='game-board-cell-c4' onClick={() => { handleClick(i, j) }} style={{ backgroundColor: cell || "white" }}>
                            {cell}
                        </div>
                    ))
                ))}

            </div>
        </div>
    )
}

export default GameBoardC4;