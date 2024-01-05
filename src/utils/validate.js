// How to to format code on save
const REGEX = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
};

const validate = (rules, values) => {
  let errObj = {};

  for (const ruleKey in rules) {
    for (const rule of rules[ruleKey]) {
      // Case Required
      if (rule.required) {
        if (!!!values[ruleKey]) {
          errObj[ruleKey] = rule.message || "Vui lòng nhập";
          break;
        }
      }

      // Case Regex
      if (rule.regex && values[ruleKey]) {
        let pattern = "";
        if (rule.regex in REGEX) {
          pattern = REGEX[rule.regex];
        } else if (rule.regex instanceof RegExp) {
          pattern = rule.regex;
        } else {
          pattern = new RegExp(rule.regex, "gi");
        }

        // test regex
        if (!pattern.test(values[ruleKey])) {
          errObj[ruleKey] = rule.message || "Vui lòng nhập đúng định dạng";
          break;
        }
      }

      //  Case: Function
      if (typeof rule === "function") {
        const message = rule(values[ruleKey], values);
        if (!!message) {
          errObj[ruleKey] = message || "Dữ liệu nhập sai yêu cầu";
          break;
        }
      }
    }
  }

  return errObj;
};

export const requireRule = (message) => {
  return {
    required: true,
    message,
  };
};

export const regexRule = (regex, message) => {
  return {
    regex,
    message,
  };
};

export default validate;
