import { ButtonInterface } from "../../interfaces/Button"

const Button = ({ ButtonType, ButtonClassName, ButtonText, ButonOnClick }: ButtonInterface)=>{
    const defaultClass = 'btn'
    const combinedClass = `${defaultClass} ${ButtonClassName}`.trim();
    return(
    <button className={combinedClass} type={ButtonType} onClick={ButonOnClick}>
        {ButtonText}
    </button>
    )
}

export default Button;