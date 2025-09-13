import { useState } from "react"

import styles from "./app.module.css"

function App() {
  const [operand1, setOperand1] = useState("")
  const [operator, setOperator] = useState("")
  const [operand2, setOperand2] = useState("")
  const [displayValue, setDisplayValue] = useState("0") // отображение значения в input

  const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
  const operators = ["+", "-", "C", "="]

  function handleNumberClick(num) {
    // если есть оператор, значит первый операнд ввели, если первого операнда нет, выполнится проверка при клике на "="
    if (operator) {
      setOperand2((prev) => prev + num)
      setDisplayValue((prev) => (prev === "0" ? num : prev + num))
    } else {
      setOperand1((prev) => prev + num)
      setDisplayValue((prev) => (prev === "0" ? num : prev + num))
    }
  }

  function handleOperatorClick(operator) {
    if (operator === "C") {
      clearingInput()
    } else if (operator === "=") {
      calculateResult()
    } else {
      setOperator(operator)
      setDisplayValue("0")
    }
  }

  function clearingInput() {
    setOperand1("")
    setOperand2("")
    setOperator("")
    setDisplayValue("0")
  }

  function calculateResult() {
    // проверяем, чтобы были введены оба операнда, если нет, обнуляемся
    if (!operand1 || !operand2 || !operator) {
      alert("введите оба числа")
      clearingInput()
      return
    }

    let result = 0

    const num1 = parseFloat(operand1)
    const num2 = parseFloat(operand2)

    switch (operator) {
      case "+":
        result = num1 + num2
        break
      case "-":
        result = num1 - num2
        break
      default:
        return
    }

    setDisplayValue(result.toString())
    setOperand1(result.toString())
    setOperator("")
    setOperand2("")
  }

  return (
    <>
      <div className={styles.calculator}>
        <h1>Калькулятор</h1>

        <div className={styles["input-field"]}>
          <input
            className={styles["input-nums"]}
            type="text"
            value={displayValue}
          />
        </div>

        <div className={styles.numpad}>
          {nums.map((num, index) => {
            return (
              <button
                key={index}
                className={styles["key-numpad"]}
                onClick={() => handleNumberClick(num.toString())}
              >
                {num}
              </button>
            )
          })}

          {operators.map((operator, index) => {
            return (
              <button
                key={index}
                className={styles["key-numpad"]}
                onClick={() => handleOperatorClick(operator)}
              >
                {operator}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
