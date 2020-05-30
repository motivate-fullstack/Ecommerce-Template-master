export const MessageBox = (props) => {
    return (
        <div className={`alert alert-${props.variant ? props.variant : 'danger'} ${props.aling?`text-${props.aling}`:'text-center'} fw-bold`} role='alert'>
            {props.children}
        </div>
        // <Alert key={props.variant} variant={props.variant || 'info'}>{props.children}</Alert>
    )
}

// export const AddedToCart = (props) => {
//     return (
//         <div className='alert alert-success text-center alert-dismissible' role='alert'>
//             Agregado al carrito
//         </div>
//         // <Alert key={props.variant} variant={props.variant || 'info'}>{props.children}</Alert>
//     )
// }


export const alert = (message, type, id) => {
    const alertPlaceholder = document.getElementById(`addedProduct:${id}`)

    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}