import React from 'react'
import { WordFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const FilterParams = (props) => {
    
  const handleChange = (event) => {
    const filterVAlue = event.target.value
    props.WordFilter(filterVAlue)
    
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
const mapDispatchToProps =  {
  WordFilter,
}
const connectFilter = connect( null,mapDispatchToProps)(FilterParams)
export default connectFilter