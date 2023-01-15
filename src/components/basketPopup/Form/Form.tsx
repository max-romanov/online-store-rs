import React, { useContext } from 'react'
import { ErrorsContext } from '../context'
import q from './Form.module.css'
import { observer } from 'mobx-react-lite'

interface IInputs {
  matcher: RegExp
  placeholder: string
  name: string
  errorSetter: (error: boolean) => void
  type: string
  maxlength?: number
}

const Form = () => {
  const { errors } = useContext(ErrorsContext)

  const personalInfoInputs: IInputs[] = [
    {
      matcher: /^[a-zA-Z]+.{2} [a-zA-Z]+.{2}$/,
      placeholder: 'Your Full Name',
      name: 'name',
      errorSetter: (value: boolean) => {
        errors.setNameError(value)
      },
      type: 'text',
    },
    {
      matcher: /^[a-zA-Z]+.{4} [a-zA-Z]+.{4} [a-zA-Z]+.{3}.+$/i,
      placeholder: 'your address',
      name: 'address',
      errorSetter: (value: boolean) => {
        errors.setAddressError(value)
      },
      type: 'text',
    },
    {
      matcher: /^[0-9].{8,12}$/i,
      placeholder: 'your phone number',
      name: 'phoneNumber',
      errorSetter: (value: boolean) => {
        errors.setPhoneNumberError(value)
      },
      type: 'number',
    },
    {
      matcher: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      placeholder: 'email',
      name: 'email',
      errorSetter: (value: boolean) => {
        errors.setEmailError(value)
      },
      type: 'text',
    },
  ]

  const cardInfoInputs: IInputs[] = [
    {
      name: 'cardNumber',
      placeholder: 'Card Number',
      matcher: /^[0-9].{15}$/,
      errorSetter: (value: boolean) => {
        errors.setCardNumberError(value)
      },
      type: 'number',
    },
    {
      name: 'cvv',
      placeholder: 'cvv',
      matcher: /^[0-9]{2}/,
      errorSetter: (value: boolean) => {
        errors.setCodeError(value)
      },
      type: 'number',
      maxlength: 3,
    },
    {
      name: 'validThru',
      placeholder: 'valid thru',
      matcher: /^[0-9]{1,2}\/[0-9]{1,2}$/i,
      errorSetter: (value: boolean) => {
        errors.setValidThruError(value)
      },
      type: 'text',
      maxlength: 5,
    },
  ]

  return (
    <div className={q.basketPopupForm}>
      <div className={q.basketPopupInputsContainer}>
        <h3>Personal Details</h3>
        <div className={q.inputField}>
          {personalInfoInputs.map((inputData, i) => {
            return (
              <div style={{ width: '100%', display: 'flex' }} key={i}>
                {/*@ts-ignore*/}
                {errors[inputData.name] && (
                  <label className={q.errorLabel} htmlFor={inputData.name}>
                    wrong {inputData.placeholder}
                  </label>
                )}
                <input
                  key={inputData.name}
                  id={inputData.name}
                  className={q.discountPromoCode}
                  placeholder={inputData.placeholder}
                  name={inputData.name}
                  type={inputData.type}
                  maxLength={inputData.maxlength}
                  onChange={(e) => {
                    inputData.errorSetter(
                      !e.target.value.match(inputData.matcher)
                    )
                  }}
                />
              </div>
            )
          })}
        </div>
        <h3>Card Details</h3>
        <div className={q.inputField}>
          {cardInfoInputs.map((inputData, i) => {
            return (
              <div style={{ width: '100%', display: 'flex' }} key={i}>
                {/*@ts-ignore*/}
                {errors[inputData.name] && (
                  <label className={q.errorLabel} htmlFor={inputData.name}>
                    wrong {inputData.placeholder}
                  </label>
                )}
                <input
                  key={inputData.name}
                  className={q.discountPromoCode}
                  placeholder={inputData.placeholder}
                  type={inputData.type}
                  maxLength={inputData.maxlength}
                  onChange={(e) => {
                    const { value } = e.target

                    if (inputData.name === 'cvv' && e.target.value.length > 3) {
                      e.target.value = e.target.value.slice(0, 3)
                    }
                    if (
                      inputData.name === 'validThru' &&
                      e.target.value.length > 5
                    ) {
                      e.target.value = e.target.value.slice(0, 5)
                    }
                    if (
                      inputData.name === 'cardNumber' &&
                      e.target.value.length > 16
                    ) {
                      e.target.value = e.target.value.slice(0, 16)
                    }
                    if (inputData.name === 'validThru') {
                      e.target.value = e.target.value.replace(/[^\/\d]/g, '')
                      if (e.target.value.length === 4) {
                        // e.target.value = e.target.value.slice(0, 2) + "/" + e.target.value.slice(2)
                        e.target.value = e.target.value.includes('/')
                          ? e.target.value.slice(0, 2)
                          : e.target.value.slice(0, 2) +
                            '/' +
                            e.target.value.slice(2)
                        e.target.value = e.target.value
                          .split('/')
                          .map((it, i) => {
                            console.log(it, i)
                            console.log(e.target.value)
                            const num = parseInt(it)
                            if (i === 0) {
                              return (num > 12 ? 12 : num).toString()
                            }
                            return (num > 31 ? 31 : num).toString()
                          })
                          .join('/')
                      }
                    }

                    inputData.errorSetter(
                      !e.target.value.match(inputData.matcher)
                    )
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

console.log(`Hello World {
  
}`)

export default observer(Form)
