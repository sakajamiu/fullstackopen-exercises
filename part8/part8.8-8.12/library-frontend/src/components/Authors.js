import { useQuery } from "@apollo/client"
import { FETCH_AUTHORS } from "../queries"
import UpdatedAuthor from './UpdateAuthor'
const Authors = (props) => {
  
  const result = useQuery(FETCH_AUTHORS)
  if (!props.show) {
    return null
  }
  if(result.loading){
    return <div>loading...</div>
  }
  const authors = result.data.allAuthor
  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UpdatedAuthor authors = {authors}/>
    </div>
  )
}

export default Authors
