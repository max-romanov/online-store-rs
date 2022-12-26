import React from "react"

interface IPopupProps {
  children: React.ReactElement
}

export const Popup = (props: IPopupProps) => {
  return (
    <div>
      {props.children}
    </div>
  )
}
