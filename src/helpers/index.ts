
const boletoObj = {
  barcode: "",
  amount: "123,45",
  expirationDate: "01/01/2021",
  status: 200
}

const validateBoletoBancario = (numeroBolero:any) => {
  const code_groups = numeroBolero.length===44 && getBoletoBancarioGroups(numeroBolero);
  const validation = numeroBolero.length===44 && code_groups.codes.every((code:any) => module10(code.num) === Number(code.dv));
  if (!validation) {
      return {
          barcode: numeroBolero,
          status: 400
      }
  }
  boletoObj.barcode = code_groups.barcode;
  boletoObj.amount = formatNumberBR(code_groups.valor);
  boletoObj.expirationDate = formatDateBR(addDays(code_groups.fator));
  return boletoObj;
}

const validateConcessionaria = (numeroBolero:any) => {
  const code_groups = numeroBolero.length===48 && getConcessionariaGroups(numeroBolero);
  const validation = numeroBolero.length===48 && code_groups.codes.every((code:any) => module10(code.num) === Number(code.dv));
  if (!validation) {
      return {
          barcode: numeroBolero,
          status: 400
      }
  }
  boletoObj.barcode = code_groups.barcode;
  boletoObj.amount = formatNumberBR(code_groups.valor);
  return boletoObj;
}


const getBoletoBancarioGroups = (numeroBolero:any) =>  {
  let matches = numeroBolero.match(/^(?<campo1>\d{9})(?<dv1>\d{1})(?<campo2>\d{10})(?<dv2>\d{1})(?<campo3>\d{10})(?<dv3>\d{1})(?<dv4>\d{1})(?<fator>\d{4})(?<valor>\d+)/);
  let fields = matches.groups;

  let codes = [];
  let field_keys = Object.keys(fields);

  for (let i = 0; i < field_keys.length - 4; i = i + 2) {
    const match_group:any = {};
    match_group['num'] = Number(fields[field_keys[i]]);
    match_group['dv'] = Number(fields[field_keys[i + 1]]);
    codes.push(match_group);
  }

  let code_groups:any = {
      codes
  };
  code_groups['barcode'] = matches[0];
  code_groups['dv'] = Number(fields['dv4']);
  code_groups['fator'] = Number(fields['fator']);
  code_groups['valor'] = Number(fields['valor']);
  return code_groups;


}

const getConcessionariaGroups = (numeroBolero:any) => {
  let matches = numeroBolero.match(/^(?<campo1>\d{11})[^\d]?(?<dv1>\d{1})[^\d]?(?<campo2>\d{11})[^\d]?(?<dv2>\d{1})[^\d]?(?<campo3>\d{11})[^\d]?(?<dv3>\d{1})[^\d]?(?<campo4>\d{11})[^\d]?(?<dv4>\d{1})$/m);
  let fields = matches.groups;

  let codes = [];
  let field_keys = Object.keys(fields);
  for (let i = 0; i < field_keys.length; i = i + 2) {
      const match_group:any = {};
      match_group['num'] = fields[field_keys[i]];
      match_group['dv'] = fields[field_keys[i + 1]];
      codes.push(match_group);
  }
  let code_groups:any = {
      codes
  };
  code_groups['barcode'] = matches[0];
  code_groups['valor'] = String(code_groups.codes[0].num+code_groups.codes[1].num).replace(/^\d{4}(?<valor>\d{11}).*/, "$1");
  return code_groups;
}

const module10 = (number:any) => {
  const num_str = String(number).replace(/\D/g, '');
  let mult = 2;
  let sum = 0;
  let acc = '';

  for (let i = num_str.length - 1; i >= 0; i--) {
      acc = (mult * Number(num_str.charAt(i))) + acc;
      if (--mult < 1) {
          mult = 2;
      }
  }
  for (let i = 0; i < acc.length; i++) {
      sum = sum + Number(acc.charAt(i));
  }
  sum = sum % 10;
  if (sum != 0) {
      sum = 10 - sum;
  }
  return sum;
}

const formatNumberBR = (valor:any) => {
  return (Number(valor)/100).toFixed(2).replace(/\./g, '|').replace(/,/g, '').replace(/(\d)(?=((\d{3})+)(?:\|))/g, '$1.').replace(/\|/g, ',');
}

const formatDateBR = (date:any) => {
  const date_str = `${pad(date.getDate())}/${pad(date.getMonth()+1)}/${date.getFullYear()}`
  return date_str;
}

const addDays = (days_param : any) =>  {
  const days = days_param || 0;
  const base = "1997-10-07T00:00:00";
  const date = new Date(base);
  date.setDate(date.getDate() + days);
  return date;
}


const pad = (num:any) =>  {
  return String(num).length === 1 ? "0" + String(num) : String(num);
}


const clear = (numeroBolero:any) => {
  if (!numeroBolero) {
      return "";
  }
  return numeroBolero.replace(/[^0-9]+/g, "")
}


export { validateBoletoBancario, validateConcessionaria, clear }
