import { IInputProps } from "../../interfaces";

export const InputField = (props: IInputProps) => (
    <div>
        <label
            id={ [props.name, 'label'].join('-') }
            htmlFor={ [props.name, 'input'].join('-') }
        >
            { props.label }{' '}
            { props.required ? <span title="Обязательно для заполнения">*</span> : undefined }
        </label>
        <br />
        <input
            id={ [props.name, 'input'].join('-') }
            name={ props.name }
            autoComplete={ props.autoComplete }
            required={ props.required }
            type={ props.type }
            value={ props.value }
            onChange={ e => props.onChange(e.target.value) }
        />
    </div>
);

