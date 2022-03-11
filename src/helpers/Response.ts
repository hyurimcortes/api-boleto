

const AppError = (msg:any) => {
  return {
    "amount":"",
    "barCode": msg,
    "expirationDate": "",
    "status": 400
  }
}

const AppSuccess = (barCode:any) => {
  return barCode
}


export { AppError, AppSuccess }
