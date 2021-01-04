import {useState} from 'react'



const NewForm = (props)=>{

    const [tempState, setTempState]= useState({
        average_high_f: 0,
        average_low_f: 0,
        month: '', 
        location_id: 1
    })

    function handleTempChange(e){
        setTempState(prevState =>({
            ...prevState, 
            [e.target.name]: e.target.value
        }))
    }
// TODO edit the type within the input
    return(
        <form>
            <legend>Add new temperature</legend>
            <input placeholder="average high" type="number" name="average_high_f" value={tempState.average_high_f} onChange={handleTempChange}/>
            <input placeholder="average low" type="number" name="average_low_f" value={tempState.average_low_f} onChange={handleTempChange}/>
            <input placeholder="month" type="text" name="month" value={tempState.month}/>
            <button type='submit'>Add</button>
        </form>
    )
}

export default NewForm