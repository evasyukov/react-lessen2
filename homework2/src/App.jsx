import { useState } from "react"
import styles from "./app.module.css"
import data from "./data.json"

export const App = () => {
  const [steps] = useState(data)
  const [activeIndex, setActiveIndex] = useState(0)

  const isStart = 0
  // в задании зачем-то указано два флага сделать, но потом же указано менять последнюю кнопку
  // отчего второй флаг не нужен получается, но с ним тоже все было хорошо, оставлю на память
  const isEnd = steps.length - 1

  function prevStep() {
    setActiveIndex(activeIndex - 1)
  }

  function nextStep() {
    setActiveIndex(activeIndex + 1)
  }

  function startOver() {
    setActiveIndex(0)
  }

  function goToStep(index) {
    setActiveIndex(index)
  }

  const buttonNext = (
    <button className={styles.button} onClick={nextStep}>
      Далее
    </button>
  )

  const buttonStartOver = (
    <button className={styles.button} onClick={startOver}>
      В начало
    </button>
  )

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles["steps-content"]}>
            {steps[activeIndex].content}
          </div>

          <ul className={styles["steps-list"]}>
            {steps.map(({ id, title }, index) => {
              let stepClass = styles["steps-item"]

              if (index === activeIndex) {
                stepClass += " " + styles.active
              }
              if (index < activeIndex || index === activeIndex) {
                stepClass += " " + styles.done
              }

              return (
                <li className={stepClass} key={id} onClick={() => goToStep(index)}>
                  <button className={styles["steps-item-button"]} >
                    {id % 1000}
                  </button>
                  {title}
                </li>
              )
            })}
          </ul>

          <div className={styles["buttons-container"]}>
            <button
              className={styles.button}
              onClick={prevStep}
              disabled={activeIndex === isStart}
            >
              Назад
            </button>

            {activeIndex === isEnd ? buttonStartOver : buttonNext}
          </div>
        </div>
      </div>
    </div>
  )
}
