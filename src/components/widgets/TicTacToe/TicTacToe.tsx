// import React from "react";
import { useState } from "react";

import { Window } from "@/components/ui/Window";
import { TitleBar } from "@/components/ui/TitleBar";
// import { Icon } from "@/components/ui/Icon";

type CellState = null | "O" | "X";

interface SquareProps {
  value: CellState;
  onSquareClick?: () => void;
}

// 3目並べのボタン
const Square = ({ value, onSquareClick }: SquareProps) => {
  const baseClasses = "flex h-24 w-24 items-center justify-center bg-slate-100 rounded-xs";
  const hoverClasses = "hover:bg-slate-400/25";
  const classes = `${baseClasses} ${hoverClasses}`;

  return (
    <button className={classes} onClick={onSquareClick}>
      <span className="font-mono text-4xl text-slate-400">{value}</span>
    </button>
  );
};

interface BoardProps {
  xIsNext: boolean;
  squares: CellState[];
  onPlay: (nextSquares: CellState[]) => void;
}

// 3目並べの盤面
const Board = ({ xIsNext, squares, onPlay }: BoardProps) => {
  // 勝者を計算する
  const winner = calculateWinner(squares);

  // マス目がクリックされたときの処理
  const handleClick = (index: number) => {
    // 勝負が決まっている場合、処理を中止 (早期リターン)
    if (winner) {
      return;
    }

    // マス目が空でない場合、処理を中止 (早期リターン)
    if (squares[index]) {
      return;
    }

    // 配列のコピーを作成
    const nextSquares = squares.slice();

    // プレーヤーの手番を決定する
    nextSquares[index] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  };

  // ゲームの状態を表示する
  let status: string;
  if (winner) {
    status = winner + "の勝ちです";
  } else {
    status = "次のプレイヤー: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="text-center">{status}</div>
      <div className="mx-auto grid grid-cols-3 gap-2 p-4">
        {squares.map((value, index) => (
          <Square key={index} value={value} onSquareClick={() => handleClick(index)} />
        ))}
      </div>
    </>
  );
};

const Game = () => {
  // 状態変数の宣言
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState<CellState[][]>([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  const handlePlay = (nextSquares: CellState[]) => {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  };

  return (
    <>
      <div>{/*TODO*/}</div>
      <div className="mx-auto">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
    </>
  );
};

/**
 * 3目並べウィジェット
 * @returns JSX.Element
 * @see https://ja.react.dev/learn/tutorial-tic-tac-toe
 */
export function TicTacToe() {
  return (
    <Window>
      <TitleBar icon="TicTac">3目並べ</TitleBar>
      <section className="flex flex-col justify-center">
        <Game />
        <div className="mt-4 text-center text-sm">
          参考：
          <a
            href="https://ja.react.dev/learn/tutorial-tic-tac-toe"
            target="_blank"
            className="break-all text-blue-600 hover:underline"
          >
            https://ja.react.dev/learn/tutorial-tic-tac-toe
          </a>
        </div>
      </section>
    </Window>
  );
}

const calculateWinner = (squares: CellState[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
