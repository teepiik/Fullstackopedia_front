import React, { useState } from 'react'

export const useField = type => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const setEmpty = () => {
        setValue('')
    }

    return {
        setEmpty: setEmpty,
        field: { type, value, onChange }
    }
}

// TODO Unfinished hook for Select fields

export const useSelectField = choices => {
    const [value, setValue] = useState('') // is needed?
    const type = 'select'

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const setEmpty = () => {
        setValue('')
    }

    // check choices --- need to add something for ex. ['a', 'b']
    const makeRows = () => {
        choices.map(c =>
            <option key={c} value={c}>{c}</option>
        )
    }

    return {
        makeRows: makeRows,
        setEmpty: setEmpty,
        value: value, // current selected value
        field: { type, onChange }
    }
}