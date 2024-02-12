import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

import { useState } from "react";

const btnValues = [
    ["AC", "%", "+-", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "+"],
    [1, 2, 3, "-"],
    [0, ".", "="],
];

const toLocaleString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
const removeSpaces = (num) => num.toString().replace(/\s/g, "");


const App = () => {
const [calc, setCalc] = useState({
    num : 0,
    sign: "",
    res: 0,
})
const resetHandler = (e) => {
    setCalc({
        ...calc,
        num: 0,
        res: 0,
        sign: "",
    })
}
const invertHandler = (e) => {
    setCalc({
        ...calc,
        num: calc.num ? calc.num * -1 : 0,
        res: calc.res ? calc.res * -1 : 0,
        sign: "",
    })
    
}
const percentHandler = (e) => {
        let num = calc.num ? parseFloat(calc.num) : 0;
        let res = calc.res ? parseFloat(calc.res) : 0;

        setCalc({
            ...calc,
            num: (num /= Math.pow(100, 1)),
            res: (res /= Math.pow(100, 1)),
            sign: "",
        })
        
}
const equalsHandler = (e) => {

    if (calc.num && calc.sign){
        const math = (a, b, sign) => 
            sign === "+" 
            ? a+b : sign === "-" ? a-b : sign === "X" ? a*b : a/b 
        setCalc({
            ...calc,
            res: 
                calc.num == "0" && calc.sign == "/" ? "Can't divide by 0"
                : math(Number(calc.res), Number (calc.num), calc.sign),
                sign: "",
                num: 0,
            })
    }
    

}
const signHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
        ...calc,
        sign: e.target.innerHTML,
        res: !calc.res && calc.num ? calc.num : calc.res,
        num: 0,
    })
    console.log("sign")
    
}
const commaHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
        ...calc,
        num: !calc.num.toString().includes(".") ? calc.num + value : calc.num ,
    })
    console.log("comma")
}
const numHandler = (e) => {
    
    e.preventDefault();
    const value = e.target.innerHTML;
    
    if (removeSpaces(calc.num).length < 16) {
        setCalc({
            ...calc,
            num: 
            removeSpaces(calc.num) === 0 && value == "0"
                ? "0"
                 : removeSpaces(calc.num) % 1 == 0
                 ? Number(removeSpaces(calc.num) + value)
                 :removeSpaces(calc.num) + value,
            res: 
                !calc.sign ? 0 : calc.res,
        })
    }
    console.log("number")
}
const buttonClickHandler = (e, btn) => {
    
                        btn === "AC" ? resetHandler()
                        : btn === "+-" ? invertHandler()
                        : btn === "%" ? percentHandler()
                        : btn === "=" ? equalsHandler()
                        : btn === "." ? commaHandler(e)
                        : btn === "/" || btn === "X" || btn === "-" || btn === "+" ? signHandler(e)
                        : numHandler(e)
                                
}

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
            btnValues.flat().map((btn, i) => {
                return (
                    <Button 
                    key={i}
                    className={btn === "=" ? 'equals': ""}
                    BtnValue = {btn}
                    onClick={ (e) => buttonClickHandler(e, btn)
                    
                    }
                    />
                )
            })
}
      </ButtonBox>
    </Wrapper>
  );
  
};

export default App ;