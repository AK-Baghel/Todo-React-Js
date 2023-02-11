import React, { useState, useEffect } from 'react'
import "./Todo.css"


const Todo = () => {

  const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
    if (lists)
      return JSON.parse(lists);
    else
      return lists;
  }

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setisEditItem] = useState("");
  const [toggle, settoggle] = useState(false);

  const addItem = () => {
    if (!inputData)
      alert(`Plz fill the data...`)
    else if (inputData && toggle) {
      setItems(
        items.map((currElem) => {
          if (currElem.id === isEditItem)
            return { ...currElem, name: inputData }
          return currElem;
        })
      )
      setInputData("");
      setisEditItem();
      settoggle(false);
    }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData
      }
      setItems([...items, myNewInputData]);
    }
    setInputData("");
  }

  const deleteItem = (index) => {
    const updatedItems = items.filter((currElem) => {
      return currElem.id !== index;
    })
    setItems(updatedItems);
  }

  const removeAll = () => {
    setItems([]);
  }

  const editItem = (index) => {
    const editedItem = items.find((currElem) => {
      return currElem.id === index;
    })
    setInputData(editedItem.name);
    setisEditItem(index);
    settoggle(true);
  }

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items))
  }, [items])


  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.png" alt="todo-img" />
            <figcaption>Add Your List Here✍️</figcaption>
          </figure>
          <div className="addItems">
            <input className='form-control' type="text" placeholder='✍️Add Item Here' value={inputData} onChange={(event) => setInputData(event.target.value)} />

            {toggle ? <i className="far fa-edit add-btn" onClick={addItem}></i> : <i className="fa fa-duotone fa-square-plus add-btn" onClick={addItem}></i>}

          </div>

          <div className="showItems">
            {items.map((currElem,index) => {
              return (
                < div className="eachItem" key={index}>
                  <h3>{currElem.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={() => editItem(currElem.id)}></i>
                    <i className="far fa-trash-alt add-btn" onClick={() => {
                      deleteItem(currElem.id)
                    }}></i>
                  </div>
                </div>
              )

            })}
          </div>

          <div className="showItems">
            <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
              <span>CHECK LIST </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo