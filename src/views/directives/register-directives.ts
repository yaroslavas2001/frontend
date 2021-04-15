// Vue.directive("card", {
//   bind(el) {
//     el.oninput = function(e) {
//       if (!e.isTrusted) {
//         return;
//       }

//       let x = this.value.replace(/\D/g, "").match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
//       this.value =
//         x[1] + (x[2] ? "-" + x[2] : "") + (x[3] ? "-" + x[3] : "") + (x[4] ? "-" + x[4] : "");
//       el.dispatchEvent(new Event("input"));
//     };
//   }
// });
// Vue.directive("phone", {
//   bind(el) {
//     el.oninput = function(e) {
//       if (!e.isTrusted) {
//         return;
//       }

//       let x = this.value.replace(/\D/g, "").match(/(\d{0,4})(\d{0,3})(\d{0,3})/);
//       this.value = x[1] + (x[2] ? "-" + x[2] : "") + (x[3] ? "-" + x[3] : "");
//       el.dispatchEvent(new Event("input"));
//     };
//   }
// });
function maskeInputMaskDirectiverValue(v, m, tkn) {
  v = v.value;
  m = m.value;
  debugger;
  const value = v || "";
  const mask = m || "";
  let maskIndex = 0;
  let valueIndex = 0;
  let output = "";
  while (maskIndex < mask.length && valueIndex < value.length) {
    let maskCharacter = mask[maskIndex];
    const masker = tkn[maskCharacter];
    const valueCharacter = value[valueIndex];
    if (masker && !masker.escape) {
      if (masker.pattern.test(valueCharacter)) {
        output += masker.transform ? masker.transform(valueCharacter) : valueCharacter;
        maskIndex += 1;
      }
      valueIndex += 1;
    } else {
      if (masker && masker.escape) {
        maskIndex += 1;
        maskCharacter = mask[maskIndex];
      }
      output += maskCharacter;
      if (valueCharacter === maskCharacter) valueIndex += 1;
      maskIndex += 1;
    }
  }
  let outputRest = "";
  while (maskIndex < mask.length) {
    const maskCharacter = mask[maskIndex];
    if (tkn[maskCharacter]) {
      outputRest = "";
      break;
    }
    outputRest += maskCharacter;
    maskIndex += 1;
  }
  return output + outputRest;
}
