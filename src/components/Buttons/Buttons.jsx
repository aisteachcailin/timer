import './Buttons.css'

export default function Buttons({ purpose, ...props }) {
    return (
    <button {...props} className="btn">
        {purpose}
    </button>
    )
}
