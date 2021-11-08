import React from 'react'
import { WordFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const FilterParams = () => {
    const dispatch = useDispatch()
  const handleChange = (event) => {
    const filterVAlue = event.target.value
    dispatch(WordFilter(filterVAlue))
    
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name ='filter' onChange={handleChange} />
    </div>
  )
}

export default FilterParams