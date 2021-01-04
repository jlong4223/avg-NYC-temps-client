import {useState} from 'react'



const NewForm = (props)=>{
// TODO fix state and form submit
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

    function submitTemp(e, formInputs){
        e.preventDefault()
        console.log({tempState})
        fetch('/temperatures', {
            body: JSON.stringify(formInputs),
            method: 'POST', 
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-type": "application/json"
            }
        }).then(createdTemp => createdTemp.json())
        .then(jsonedTemp => {setTempState(prevState => ({ tempState:
            [jsonedTemp, ...prevState]
        }))})
        .catch(error => console.log(error))
    }

    return(
        <form onSubmit={submitTemp}>
            <legend>Add new temperature</legend>
            <input placeholder="average high" type="number" name="average_high_f" value={tempState.average_high_f} onChange={handleTempChange} required/>
            <input placeholder="average low" type="number" name="average_low_f" value={tempState.average_low_f} onChange={handleTempChange} required/>
            <input placeholder="month" type="text" name="month" value={tempState.month} onChange={handleTempChange} required/>
            <button type='submit'>Add</button>
        </form>
    )
}

export default NewForm