import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [title, setTitle] = useState('name')
  const [value, setValue] = useState('random')

  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label

      setTitle(newValue)
      setValue(person[newValue])
      console.log(newValue)
    }
  }

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    const person = data.results[0]
    // console.log(person)

    const { first, last } = person.name
    const { phone, email } = person
    const {
      street: { number, name },
    } = person.location
    const { password } = person.login
    const { age } = person.dob
    const { large: image } = person.picture

    const newPerson = {
      phone,
      image,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    }
    console.log(person.location)

    setLoading(false)
    setPerson(newPerson)
    setTitle('name')
    setValue(newPerson.name)

    console.log(newPerson)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          <img
            src={(person && person.image) || defaultImage}
            alt='image'
            className='user-img'
          />
          <p className='user-title'>my {title} is </p>
          <p className='user-value'>{value}</p>
          <div className='values-list'>
            <button
              className='icon'
              onMouseOver={handleValue}
              data-label='name'
            >
              <FaUser />
            </button>
            <button
              className='icon'
              onMouseOver={handleValue}
              data-label='email'
            >
              <FaEnvelopeOpen />
            </button>
            <button className='icon' onMouseOver={handleValue} data-label='age'>
              <FaCalendarTimes />
            </button>
            <button
              className='icon'
              onMouseOver={handleValue}
              data-label='street'
            >
              <FaMap />
            </button>
            <button
              className='icon'
              onMouseOver={handleValue}
              data-label='phone'
            >
              <FaPhone />
            </button>
            <button
              className='icon'
              onMouseOver={handleValue}
              data-label='password'
            >
              <FaLock />
            </button>
          </div>
          <button className='btn' type='button' onClick={() => fetchData()}>
            {loading ? '...loading' : 'random person'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
