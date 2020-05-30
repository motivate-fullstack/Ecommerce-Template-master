import React from 'react'

const Contact = () => {
  return (
    <div>
      <div className="container mb-5">
        <div className="row">
          <div className="col-12 text-center py-4 my-4">
            <h1>¿Tienes alguna pregunta?</h1>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 d-flex justify-content-center">
            <img src="/assets/images/contact2.png" alt="Contáctanos" height={300} width={300} />
          </div>
          <div className="col-md-6">
            <form >
            <div className="mb-3">
                <label for="exampleForm" className="form-label">Nombre completo</label>
                <input type="text" className="form-control" id="fullNameFormContact" placeholder="Niklas Gurruchaga"/>
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Correo electónico</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="nombre@ejemplo.cl"/>
              </div>
              <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">Cuentanos qué necesitas:</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
              </div>
              <div>
              <button type="submit" className="btn btn-outline-primary w-100 mt-3">Enviar Mensaje</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact