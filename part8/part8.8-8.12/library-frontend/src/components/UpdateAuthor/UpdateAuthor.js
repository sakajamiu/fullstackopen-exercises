import React, { useState } from 'react'
import Select from 'react-select'
import styles from './index.module.css'
import { EDIT_AUTHOR } from '../../queries'
import { useMutation } from '@apollo/client'

export const UpdateAuthor = ({authors}) => {
    const [selectedOption, setSelectedOption] = useState(null)
    const [born,setBorn] = useState('')
    const [changeBorn] = useMutation(EDIT_AUTHOR)
    const options =authors.map((a) => ({value: a.name, label: a.name}))
    
    const submit =(event) =>{
        event.preventDefault()
        changeBorn({variables: { name: selectedOption.value , born}})
        setSelectedOption(null)
        setBorn('')
    }
   
    return(
        <div>
            <h1> Edit Author Birth Year</h1>
            <div>
                <form onSubmit={submit} className ={`${styles.form}`}>
                    <div>
                        Author
                        <Select
                            defaultValue={selectedOption}
                            onChange ={setSelectedOption}
                            options ={options}
                        />
                    </div>
                    <div className={`${styles.input}`}>
                        Born
                        <input 
                        type= 'number'
                        value = {born}
                        onChange = {(e) => setBorn(Number(e.target.value))}/>
                    </div>
                    <button type = 'submit' className={`${styles.input}`}> Edit Author </button>
                </form>
            </div>
        </div>
    )

}


