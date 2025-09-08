import { style } from "./App.module.css"
import { useState } from "react"

function App() {
  const [value, setValue] = useState("")
  const [list, setList] = useState("")
  const [error, setError] = useState("")

  const [isValueVaild, setIsValueValid] = useState(false)

  function onInputButtonClick() {
    const promptValue = prompt("Введите новое слово")

    if (promptValue.length < 3) {
      setError("Введенное значение должно содержать минимум 3 символа")
      setValue("")
      setIsValueValid(false)
    } else {
      setError("")
      setValue(promptValue)
      setIsValueValid(true)
    }
  }

  function onAddButtonClick() {
    const newWord = {
      id: Date.now(),
      value: value,
    }

    const updatedList = [...list, newWord]
    setList(updatedList)

    setValue("")
    setError("")
    setIsValueValid(false)
  }

  return (
    <>
      <div className="app">
        <h1 className="page-heading">Ввод значения</h1>
        <p className="no-margin-text">
          Текущее значение <code>value</code>:
          <output className="current-value"> {value}</output>
        </p>
        {error !== "" && <div className="error">{error}</div>}

        <div className="buttons-container">
          <button className="button" onClick={onInputButtonClick}>
            Ввести новое
          </button>
          <button
            className="button"
            disabled={!isValueVaild}
            onClick={onAddButtonClick}
          >
            Добавить в список
          </button>
        </div>
        <div className="list-container">
          <h2 className="list-heading">Список:</h2>
          {list.length === 0 ? (
            <p className="no-margin-text">Нет добавленных элементов</p>
          ) : (
            <ul className="list">
              {" "}
              {list.map((item) => (
                <li key={item.id} className="list-item">
                  {item.value}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default App
