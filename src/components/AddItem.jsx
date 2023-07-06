import React, { useState, useEffect } from 'react';
import '../styles/components/addItem.scss';

const AddItem = () => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [all, setAll] = useState([]);
  const [active, setActive] = useState([]);
  const [isChecked, setIsChecked] = useState(false); 
  const [activeTab, setActiveTab] = useState(''); 
  const [warning, setWarning] = useState(true);
  
    // Recebe o valor do input
    function handleInputChange(event) {
        setInputValue(event.target.value);
        setWarning(true);
    }

    // Adiciona um item à lista de dados
    function handleChange(event) {
        if (event.target.checked) {
            if (inputValue === '' || all.includes(inputValue)) {
                setWarning(false);
            } else {
                const newItem = inputValue;
                setItems(prevItems => [...prevItems, newItem]);
                setAll(prevItems => [...prevItems, newItem]);
                setActive(prevItems => [...prevItems, newItem]);
                setInputValue('');
            }
        }
        setIsChecked(false);
        updateLocalStorage();
    }


  // Muda o status 
  function handleClick(clickedItem) {
    if (!completed.includes(clickedItem)) {
        setCompleted(prevCompleted => [...prevCompleted, clickedItem]);
      } else {
        setCompleted(prevCompleted => prevCompleted.filter(item => item !== clickedItem));
      }      
      updateLocalStorage();
  }

  // Deleta o item
  function deleteItem(clickedItem) {
    const updatedItems = all.filter(item => item !== clickedItem);
    setAll(updatedItems);
    setItems(updatedItems);
    if (completed.includes(clickedItem)) {
        setCompleted(prevCompleted => prevCompleted.filter(item => item !== clickedItem));
    }   
    updateLocalStorage();
  }

  // Deleta todos os que estão completos
  function clearCompleted() {
    const updatedItems = all.filter(item => !completed.includes(item));
    setAll(updatedItems);
    setItems(updatedItems);
    setCompleted([]);
    updateLocalStorage();
  }

  function showAll() {
    setItems(all);
    updateLocalStorage();
    setActiveTab('all'); 
  }

  function showActive() {
    const activeItems = all.filter(item => !completed.includes(item));
    setActive(activeItems);
    setItems(activeItems);
    updateLocalStorage();
    setActiveTab('active');
  }

  function showCompleted() {
    setItems(completed);
    updateLocalStorage();
    setActiveTab('completed');
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

  return (
    <>
        <div className='input-container'>
            <input className="checkbox" type="radio" onChange={handleChange} checked={isChecked} />
            <input
                type="text"
                name="entrada"
                placeholder="Create a new Todo"
                value={inputValue}
                onChange={handleInputChange}
            />
            <label className={`${warning ? 'w-inactive' : ''}`} htmlFor='entrada'>Invalid input</label> 
        </div>
    
        <div className='container-principal'>
        <div className='list-container'>
            {items.map((item, index) => (
            <div className='item-container' key={index}>
                <input type="checkbox" name={`${item}`} onChange={() => handleClick(item)} />
                <label htmlFor={`${item}`} className={`${completed.includes(item) ? 'completed' : '' }`} >{item}</label>
                <button onClick={() => deleteItem(item)}><img src="/images/icon-cross.svg" alt="Delete" /></button>
            </div>
            ))}
        </div>
        <div className="app-footer">
            <p>{items.length} Item{items.length > 1 ? 's' : ''} left</p> 
            <div className='central-tab'>
                <button className={`${activeTab == 'all' ? 'active-tab': ''}`} onClick={showAll}>All</button>
                <button className={`${activeTab == 'active' ? 'active-tab': ''}`} onClick={showActive}>Active</button>
                <button className={`${activeTab == 'completed' ? 'active-tab': ''}`} onClick={showCompleted}>Completed</button>
            </div>
            <button onClick={clearCompleted}>Clear completed</button>
        </div>
        </div>
    </>
  );
};

export default AddItem;
