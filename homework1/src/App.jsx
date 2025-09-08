import styles from "./App.module.css"
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
     <div className={styles.app}>
        <h1 className={styles.pageHeading}>Ввод значения</h1>
        <p className={styles.noMarginText}>
          Текущее значение <code>value</code>:
          <output className={styles.currentValue}> {value}</output>
        </p>
        {error !== "" && <div className={styles.error}>{error}</div>}

        <div className={styles.buttonsContainer}>
          <button className={styles.button} onClick={onInputButtonClick}>
            Ввести новое
          </button>
          <button
            className={styles.button}
            disabled={!isValueVaild}
            onClick={onAddButtonClick}
          >
            Добавить в список
          </button>
        </div>
        <div className={styles.listContainer}>
          <h2 className={styles.listHeading}>Список:</h2>
          {list.length === 0 ? (
            <p className={styles.noMarginText}>Нет добавленных элементов</p>
          ) : (
            <ul className={styles.list}>
              {" "}
              {list.map((item) => (
                <li key={item.id} className={styles.listItem}>
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
