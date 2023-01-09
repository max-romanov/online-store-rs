import React, {useContext} from 'react'
import {ErrorsContext} from '../context'
import q from './Form.module.css'
import {observer} from 'mobx-react-lite'

interface IInputs {
  matcher: RegExp
  placeholder: string
  name: string
  errorSetter: (error: boolean) => void
}

const Form = () => {
  const {errors} = useContext(ErrorsContext)

  const personalInfoInputs: IInputs[] = [
    {
      matcher: /^[a-zA-Z]+ [a-zA-Z]+$/,
      placeholder: 'Your Full Name',
      name: 'name',
      errorSetter: (value: boolean) => {
        errors.setNameError(value)
      },
    },
    {
      matcher: /^[a-zA-Z]+.{4} [a-zA-Z]+.{4} [a-zA-Z]+.{4}.+$/i,
      placeholder: 'your address',
      name: 'address',
      errorSetter: (value: boolean) => {
        errors.setAddressError(value)
      },
    },
    {
      matcher: /^\+[0-9]+.{8}$/i,
      placeholder: 'your phone number',
      name: 'phoneNumber',
      errorSetter: (value: boolean) => {
        errors.setPhoneNumberError(value)
      },
    },
  ]

  const cardInfoInputs: IInputs[] = [
    {
      name: 'cardNumber',
      placeholder: 'Card Number',
      matcher: /^[0-9].{3} [0-9].{3} [0-9].{3} [0-9].{3}$/,
      errorSetter: (value: boolean) => {
        errors.setCardNumberError(value)
      },
    },
    {
      name: 'cvv',
      placeholder: 'cvv',
      matcher: /^[0-9].{2}/,
      errorSetter: (value: boolean) => {
        errors.setCodeError(value)
      },
    },
    {
      name: 'validThru',
      placeholder: 'valid thru',
      matcher: /^[0-9]{1,2}\/[0-9]{1,2}$/i,
      errorSetter: (value: boolean) => {
        errors.setValidThruError(value)
      },
    },
  ]

  return (
    <div className={q.basketPopupForm}>
      <div className={q.basketPopupInputsContainer}>
        <h3>Personal Details</h3>
        <div className={q.inputField}>
          {personalInfoInputs.map((inputData, i) => {
            return (
              <>
                {/*@ts-ignore*/}
                {errors[inputData.name] && <label className={q.errorLabel} htmlFor={inputData.name}>wrong {inputData.placeholder}</label>}
                <input
                  id={inputData.name}
                  className={q.discountPromoCode}
                  placeholder={inputData.placeholder}
                  name={inputData.name}
                  type='text'
                  onChange={(e) => {
                    inputData.errorSetter(
                      !e.target.value.match(inputData.matcher)
                    )
                  }}
                />
              </>
            )
          })}
        </div>
        <h3>Card Details</h3>
        <div className={q.inputField}>
          {cardInfoInputs.map((inputData, i) => {
            return (
              <>
                {/*@ts-ignore*/}
                {errors[inputData.name] && <label className={q.errorLabel} htmlFor={inputData.name}>wrong {inputData.placeholder}</label>}
                <input
                  className={q.discountPromoCode}
                  placeholder={inputData.placeholder}
                  type='text'
                  onChange={(e) => {
                    inputData.errorSetter(
                      !e.target.value.match(inputData.matcher)
                    )
                  }}
                />
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default observer(Form)
