import {makeAutoObservable} from "mobx";


export class Errors {
  
  nameError: boolean;
  phoneNumberError: boolean;
  addressError: boolean;

  cardNumberError: boolean;
  validThruError: boolean;
  codeError: boolean;

  constructor(private initial: boolean) {
    this.cardNumberError = initial;
    this.codeError = initial;
    this.validThruError = initial;
    this.nameError = initial;
    this.phoneNumberError = initial;
    this.addressError = initial;
    makeAutoObservable(this)
  }

  setCodeError(value: boolean) {
    this.codeError = value;
  }

  setCardNumberError(value: boolean) {
    this.cardNumberError = value;
  }

  setValidThruError(value: boolean) {
    this.validThruError = value;
  }

  setNameError(value: boolean) {
    this.nameError = value;
  }

  setAddressError(value: boolean) {
    this.addressError = value;
  }

  setPhoneNumberError(value: boolean) {
    this.phoneNumberError = value;
  } 

  setDefaults() {
    this.phoneNumberError = this.initial;
    this.validThruError = this.initial;
    this.addressError = this.initial;
    this.nameError = this.initial;
    this.addressError = this.initial;
    this.codeError = this.initial;
  }
} 
