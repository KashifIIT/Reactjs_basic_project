import React, {useState} from 'react'
import { FaTrash } from 'react-icons/fa';  // FaTrash means FontAwesome Trash icon

export default function Textform(props) {

  let [No_Of_List, Cne_lst_no] = useState(0); //I have to make it for n no. of lists accordingly.
  let [expense, setExpense] = useState(0)
  let [Inputvalue, setInput] = useState('')
  let [Lists, NewList] = useState([]) //Here I create an array of object to store expense list.
  let [ThingName, ChangeTextInput] = useState('')
  let [ListName, ChangeListName] = useState('');
  let [ListNumber, ChangeListNumber] = useState();
  let [OpenListInput, ChangeOpenListInput] = useState(''); //Think once to change shown list data dynamically as well If you get some time

  let Defaultlist = { //It's a single object rather than array of object.
    List_Name: "It's Default list.",
    Expenses : []
  }

  let [ShowingList, Change_Showing_List] = useState(Defaultlist);

  let TotalExpense = 0; //Made to show Total expense done in showed list.
  let FinalTotalExpense = 0; //Made to show total expenses done in all list.

  function ChangeExpenseInput(e) {
    setInput(e.target.value);
  }

  function ChangeTextinput(e) {
    ChangeTextInput(e.target.value)
  }

  function Change_List_Name (e) {
    ChangeListName(e.target.value);
  }

  function Change_List_Number (e) {
    ChangeListNumber(e.target.value);
  }

  function Change_Open_List_Input (e) {
    ChangeOpenListInput(e.target.value);
  }

  function DeleteExpense (EpeNum) {

    const NewShowingListExpense = ShowingList.Expenses.filter((expense, index) => { //Filter wants 0 (false => Don't take it) or 1 (true) in return.
      if(index+1 === EpeNum) return 0;
      else return 1;
    })

    const NewShowingList = {...ShowingList, Expenses: NewShowingListExpense};

    Change_Showing_List(NewShowingList);

    NewList(Lists.map((list) => {
      if(list.id === ShowingList.id) return {...list, Expenses: NewShowingListExpense} //Used for just changing a particular thing in an object.
      else return list;
    }))

  }

  function DeleteList (listid) {

    //WE CAN'T DO LIKE THIS BECAUSE CHANGING STATE FUNCTIONS ARE ASYNCHRONOUS AND USING IT JUST AFTER ANOTHER OVERWRITES -
    // - THE PREVIOUS ONE IF THAT OPERATION HAS NOT DONE TILL START OF NEW CHANGING OPERATION I.E. MAP JUST AFTER FILTER.

    // NewList(Lists.filter((list) => {
    //   if(list.id === listid) return 0;
    //   else return 1;
    // })
    // )

    // let a = 0;

    // NewList(Lists.map((list) => {
    //   return {...list, id : ++a}
    // })
    // )

    // Cne_lst_no(a);

    const ChangedList = Lists.filter((list) => {
      if(list.id === listid) return 0;
      else return 1;
    })

    let a = 0;

    const UpdatedIdChangedList = ChangedList.map((list) => {
      return {...list, id : ++a}
    })
    

    NewList(UpdatedIdChangedList);

    Cne_lst_no(a);
  }

  function Addlist () {

    if(ListName === "") {

      alert("List name is required.")
      return;

    }
    const New_list = {id: No_Of_List + 1, List_Name: ListName, Expenses: []}
    ChangeListName('');
    NewList([...Lists, New_list]);

    Cne_lst_no(prev => prev + 1); //It's a asynchronous function, so I should not run it first.

  }

function AddExpense(listId, itemName, amount) {

  let a = expense + parseFloat(amount);
  setExpense(a); //Changing total expense value.

  const newExpense = {
    ItemName: itemName,
    Amount: parseFloat(amount)
  };
  
  NewList(prevLists =>
    prevLists.map((list) => {
      if(list.id === listId) {
        return { ...list, Expenses: [...list.Expenses, newExpense] } //Appending new expense in required list keeping original data intact.
      } else {
        return list;
      }    
    }
  )
  )

  //Done to dynamically change expenses if added expense made in shown list.

  
  ChangeTextInput('');
  setInput('');

} 

function OpenListFunction (lsid) { //This whole thing should come under curly bracket.

  TotalExpense = 0; //Done so that previous stored value can be erased.

  const matchedList = Lists.find((list) => list.id === lsid);
  Change_Showing_List(matchedList || Defaultlist); //How it's working, research in-deep.

}
 
  return (
    <>
    <div>
    {

      Lists.map((list) => {

        list.Expenses.map((expense) => {
          FinalTotalExpense += expense.Amount;
        })

      })

    }

    <div><b style={{fontSize: '18px'}}>Total Expense done: </b><span style={{fontFamily : 'Roboto Mono, monospace', fontSize : '16px'}}>₹{FinalTotalExpense}</span></div><br/><hr/>
    <br/>

      <label for = "Addlist"><b>Add new list:</b></label><br/><br/>
      <input className = "Input" required placeholder="Enter list name" value = {ListName} onChange = {Change_List_Name} type = "text"/><br/><br/>
      <button className = "Button" onClick = {Addlist}>Add</button><br/><br/><hr/>

      <br/>

      <div id="bullu"><b>Add expenses in list:</b></div><br></br>
      <label for="Listno" style = {{paddingRight: '40px'}}>Enter list number (ex. 1): </label>
      <input className = "Input Input1a" type = "number" placeholder = "Enter list number" value = {ListNumber} onChange = {Change_List_Number} /><br></br>

      <label for = "Itemname" style = {{paddingRight: '92px'}}>Enter item name: </label>
      <input  className = "Input Input1a" value = {ThingName} placeholder= "Enter item name" onChange = {ChangeTextinput} type = "text"/><br></br>

      <label for="value" style = {{paddingRight: '113px'}} >Enter amount: </label>
      <input className = "Input" value = {Inputvalue} onChange = {ChangeExpenseInput} placeholder = "Enter amount" type="number"/><br/><br/>
      
      <button className = "Button"  onClick = {() => AddExpense(parseFloat(ListNumber), ThingName, Inputvalue)}>Submit</button>
    </div><br></br>

    <hr></hr><br/>
    <div><input className = "Input" type = "text" placeholder = "Enter list number" value = {OpenListInput} onChange = {Change_Open_List_Input}/> -- <button className = "Button" onClick = {() => {OpenListFunction(parseFloat(OpenListInput))}}>Open list</button></div>
    <br/>

<div><b>List name: </b>{ShowingList.List_Name}</div>

{
ShowingList.Expenses.map((Expense, index) => {

TotalExpense += Expense.Amount;

return (
<div key={index}>  {/* What key is doing here */}
{index + 1}. {Expense.ItemName} - ₹{Expense.Amount} - <button style = {{
backgroundColor: 'red', 
cursor: 'pointer', 
borderRadius: '10px',
padding: '5px'
}} 
onClick = {() => {DeleteExpense(index+1)}}
><FaTrash/></button>

{/*Created anonymous function in delete button to call it instead of just writing like <button onClick={() => Delete(ExpenseList.id)}></button>*/}

</div>
) //return statement ended up.
})}

<p>Total Expense done in this List is ₹{TotalExpense}</p>

    <hr></hr>
    <p><b>Expense list name(s):</b></p>

    {
      (Lists.length === 0) ? (
        <div>No list added yet. Please add a list to see here.</div>
      ) : (

      Lists.map((list) => {
        
        let TotalExpense = 0;

        list.Expenses.map((Expense) => {
          TotalExpense += Expense.Amount;
          return Expense; //Return is done just to remove error.
        })

        return (
        <div>{list.id}. {list.List_Name} - ₹{TotalExpense} - <button style = {{
          backgroundColor: 'red', 
          cursor: 'pointer', 
          borderRadius: '10px',
          padding: '5px'
          }} 
          onClick = {() => {DeleteList(list.id)}}
          ><FaTrash/></button></div>
        )
}) )
    }
    </>
  )
}