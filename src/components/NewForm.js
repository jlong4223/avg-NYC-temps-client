import {useEffect, useState} from 'react'



const NewForm = (props)=>{
// TODO get state from backend and form submit
    const [tempState, setTempState]= useState([{
        average_high_f: 0,
        average_low_f: 0,
        month: '', 
        location_id: 1
    }])

    async function getTempData(){
        const data = await fetch('/temperatures').then(res => res.json())
        setTempState(data)
    }

    useEffect(()=>{
        getTempData()
        console.log('effect done')
    }, [])

    function handleTempChange(e){
        setTempState(prevState =>({
            ...prevState, 
            [e.target.name]: e.target.value
        }))
    }

    function submitTemp(e, formInputs){
        e.preventDefault()
        console.log({tempState})
        return fetch('/temperatures', {
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
            <input placeholder='1' type='number' name='location_id' value={tempState.location_id} onChange={handleTempChange} required />
            <button type='submit'>Add</button>
        </form>
    )
}

export default NewForm