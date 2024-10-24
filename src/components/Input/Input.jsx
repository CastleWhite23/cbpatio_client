import React from 'react'
import { Controller } from 'react-hook-form'
import "./Input.css"

const Input = ({defaultValue, name, control, disabled, readOnly, placeholder, style = "editInput", type = 'text',...rest}) => {
  return (
    <>        
        <Controller name={name}
        control={control}
        defaultValue={type == 'file' ? null : defaultValue}
        rules={{required: true}}
        render={({field: {value, onChange}}) => type == 'file' ? 
        //se for um input de file
        <input
        className={style}
        placeholder={placeholder}
        type={type}
        onChange={(e) => onChange(e.target.files[0])}
        disabled={disabled}
        readOnly={readOnly}
        {...rest}
      />
      //se for um input de data
      : type == 'datetime-local' ? <input
      type={type}
      defaultValue={defaultValue}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      readOnly={readOnly}
      className={style}
      {...rest}
      /> 
      
      //se não for um input de file nem de data
      : <input className={style} placeholder={placeholder} type={type} defaultValue={defaultValue} onChange={onChange} disabled={disabled} readOnly={readOnly} {...rest}/>}
        />
    </>
  )
}


export {Input}