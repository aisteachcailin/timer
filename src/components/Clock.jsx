export default function Clock({ ...props }) {
    return (
        <input
        {...props}
        type="number"
        placeholder="00"
        maxLength={2}
      />
    )
}