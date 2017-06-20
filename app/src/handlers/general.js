export const onTextChange = function(state_field) {
    return (evt) => {
        this.setState({
            [state_field]: evt.target.value
        })
    }
}