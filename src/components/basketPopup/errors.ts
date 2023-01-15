import { makeAutoObservable } from 'mobx'

export class Errors {
  name: boolean
  phoneNumber: boolean
  address: boolean
  email: boolean
  cardNumber: boolean
  validThru: boolean
  cvv: boolean

  constructor(private initial: boolean) {
    this.cardNumber = initial
    this.cvv = initial
    this.validThru = initial
    this.name = initial
    this.phoneNumber = initial
    this.address = initial
    this.email = initial
    makeAutoObservable(this)
  }

  setCodeError(value: boolean) {
    this.cvv = value
  }

  setCardNumberError(value: boolean) {
    this.cardNumber = value
  }

  setValidThruError(value: boolean) {
    this.validThru = value
  }

  setNameError(value: boolean) {
    this.name = value
  }

  setAddressError(value: boolean) {
    this.address = value
  }

  setPhoneNumberError(value: boolean) {
    this.phoneNumber = value
  }

  setEmailError(value: boolean) {
    this.email = value
  }

  setDefaults() {
    this.phoneNumber = this.initial
    this.validThru = this.initial
    this.address = this.initial
    this.name = this.initial
    this.address = this.initial
    this.cvv = this.initial
    this.email = this.initial
  }
}
