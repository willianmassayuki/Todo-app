import React, { useState, useEffect } from 'react';
import '../styles/components/addItem.scss';

const AddItem = () => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [all, setAll] = useState([]);
  const [active, setActive] = useState([]);


  // Recebe o valor do input
  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  // Adiciona um item à lista de dados
  function handleChange() {
    if(inputValue == '' | all.includes(inputValue)){
        alert('Enter a valid input or a different value from the existents');
    }else if (inputValue !== '') {
      setItems(prevItems => [...prevItems, inputValue]);
      setAll(prevItems => [...prevItems, inputValue]);
      setActive(prevItems => [...prevItems, inputValue]);
      setInputValue('');
    }
  }

  // Muda o status 
  function handleClick(clickedItem) {
    if (!completed.includes(clickedItem)) {
        setCompleted(prevCompleted => [...prevCompleted, clickedItem]);
      } else {
        setCompleted(prevCompleted => prevCompleted.filter(item => item !== clickedItem));
      }      
  }

  // Deleta o item
  function deleteItem(clickedItem) {
    const updatedItems = all.filter(item => item !== clickedItem);
    setAll(updatedItems);
    setItems(updatedItems);
    if (completed.includes(clickedItem)) {
        setCompleted(prevCompleted => prevCompleted.filter(item => item !== clickedItem));
    }   
  }

  // Deleta todos os que estão completos
  function clearCompleted() {
    const updatedItems = all.filter(item => !completed.includes(item));
    setAll(updatedItems);
    setItems(updatedItems);
    setCompleted([]);
  }

  function showAll() {
    setItems(all);
  }

  function showActive() {
    const activeItems = all.filter(item => !completed.includes(item));
    setActive(activeItems);
    setItems(activeItems);
  }

  function showCompleted() {
    setItems(completed);
  }

// Local storage

useEffect(() => {
    loadDataFromStorage();
  }, []);

  function loadDataFromStorage() {
    const storedItems = localStorage.getItem('items');
    const storedCompleted = localStorage.getItem('completed');
    const storedAll = localStorage.getItem('all');
    const storedActive = localStorage.getItem('active');

    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }

    if (storedCompleted) {
      setCompleted(JSON.parse(storedCompleted));
    }

    if (storedAll) {
      setAll(JSON.parse(storedAll));
    }

    if (storedActive) {
      setActive(JSON.parse(storedActive));
    }
  }

  function updateLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('completed', JSON.stringify(completed));
    localStorage.setItem('all', JSON.stringify(all));
    localStorage.setItem('active', JSON.stringify(active));
  }

  useEffect(() => {
    updateLocalStorage();
  }, [items, completed, all, active]);



  return (
    <>
      <div>
        <input type="checkbox" onChange={handleChange} />
        <input
          type="text"
          name="entrada"
          placeholder="Create a new Todo"
          value={inputValue}
          onChange={handleInputChange}
        />

        {items.map((item, index) => (
          <div className='item' key={index}>
            <input type="checkbox" name={`${item + index}`} onChange={() => handleClick(item)} />
            <label htmlFor={`${item + index}`} className={`${completed.includes(item) ? 'completed' : '' }`} >{item}</label>
            <button onClick={() => deleteItem(item)}><img src="images/icon-cross.svg" alt="Delete" /></button>
          </div>
        ))}

      </div>
      <div className="appFooter">
        {items.length !== 0 ? <p>{items.length} Item{items.length > 1 ? 's' : ''} left</p> : null}
        <button onClick={showAll}>All</button>
        <button onClick={showActive}>Active</button>
        <button onClick={showCompleted}>Completed</button>
        <button onClick={clearCompleted}>Clear completed</button>
      </div>
    </>
  );
};

export default AddItem;
