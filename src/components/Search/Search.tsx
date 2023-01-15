import React, { useEffect, useState } from 'react'

interface ISearchBarProps {
  onSearch: (searchText: string) => void
  placeholder: string
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
}

export function SearchBar(props: ISearchBarProps) {
  // const [text, setText] = useState('')

  // useEffect(() => {
  //   if (!props.status) {
  //     setText('')
  //   }
  // }, [props.status])

  return (
    <>
      <input
        value={props.text}
        type='text'
        placeholder={props.placeholder}
        onChange={(e) => {
          props.onSearch(e.target.value)
          props.setText(e.target.value)
        }}
      />
    </>
  )
}
