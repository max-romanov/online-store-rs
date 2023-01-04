import React from "react"

interface ISearchBarProps {
  onInput: (value: string) => void
  placeholder?: string
}

export const SearchBar = (props: ISearchBarProps) => {
  return (
    <input type="text" placeholder={props.placeholder || "Search here..."} onInput={(e: React.FormEvent<HTMLInputElement>) => props.onInput(e.currentTarget.value)}/>
  )
}
