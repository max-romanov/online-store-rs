import React, {useRef} from "react";

interface ISearchBarProps {
  placeholder: string
  onInput: (str: string) => void
}
export function SearchBar(props: ISearchBarProps) {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <input ref={ref} type="search" name="oleg" id="oleg" placeholder={props.placeholder} onInput={(e) => {
      props.onInput(ref.current.value)
    }} />
  )
}
