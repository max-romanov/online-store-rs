import React from "react"

interface IHeaderProps {
  onElClick: (elName: string) => void,
  els: string[]
}
export function Header(props: IHeaderProps) {
  return (
    <header className="w-full bg-white shadow-xl py-2 px-10">
      <nav className="flex justify-between">
        <ul className="flex space-x-5">
          {props.els.map((el, i) => {
            return (
              <li key={i} className="text-2xl text-sky-500 hover:text-gray-300 transition ease-in-out cursor-pointer" onClick={() => props.onElClick(el)}>
                {el}
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
