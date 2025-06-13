const Total = props => {
    const sum = props.parts.reduce((acc, part) => acc + part.exercises, 0)
    return (
        <h3>Number of exercises {sum}</h3>
    )
}

export default Total