import { useRef } from "react";

export default function CodeInput({ length = 6, code, setCode }) {
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Разрешаем только цифры

    const newCode = [...code];
    newCode[index] = value;

    // Переключение на следующий инпут
    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    setCode(newCode);

    // // Если код полностью введён, вызываем onComplete
    // if (newCode.join("").length === length) {
    //   setCode(newCode.join(""));
    // }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
      <>
        {code.map((num, index) => (
            <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                value={num}
                maxLength={1}
                className="code__input"
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
            />
        ))}
      </>
  );
}
