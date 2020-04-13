interface IInputField {
    type: string;
    label: string;
    name: string;
    id: string;
    value: string;
    onChange: (fieldValue: string) => void;
}

export const InputField = (props: IInputField) => (
    <div>
        <label htmlFor={props.name}>{props.label}</label>
        <input type={props.type} name={props.name} id={props.id} value={props.value} onChange={e => props.onChange(e.target.value)} />
    </div>
);
