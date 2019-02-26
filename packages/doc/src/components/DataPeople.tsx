/** @jsx jsx */
import { useState, useEffect } from 'react'
import React from 'react'
import { jsx, css, SerializedStyles } from '@emotion/core'
import axios, { AxiosResponse } from 'axios'
import { Frame } from '@nyctalope/react'

export const PeoplePhoto = (props) => {
  const [people, setPeople] = useState<any>([])
  useEffect(() => {
    const fetchNames = async (amount = 1) => {
      const result = await axios('https://uinames.com/api/?amount=10&ext')
      setPeople(result.data)
    }
    fetchNames()
  }, [])
  const randomIndex = Math.floor(Math.random() * 10)
  const photo = people[randomIndex] ? people[randomIndex].photo : ''
  const style = props.style || {}
  const combinedStyle = {
    backgroundImage: `url(${photo})`,
    backgroundSize: 'cover',
    minHeight: '100px',
    display: 'inline-block',
    borderRadius: '10px',
    ...style,
  }
  console.log('photo:', photo)
  return <Frame style={combinedStyle} />
}
