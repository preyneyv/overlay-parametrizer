import React, { useState } from 'react'
import classNames from 'class-names'

export const TextField = ({ params, value, setValue }) => {
    return <div className='field'>
        <label className='field-label'>{params.label}</label>
        <input className='field-text' type='text' value={value || ''} onChange={e => setValue(e.target.value)} />
    </div>
}

export const SelectField = ({ params, value, setValue }) => {
    return <div className='field'>
        <label className='field-label'>{params.label}</label>
        <select className='field-select' value={value || ''} onChange={e => setValue(e.target.value)}>
            <option value="">{"<blank>"}</option>
            {Object.keys(params.options).map(opt =>
                <option key={opt} value={opt}>{params.options[opt]}</option>)}
        </select>
    </div>
}

export const GroupField = ({ params, value, setValue }) => {
    return <div className='field-group'>
        <label className='field-label'>{params.label}</label>
        <ParamTree {...{ value, setValue }} params={params.fields} />
    </div>
}

const fieldTypeMap = {
    text: TextField,
    select: SelectField,
    group: GroupField
}

export const ParamTree = ({ params, value, setValue }) => {
    value = value || {}
    return <div className='param-tree'>
        {Object.entries(params).map(([key, args]) => {
            const Component = fieldTypeMap[args.type]
            const _value = value[key]
            const _setValue = v => setValue({
                ...value, [key]: v
            })

            return React.createElement(Component, {
                key,
                params: params[key],
                value: _value,
                setValue: _setValue
            })
        })}
    </div>
}

export const Overlay = ({ overlay, setOverlay }) => {
    const [newState, setNewState] = useState(overlay.state)
    const [dirty, setDirty] = useState(false)
    const [visible, setVisible] = useState(false)

    return <div className='overlay'>
        <div className='overlay-header'>
            <h2 onClick={() => setVisible(!visible)}>{overlay.name}</h2>
            {visible && <div className='overlay-actions'>
                <button disabled={!dirty} className='btn btn-secondary'
                    onClick={() => {
                        // Reset the state to the previous overlay state.
                        setNewState(overlay.state)
                        setDirty(false)
                    }}>Reset</button>
                <button disabled={!dirty} className='btn btn-primary'
                    onClick={() => {
                        // Send the state to the backend
                        setOverlay(newState)
                        setDirty(false)
                    }}>Publish</button>
            </div>}
        </div>
        <div className={classNames({
            'overlay-container': true,
            visible
        })}>
            <ParamTree params={overlay.params} value={newState} setValue={(v) => {
                setDirty(true)
                setNewState(v)
            }} />
        </div>
    </div>
}


