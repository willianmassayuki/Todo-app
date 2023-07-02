import React, { useState } from 'react';
import '../styles/components/addItem.scss';

const AddItem = () => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState(false);

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
  function handleClick() {
    setStatus(status => !status);
    console.log('mude o status');
  }

  return (
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
                <input type="checkbox" name={`${item+index}`} onClick={handleClick} />
                <label htmlFor={`${item+index}`} className={`${ status ? 'completed' : ''}`} key={index}>{item}</label>
            </div>
        ))}
     
    </div>
  );
};

export default AddItem;
