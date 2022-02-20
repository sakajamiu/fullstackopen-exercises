import { FETCH_BOOKS} from '../queries'
import { useQuery } from '@apollo/client'
const Books = (props) => {
  const result = useQuery(FETCH_BOOKS)
  if (!props.show) {
    return null
  }


if (result.loading){
  return <div>loading...</div>
}
  const books = result.data.allBook

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
