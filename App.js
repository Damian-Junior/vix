import React, {useState} from 'react';
import uuid from 'react-uuid';
import './App.css';
let editid = '';  

const  App =  ()=>{

const [visible, setVisible] = useState(true); 
const [name, setName] = useState('');
const [list, setList] = useState([]);

// set the name to the value
const handleIput = event => {
  setName(event.target.value);
}
// add the value to the list
const submitValue = ()=>{
  
  if (name !== '') {
      setList([
      ...list,
        {name, id: uuid()}
    ]);
  // reset the name to empty
  setName('');
  
  }
   
}
// delete an item from the list 
const removeItem = (event)=> {
  const updatedList = list.filter(item => item.id !== event.target.id);
  setList(updatedList);
  setVisible(true);
}
// get and store the id of the item to be edited
const edit = (id)=> {
  const editItem = list.find(item => item.id === id)
  setName(editItem.name)
  editid = editItem.id;
  if (!visible){
    setName('');
  }
setVisible(!visible);

}
//change the name of the eidted item
const updateState = ()=>{
  const newItem = list.filter(item => item.id == editid)// get the editd item
  newItem[0].name = name; // set its new name to the value of the field

  setName('');
  setVisible(true);
}
    return(
    <div className = "container" >
         <input type="text" value={name} name="item" placeholder = "Enter an activity here..." onChange = {handleIput}
            id = "input" autoFocus ></input>
         
         <button onClick = {visible ? submitValue: updateState } id="add" >{visible ? 'Add': 'update'}</button>
          <ul id = "itemBox">
           {list.length === 0 ? 'NO TODO ADDED YET': list.map((item, idx)=>{
             return (
               <li key= {item.id} className = "items" >{(item.name)} 
               <button  onClick = {()=>edit(item.id)} className ="editButton"> &#9998;</button>
               <button  id={item.id} onClick = {removeItem} className = 'deleteButton'>X</button>
               </li>
             )
           })}

          </ul>
         </div>
          
        

  )
}
export default App;