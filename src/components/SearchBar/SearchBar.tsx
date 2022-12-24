import React, {useState} from "react"

interface ISearchBarProps {
  onInput: (e: string) => void
}
export const SearchBar = (props: ISearchBarProps) => {
  return (
    <input type="text" onInput={(e: React.FormEvent<HTMLInputElement>) => {
      props.onInput(e.currentTarget.value)
    }
    }
    />
  )
}
