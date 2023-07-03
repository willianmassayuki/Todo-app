import React, { useState } from 'react';
import '../styles/components/addItem.scss';

const AddItem = () => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState(false);
  const [clickIndex, setClickIndex] = useState();
  const [completed, setCompleted] = useState([]); 
  const [active, setActive] = useState([]);   

  // Recebe o valor do input
  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  // Adiciona um item à lista de dados
  function handleChange() {
    inputValue != '' ? setItems(prevItems => [...prevItems, inputValue]) : null; 
    setInputValue('');
    console.log(items);
  }

  // Muda o status 
  function handleClick(index) {
    setClickIndex(index);
    setStatus(status => !status);
    console.log(clickIndex);
    console.log(status);

  }


  // Deleta o item
  function deleteItem(alvo) {
    const updatedItems = items.filter(item => item !== alvo);
    setItems(updatedItems);
  }

  // Deleta todos os que estão completos
  function clearCompleted() {
    
  }

  return (
    <><div>
          <input type="checkbox" onChange={handleChange} />
          <input
              type="text"
              name="entrada"
              placeholder="Create a new Todo"
              value={inputValue}
              onChange={handleInputChange} />

          {items.map((item, index) => (
              <div className='item' key={index}>
                  <input type="checkbox" name={`${item + index}`} onClick={() => handleClick(index)} />
                  <label htmlFor={`${item + index}`} className={`${clickIndex === index ? status ? 'completed' : '' : null}`}>{item}</label>
                  <button onClick={() => deleteItem(item)}><img src="images/icon-cross.svg" alt="" /></button>
              </div>
          ))}

        </div>
        <div className="appFooter">
            {items.length != 0 ? <p>{items.length} Item{items.length > 1? 's' : ''} left</p> : null}

            <button onClick={clearCompleted}>Clear completed</button>
        </div></>
  );
};

export default AddItem;
