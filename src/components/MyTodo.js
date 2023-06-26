import React, { useState } from 'react'
import todo from '../images/NotesToDo.PNG';
<images />

const MyTodo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState([]);
    const [toggleSubmit,setToggleSubmit]=useState(true);
    const[isEditItem,setisEditItem]=useState(null);
    const addItem = () => {
        if (!inputData) {
            alert("Empty data can't be added");
        } else if(inputData && !toggleSubmit){
           setItems(
            items.map((elem)=>{
                if(elem.id===isEditItem){
                    return {...elem, name:inputData}
                }
                return elem;
            })
           )
           setToggleSubmit(true); //This will change edit button to add button
           setInputData(' '); // This will make input field to the blank
           setisEditItem(null); // This will set the isEditItem as blank
        }else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData]);
            setInputData('');
        }
    }
    const deleteItem = (index) => {
        const updatedItems = items.filter((elem) => {
            return index !== elem.id;
        });
        setItems(updatedItems);
    }
    const editItem = (id) => {
        let newEditItem=items.find((elem)=>{
            return elem.id===id;
        })
        console.log(newEditItem);
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setisEditItem(id);
    }
    //removeAll
    const removeAll = () => {
        setItems([]);
    }
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={todo} alt="" />
                        <figcaption>Add your list here 👍</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='✍ Add Items...'
                            value={inputData} onChange={(e) => setInputData(e.target.value)} />
                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>:
                            <i className="fa fa-edit add-btn" title="Update Item" onClick={addItem}></i>
                        }
                        
                    </div>
                    <div className="showItems">
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className="todo-btn">
                                            <i className="fa fa-edit add-btn" style={{color: 'black'}} title="Edit Item" onClick={() => editItem(elem.id)}></i>
                                            <i className="fa fa-trash add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* Clear all items */}
                    <div className="showItems">
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>CheckList</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyTodo