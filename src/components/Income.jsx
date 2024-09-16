import { useState, useEffect } from "react";
import BarChart from "./IncomeGraphic";
import checkImage from "./assert/check_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import deleteImage from "./assert/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

function Income() {
  const currentDateTime = new Date().toLocaleString("ru-RU");

  const [currentName, setCurrentName] = useState("");
  const [currentIncome, setCurrentIncome] = useState("");
  const [elements, setElements] = useState([]);
  const [overall, setOverall] = useState(0);
  const [search,setSearch] = useState("")
  const [category,setCategory] = useState("")


  const filteredItems = elements.filter((item) =>
    item.content.some((contentItem) =>
    contentItem.value.toString().toLowerCase().includes(search.toLowerCase())
  )
  )


  // Обработчик изменения имени дохода
  function currentNameHandler(event) {
    setCurrentName(event.target.value);
  }

  // Обработчик изменения прибыли
  function currentIncomeHandler(event) {
    setCurrentIncome(Number(event.target.value));
  }

  // Обработчик нажатия на кнопку добавления дохода
  function ButtonHandler() {
    setOverall(overall + currentIncome);
    const newObjects = {
      id: elements.length,
      content: [
        {type:"category",value:category},
        { type: "date", value: currentDateTime },
        { type: "name", value: currentName },
        { type: "income", value: currentIncome },
      ],
      currentIncome,
    };

    const updatedElements = [...elements, newObjects];
    setElements(updatedElements);
    localStorage.setItem("elements", JSON.stringify(updatedElements));
    clearForm();
  }

  // Очистка формы после добавления
  function clearForm() {
    setCurrentName("");
    setCurrentIncome("");
    setCategory("")
  }

  // Обработчик удаления элемента дохода
  function DeleteButton(id) {
    const updatedElements = elements.filter((el) => el.id !== id);
    setElements(updatedElements);
    localStorage.setItem("elements", JSON.stringify(updatedElements));

    const elementToDelete = elements.find((el) => el.id === id);
    if (!elementToDelete) return;
    setOverall(overall - elementToDelete.currentIncome);
  }

  function searchHandler(event){
    setSearch(event.target.value)
  }

  function categoryHandler(event){
    setCategory(event.target.value)
  }




  // Загружаем элементы из localStorage при загрузке компонента
  useEffect(() => {
    const storedElements = localStorage.getItem("elements");
    if (storedElements) {
      try {
        const parsedElements = JSON.parse(storedElements);

        // Проверяем, что это массив
        if (Array.isArray(parsedElements)) {
          setElements(parsedElements);

          // Рассчитываем общую сумму доходов
          const totalIncome = parsedElements.reduce(
            (acc, item) => acc + item.currentIncome,
            0
          );
          setOverall(totalIncome);
        } else {
          console.error("Данные не являются массивом");
        }
      } catch (error) {
        console.error("Ошибка при разборе JSON из localStorage:", error);
      }
    }
  }, []);

  return (
    <>
      <div className="income-div">
        <div className="span-div">
          <span>Доходы</span>
        </div>
        <form>
          <label htmlFor="name">Источник дохода</label>
          <input
            type="text"
            id="name"
            onChange={currentNameHandler}
            value={currentName}
          />

          <label htmlFor="number">Прибыль</label>
          <input
            type="number"
            id="number"
            onChange={currentIncomeHandler}
            value={currentIncome}
          />

          <label htmlFor="category">Выберите категорию</label>
          <select id="category" onChange={categoryHandler} value={category} className="chosing">
            <option value="">--Выберите--</option>
            <option value="Зарплата">Зарплата</option>
            <option value="Стипендия">Стипендия</option>
            <option value="Прочее">Прочее</option>
          </select>


          <label htmlFor="overall-income">Общие доходы</label>
          <input type="text" id="overall-income" value={overall} disabled />

          <button type="button" onClick={ButtonHandler}>
            <img
              src={checkImage}
              alt="confirm button"
            />
          </button>
        </form>
      </div>

    <div className="input-search">
      <label>Поиск по категориям</label>
      <input
        type="text"
        value={search}
        onChange={searchHandler}
      />
    </div>

    <div className="graphic">
        <BarChart 
          income={elements.map(el => el.content.find(c => c.type === "income").value)}
          labels={elements.map(el => {
            const nameProduct = el.content.find(c => c.type === "name").value
            const date = el.content.find(c => c.type === "date").value
            const category = el.content.find(c => c.type === "category").value

            return `Источник дохода: ${nameProduct} - Время: ${date} Категория: ${category}`
          })}
        />
    </div>

      <div className="grids-income">
        {filteredItems.map((div) => (
          <div className="grid-income" key={div.id}>
            {div.content.map((item, index) => {
              const value = item.value;
              return(
                <p key={index}>
                {item.type === "date" && `Дата: ${value}`}
                {item.type === "name" && (value !== "" ? `Источник дохода:${value}`: <span style={{color:"red"}}>Вы не написали источник дохода</span>)}
                {item.type === "income" && (value !== "" ? `Прибыль:${value}`: <span style={{color:"red"}}>Вы не написали прибыль</span>)}
                {item.type === "category" && (value !== "" ? `Категория:${value}`: <span style={{color:"red"}}>Вы не указали категорию</span>)}
              </p>
              )

            })}
            <div className="buttons-div">
              <button onClick={() => DeleteButton(div.id)}><img src={deleteImage}/></button>
            </div>

          </div>
        ))}
      </div>
    </>
  );
}

export default Income;
