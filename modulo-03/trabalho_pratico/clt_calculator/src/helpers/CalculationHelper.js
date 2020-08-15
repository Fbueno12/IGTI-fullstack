const INSS_TABLE = [
  {
    id: 1,
    minValue: 0,
    maxValue: 1045,
    difference: 1045 - 0,
    discountPercentage: 0.075,
    discountValue: -1,
  },
  {
    id: 2,
    minValue: 1045.01,
    maxValue: 2089.6,
    difference: 2089.6 - 1045,
    discountPercentage: 0.09,
  },
  {
    id: 3,
    minValue: 2089.61,
    maxValue: 3134.4,
    difference: 3134.4 - 2089.6,
    discountPercentage: 0.12,
  },
  {
    id: 4,
    minValue: 3134.41,
    maxValue: 6101.06,
    difference: 6101.06 - 3134.4,
    discountPercentage: 0.14,
  },
];

let formatter = new Intl.NumberFormat([], {
  style: 'currency',
  currency: 'BRL'
})

function round(value) {
  return +value.toFixed(2);
}

function baseINSS(number) {
  return formatter.format(number) || 0;
}

function baseIRPF(number) {
  const base = number - discountINSS(number).discount;
  return {formatted: formatter.format(base), base: base};
}

function discountINSS(number) {
  number = parseInt(number);
  let percent = 0;
  let discount = 0;

  if(number > 6101.06) {
    discount = 713.10;
    percent = round((100 * discount) / number);
    return {formatted: `${formatter.format(discount)} (${percent}%)`, discount, percent};
  }
  
  INSS_TABLE.forEach(range => {
    if(number > range.maxValue) {
      discount += round((range.maxValue - range.minValue) * range.discountPercentage);
    } else if((number > range.minValue) && (number < range.maxValue)) {
      discount += round((number - range.minValue) * range.discountPercentage);
      percent = round((100 * discount) / number);
    }
  });

  return {formatted: `${formatter.format(discount)} (${percent}%)`, discount, percent};
}

function discountIRPF(number) {
  const {base} = baseIRPF(number);
  let discount =
  base < 1903.98
  ? 0
  : base < 2826.65
  ? round(base * 0.075) - 142.8
  : base < 3751.05
  ? round(base * 0.15) - 354.8
  : base < 4664.68
  ? round(base * 0.225) - 636.13
  : round(base * 0.275) - 869.36;
    
  const percent = round((discount * 100) / number) || 0;

  return {formatted: `${formatter.format(discount)} (${percent}%)`, base: discount, percent};
}

function baseSalary(number) {
  const result = number - discountINSS(number).discount - discountIRPF(number).base;

  const percent = round((result * 100) / number) || 0;
  return {formatted: `${formatter.format(result)} (${percent}%)`, base: result, percent};
}

export {baseINSS, discountINSS, baseIRPF, discountIRPF, baseSalary};