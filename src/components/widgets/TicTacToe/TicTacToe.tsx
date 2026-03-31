// import React from "react";
import { useState } from "react";

import { Window } from "@/components/ui/Window";
import { TitleBar } from "@/components/ui/TitleBar";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

type CellState = null | "O" | "X";

const renderPlayerIcon = (player: Exclude<CellState, null>, size = 24) => {
  if (player === "X") {
    return <Icon name="Circle" size={size} className="text-blue-400" />;
  }

  return <Icon name="Cross" size={size} className="text-red-400" />;
};

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
      {/* <span className="font-mono text-4xl text-slate-400">{value}</span> */}
      {value && renderPlayerIcon(value, 60)}
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
  const status = winner ? (
    <span className="inline-flex items-center gap-1">
      {renderPlayerIcon(winner)}
      の勝ちです
    </span>
  ) : (
    <span className="inline-flex items-center gap-1">
      {renderPlayerIcon(xIsNext ? "X" : "O")}
      の番です
    </span>
  );

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
  const [history, setHistory] = useState<CellState[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: CellState[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  return (
    <div className="mx-auto">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <div className="flex justify-center gap-2">
        <Button onClick={() => jumpTo(currentMove - 1)} variant="cancel" disabled={currentMove === 0}>
          元に戻す
        </Button>
        <Button onClick={resetGame} variant="cancel" disabled={currentMove === 0}>
          リセット
        </Button>
      </div>
    </div>
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
        <div className="mt-8 text-center text-sm">
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
