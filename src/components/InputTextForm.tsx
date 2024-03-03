import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const InputTextForm = ({ name, label, control, type, sx, variant, multiline, rows, placeholder }: IFormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          size='small'
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant={variant}
          type={type}
          sx={sx}
          multiline={multiline}
          rows={rows}
          placeholder={placeholder}
        />
      )}
    />
  )
}

export default InputTextForm
