let coded_msg = "";
var elem = document.getElementById("btn2");
function chooseFunc() {
  const btn = document.querySelector('#btn');
  const radioButtons = document.querySelectorAll('input[name="mode_chosen"]');
              let selectedMode;
              for (const radioButton of radioButtons) {
                  if (radioButton.checked) {
                      selectedMode = radioButton.value;
                      break;
                  }
              }
              if(selectedMode == "true"){
                encode(message.value, key.value);
                document.getElementById("vigenere__banner").innerHTML = "Your Encrypted Message";
              }
              else if(selectedMode == "false"){
                decode(message.value, key.value);
                document.getElementById("vigenere__banner").innerHTML = "Your Decrypted Message";
              }
}

function copyToClipboard() {
  /* Get the text field */
  // var copyText = coded_msg;
  // document.getElementById("resulting__message").value;

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(coded_msg);
  elem.value = "Copied!";
}

function generateKey(str, keyInput)
{
  for(let i = 0; i < keyInput.length; i++)
  {
     if(/^[a-zA-Z]+$/.test(keyInput[i]) == false)
     {
          return "ERR";
     }
   }
    keyInput=keyInput.split("");
    if(str.length == keyInput.length)
        return keyInput.join("");
    else
    {
        let temp=keyInput.length;
        for (let i = 0; i<(str.length-temp); i++)
        {
            keyInput.push(keyInput[i % ((keyInput).length)])
        }
    }
    let generatedKey = keyInput.join("");
    let strx = (generatedKey).split("");
    for(let i = 0; i < generatedKey.length; i++)
    {
       if(generatedKey[i] == generatedKey[i].toLowerCase())
       {
            strx[i] = generatedKey[i].toUpperCase();
       }
    }
    generatedKey = strx.toString();
    let result = generatedKey.split(",");
    return result.join("");
}

function LowerToUpper(s)
{
    let str =(s).split("");
    for(let i = 0; i < s.length; i++)
    {
        if(s[i] == s[i].toLowerCase())
        {
            str[i] = s[i].toUpperCase();
        }
    }
    s = str.toString();
    return s;
}

function encode(strInput, key_var) {
  let keyInput = generateKey(strInput, key_var);
  let cipher_text="";
  let str1 = LowerToUpper(strInput);
  let str2 = str1.split(",");
  let str = str2.join("");
  if(keyInput == "ERR"){
    cipher_text = "ERROR ! Keys can only contain letters";
  }
  else{
    for (let i = 0; i < str.length; i++) {
      if(/^[a-zA-Z]+$/.test(str[i]) == false){
        cipher_text+=str[i];
      }
      else{
        // converting in range 0-25
            let x = (str[i].charCodeAt(0) + keyInput[i].charCodeAt(0)) %26;

            // convert into alphabets(ASCII)
            x += 'A'.charCodeAt(0);

            cipher_text+=String.fromCharCode(x);
      }
    }
  }
  elem.value = "Copy Text";
  coded_msg = cipher_text;
  document.getElementById("resulting__message").innerHTML = cipher_text;
}

function decode(cipher_input, key_var) {
  let keyInput = generateKey(cipher_input, key_var);
  let orig_text="";
  let ciph1 = LowerToUpper(cipher_input);
  let ciph2 = ciph1.split(",");
  let cipher_text = ciph2.join("");
  if(keyInput == "ERR"){
    orig_text = "ERROR ! Keys can only contain letters";
  }
  else{
    for (let i = 0 ; i < cipher_text.length ; i++)
    {
      if(/^[a-zA-Z]+$/.test(cipher_text[i]) == false){
        orig_text+=cipher_text[i];
      }
      else{
        // converting in range 0-25
        let x = (cipher_text[i].charCodeAt(0) -
                    keyInput[i].charCodeAt(0) + 26) %26;

        // convert into alphabets(ASCII)
        x += 'A'.charCodeAt(0);
        orig_text+=String.fromCharCode(x);
      }
    }
  }
    coded_msg = orig_text;
    elem.value = "Copy Text";
    document.getElementById("resulting__message").innerHTML = orig_text;
}
