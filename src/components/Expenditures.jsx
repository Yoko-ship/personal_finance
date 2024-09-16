import { useEffect, useState } from "react";
import Grafic from "./Grafic";
import checkImage from "./assert/check_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import deleteImage from "./assert/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"



function Expenditures() {
  const currentDateTime = new Date().toLocaleString("ru-RU");
  const [overall, setOverall] = useState("");

  const [currentPrice, setCurrentPrice] = useState("");
  const [consumption, setConsumption] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [usersExpenditure, setUsersExpenditures] = useState(0); //TODO:Здесь лежит учеты всех расходов(для просмотра месяцного учета)
  const [category, setCategory] = useState("");
  const [search,setSearch] = useState("")

  const [elements, setElements] = useState([]);
  const [graphData,setGraphData] = useState([]);
  const [graphLabels,setGraphLabels] = useState([])


  const filteredItems = elements.filter((item) =>
    item.content.some((contentItem) =>
      contentItem.value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );



  function currentPriceHandler(event) {
    setCurrentPrice(Number(event.target.value));
  }

  function consumptionHandler(event) {
    setConsumption(Number(event.target.value));
  }

  function nameHandler(event) {
    setNameProduct(event.target.value);
  }

  function categoryHandler(event) {
    setCategory(event.target.value);
  }

  function handleClick() {
    const calculatedOverall = currentPrice - consumption;
    setOverall(calculatedOverall);

    setUsersExpenditures(usersExpenditure + consumption);

    const newData = {
      id: elements.length,
      content: [
        { type: "category", value: category },
        { type: "data", value: currentDateTime },
        { type: "currentPrice", value: currentPrice },
        { type: "productName", value: nameProduct },
        { type: "consumption", value: consumption },
        { type: "overall", value: calculatedOverall },
      ],
      consumption,
    };

    setGraphData([...graphData,consumption])
    setGraphLabels([...graphLabels,currentDateTime])
    const updatedData = [...elements, newData];
    localStorage.setItem("elem", JSON.stringify(updatedData));
    setElements(updatedData);



    clearForm();
  }


  function clearForm() {
    setCurrentPrice("");
    setNameProduct("");
    setConsumption("");
    setCategory("")
  }

  function DeleteButton(id) {
    const elementToDelete = elements.find((el) => el.id === id);
    if (!elementToDelete) return;

    const updatedElements = elements.filter((el) => el.id !== id);
    setElements(updatedElements);
    localStorage.setItem("elem", JSON.stringify(updatedElements));

    setUsersExpenditures(usersExpenditure - elementToDelete.consumption);
  }

  function searchHandler(event){
    setSearch(event.target.value)
  }

  useEffect(() => {
    const storedElements = localStorage.getItem("elem");
    if (storedElements) {
      const parsed = JSON.parse(storedElements);
      setElements(parsed);

      const totalIncome = parsed.reduce(
        (acc, item) => acc + item.consumption,
        0
      );
      setUsersExpenditures(totalIncome);
    }
  }, []);


  return (
    <>
      <div className="forms">
        <div className="span-div">
          <span>Расходы</span>
        </div>
        <form>
          <label htmlFor="current_finance">Текущая сумма</label>
          <input
            type="number"
            id="current_finance"
            onChange={currentPriceHandler}
            value={currentPrice}
            required
          />

          <label htmlFor="name">Названия товара</label>
          <input
            type="text"
            id="name"
            onChange={nameHandler}
            value={nameProduct}
            required
          />

          <label htmlFor="price">Потраченная сумма</label>
          <input
            type="number"
            id="price"
            step={1}
            onChange={consumptionHandler}
            value={consumption}
            required
          />

          <label htmlFor="chosing">Выберите категорию</label>
          <select
            className="chosing"
            value={category}
            onChange={categoryHandler}
            required
          >
            <option value="">--Выберите--</option>
            <option value="Еда">Еда</option>
            <option value="Транспорт">Транспорт</option>
            <option value="Одежда">Одежда</option>
            <option value="Прочее">Прочее</option>
          </select>

          <label htmlFor="overall">Общие расходы</label>
          <input type="text" id="overall" value={usersExpenditure} disabled />

          <button type="button" onClick={handleClick}>
            <img
              src={checkImage}
              alt="confirm-button"
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
        placeholder="Search"
        />
      </div>

      <div className="graphic">
        <Grafic 
        currentData={elements.map(el => el.content.find(c => c.type === "data").value)}
        consumptionData={elements.map(el => el.consumption)}
        labels={elements.map(el => {
          const productName = el.content.find(c => c.type === "productName").value;
          const consumption = el.consumption;
          const date = el.content.find(s => s.type === "data").value
          const category = el.content.find(c => c.type === "category").value

          return `${category} - ${date} - Название товара:${productName}`
        
        })}
        
        />        
     </div>

      <div className="grids">
        {filteredItems.map((div) => (
          <div className="grid" key={div.id}>
            {div.content.map((item, index) => {
              const value = item.value
              return(
                <>
                  <p key={index}>
                  {item.type === "data" && `Дата:${value}`}
                  {item.type === "category" && (value !== "" ? `Категория:${value}` : <span style={{color:"red"}}>Вы не выбрали категорию </span>)}
                  {item.type === "currentPrice" && (value !== "" ? `Текущая цена:${value}`: <p style={{color:"red"}}>Вы не написали текущую сумму </p>)}         
                  {item.type === "productName" && (value !== "" ? `Названия товара:${value}`: <span style={{color:"red"}}>Вы не написали названия товара</span>)}         
                  {item.type === "consumption" && (value !== "" ? `Потраченная сумма:${value}`: <p style={{color:"red"}}>Вы не написали потраченную сумму</p>)}         
                  {item.type === "overall" && `Общая сумма:${value}`} 
                  </p>
                </>
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

export default Expenditures;
