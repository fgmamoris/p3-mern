import { useState } from "react";
/*Captura en tiempo real la entrada y la guarda en el state
 */

export const useForm = (initialState = {}) => {
  //Establezco mi objeto inicial, y lo creo vacio en caso que no envien nada

  const [values, setValues] = useState(initialState);
  const reset = () => {
    setValues(initialState);
  };
  const handleInputChange = ({ target }) => {
    //{target} va entre llaves por que lo desectructuro del evento que dispara el button
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  return [values, handleInputChange, reset];
};
