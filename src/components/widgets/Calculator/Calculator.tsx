import React, { useState, createContext, useContext } from "react";
import type { ReactNode } from "react";
import { Window } from "@/components/ui/Window";
import { TitleBar } from "@/components/ui/TitleBar";

class CalculatorEngine {
  private display: string = "0";
  private previousValue: number | null = null;
  private operation: string | null = null;
  private newNumber: boolean = true;

  getDisplay(): string {
    return this.display;
  }

  handleNumber(num: number): void {
    if (this.newNumber) {
      this.display = String(num);
      this.newNumber = false;
    } else {
      this.display = this.display === "0" ? String(num) : this.display + num;
    }
  }

  handleOperation(op: string): void {
    const current = parseFloat(this.display);

    if (this.previousValue === null) {
      this.previousValue = current;
    } else if (this.operation) {
      const result = this.calculate(this.previousValue, current, this.operation);
      this.display = String(result);
      this.previousValue = result;
    }

    this.operation = op;
    this.newNumber = true;
  }

  private calculate(prev: number, current: number, op: string): number {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "*":
        return prev * current;
      case "/":
        return prev / current;
      default:
        return current;
    }
  }

  handleEquals(): void {
    if (this.operation && this.previousValue !== null) {
      const result = this.calculate(this.previousValue, parseFloat(this.display), this.operation);
      this.display = String(result);
      this.previousValue = null;
      this.operation = null;
      this.newNumber = true;
    }
  }

  handleClear(): void {
    this.display = "0";
    this.previousValue = null;
    this.operation = null;
    this.newNumber = true;
  }

  handleDecimal(): void {
    if (!this.display.includes(".")) {
      this.display += ".";
      this.newNumber = false;
    }
  }
}

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div
      className="flex min-h-12 items-center justify-end rounded bg-gray-100 px-4 py-2 text-4xl font-bold"
      style={{ textShadow: "2px 2px 0px rgba(0, 0, 0, 0.1)" }}
    >
      {value}
    </div>
  );
};

interface ButtonClickContextType {
  handleButtonClick: (text: string) => void;
}

const ButtonClickContext = createContext<ButtonClickContextType | undefined>(undefined);

interface ButtonProps {
  operator?: boolean;
  rowSpan?: number;
  colSpan?: number;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ operator = false, rowSpan = 1, colSpan = 1, children }) => {
  const context = useContext(ButtonClickContext);
  if (!context) {
    throw new Error("Button must be used within Calculator");
  }

  const { handleButtonClick } = context;
  const buttonText = typeof children === "string" ? children : "";

  const baseClasses =
    "flex items-center justify-center w-full h-full text-xl font-bold border-0 rounded cursor-pointer px-5 py-2";
  const colorClasses = operator
    ? "bg-orange-400 hover:bg-orange-500 text-white"
    : "bg-gray-200 hover:bg-gray-300";
  const buttonClasses = `${baseClasses} ${colorClasses}`;

  return (
    <button
      className={buttonClasses}
      style={{
        gridRow: `span ${rowSpan}`,
        gridColumn: `span ${colSpan}`,
      }}
      onClick={() => handleButtonClick(String(buttonText))}
    >
      {children}
    </button>
  );
};

export function Calculator() {
  const [calculator] = useState(() => new CalculatorEngine());
  const [display, setDisplay] = useState(calculator.getDisplay());

  const performAction = (action: () => void) => {
    action();
    setDisplay(calculator.getDisplay());
  };

  const handleButtonClick = (text: string) => {
    switch (text) {
      case "C":
        performAction(() => calculator.handleClear());
        break;
      case "=":
        performAction(() => calculator.handleEquals());
        break;
      case ".":
        performAction(() => calculator.handleDecimal());
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        performAction(() => calculator.handleOperation(text));
        break;
      default: {
        const num = parseInt(text);
        if (!isNaN(num)) {
          performAction(() => calculator.handleNumber(num));
        }
      }
    }
  };

  return (
    <Window>
      <TitleBar icon="Calculator">Calculator</TitleBar>

      <div className="flex flex-col gap-4 font-mono font-normal">
        <Display value={display} />
        <ButtonClickContext.Provider value={{ handleButtonClick }}>
          <div className="grid grid-cols-4 gap-2">
            <Button operator>C</Button>
            <Button operator>/</Button>
            <Button operator>*</Button>
            <Button operator>-</Button>

            <Button>7</Button>
            <Button>8</Button>
            <Button>9</Button>
            <Button operator rowSpan={2}>
              +
            </Button>

            <Button>4</Button>
            <Button>5</Button>
            <Button>6</Button>

            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
            <Button operator rowSpan={2}>
              =
            </Button>

            <Button colSpan={2}>0</Button>
            <Button>.</Button>
          </div>
        </ButtonClickContext.Provider>
      </div>
    </Window>
  );
}
