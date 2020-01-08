import React, { useState } from 'react'

const EditAuthor = ({ editAuthor, show, authors }) => {
  const [name, setAuthor] = useState('')
  const [born, setYear] = useState('')

  if (!show){
    return null
  }

  const handleChange = (event) => {
    setAuthor(event.target.value)
    console.log(name)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await editAuthor({
        variables: { name, born: parseInt(born) }
      })
    
  }

  const handleYear = (event) => {
    setYear(event.target.value)
  }
return(
    <div>
    <br></br>
    <h2>Set birthyear</h2>
    <form onSubmit={handleSubmit}>
    <label>
        Pick author:
        <select onChange={handleChange}>
        {authors.map(authori => (
            <option key={authori.name} value={authori.name}>{authori.name}</option>
            ))}
        </select>
    </label>
    <br />
    <label>born</label>
    <input type="text" value={born} onChange={handleYear} />
    <br></br>
    <input type="submit" value="Set year" />
    </form>
    </div>)
}

export default EditAuthor