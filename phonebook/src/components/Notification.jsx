const Notification = props => {
    console.log(props.message)
    const { message } = props

    if(message === null) return null

    const style = {
        color: message.error ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    return (
        <div style={style}>{message.msg}</div>
    ) 
}

export default Notification