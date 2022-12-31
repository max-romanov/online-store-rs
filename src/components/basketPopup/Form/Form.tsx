import React, {useContext, useEffect, useState} from "react"
import {ErrorsContext} from "../context";
import q from "../../../pages/Basket/Basket.module.css"
import {observer} from "mobx-react-lite";

interface IInputs {
  matcher: RegExp
  placeholder: string
  name: string
  errorSetter: (error: boolean) => void,
}

const Form = () => {
  const {errors} = useContext(ErrorsContext)

  const personalInfoInputs: IInputs[] = [
    {
      matcher: /^[a-zA-Z]+ [a-zA-Z]+$/,
      placeholder: "Your Full Name",
      name: "name",
      errorSetter: (value: boolean) => {
        errors.setNameError(value)
      },
    },
    {
      matcher: /^[a-zA-Z]+.{4} [a-zA-Z]+.{4} [a-zA-Z]+.{4}$/i,
      placeholder: "your address",
      name: "address",
      errorSetter: (value: boolean) => {
        errors.setAddressError(value)
      },
    },
    {
      matcher: /^\+[0-9]+.{8}$/i,
      placeholder: "your phone number",
      name: "phoneNumber",
      errorSetter: (value: boolean) => {
          errors.setPhoneNumberError(value)
      },
    }
  ]

  const cardInfoInputs: IInputs[] = [
    {
      name: "cardNumber",
      placeholder: "Card Number",
      matcher: /^[0-9].{3} [0-9].{3} [0-9].{3} [0-9].{3}$/,
      errorSetter: (value: boolean) => {
        errors.setCardNumberError(value)
      }
    },
    {
      name: "cvv",
      placeholder: "cvv",
      matcher: /^[0-9].{2}/,
      errorSetter: (value: boolean) => {
       errors.setCodeError(value)
      }
    },
    {
      name: "validThru",
      placeholder: "valid thru",
      matcher: /^[0-9]{1,2}\/[0-9]{1,2}$/i,
      errorSetter: (value: boolean) => {
        errors.setValidThruError(value)
      }
    }
  ]

  return (
    <div className={q.basketPopupForm}>
      <div className={q.basketPopupInputsContainer}>
        <h1>Personal Details</h1>
        {personalInfoInputs.map((inputData, i) => {
          return (
            <div key={i}>
              <input placeholder={inputData.placeholder} name={inputData.name} type="text" onChange={(e) => {
                inputData.errorSetter(!e.target.value.match(inputData.matcher))
              }}/>
            </div>
          )
        })}
      </div>
      <div className={q.basketPopupInputsContainer}>
        <h1>Card Details</h1>
        {cardInfoInputs.map((inputData, i) => {
          return (
            <div key={i}>
              <input placeholder={inputData.placeholder} type="text" onChange={(e) => {
                inputData.errorSetter(!e.target.value.match(inputData.matcher))
              }}/>
            </div>
          )
        })}
      </div>
      {errors.nameError && <p className={q.basketPopupErrorText}>name Error</p>}
      {errors.phoneNumberError && <p className={q.basketPopupErrorText}>phone number Error</p>}
      {errors.addressError && <p className={q.basketPopupErrorText}>address Error</p>}
      {errors.codeError && <p className={q.basketPopupErrorText}>code Error</p>}
      {errors.cardNumberError && <p className={q.basketPopupErrorText}>cardNumber Error</p>}
      {errors.validThruError && <p className={q.basketPopupErrorText}>valid thru Error</p>}
    </div>
  )
}

export default observer(Form)
