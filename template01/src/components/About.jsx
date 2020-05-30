import React from 'react'
import { NavLink } from 'react-router-dom'

const About = () => {
  return (
    <div>
      <div className="container py-5 px-4">
        <div className="row">
          <div className="col-md-6">
            <h1 className='text-center text-primary fw-bold'>Sobre Nosotros</h1>
            <hr className='col-md-7 my-4 justify-content-center'style={{ margin: 'auto'}} />

            <p className="lead py-5" align="justify">Morbi nec purus vel tellus congue laoreet sed eget urna. Proin scelerisque, massa eu faucibus malesuada, nibh erat pellentesque lacus, quis consectetur lectus purus vel sem. Phasellus at tellus sit amet diam hendrerit sodales vitae at orci. Aenean libero nulla, efficitur feugiat vehicula sed, tincidunt ac dui. Praesent dictum ante porttitor, consequat velit a, vehicula libero. Duis sed tincidunt nisl, eu tristique nibh. Vestibulum a orci porttitor, hendrerit lacus ac, sodales augue. Duis quis enim ut risus tincidunt ullamcorper sed dictum velit. Etiam ut commodo risus. Suspendisse imperdiet, ipsum in pulvinar maximus, nisi diam sollicitudin ante, quis ultricies ante ipsum quis augue. Quisque lobortis ante sit amet nisl gravida fermentum. Nulla tellus justo, interdum et orci in, laoreet condimentum turpis. Fusce varius tincidunt nisi, in vestibulum tellus egestas non. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
            <NavLink to='/contact' className="btn btn-outline-primary w-100 mt-1">Contáctanos</NavLink>
          </div>
          <div className="col-md-6 d-flex justify-content-center my-4 py-3">
            <img className="my-5" src="/assets/images/about-us.png" alt="Sobre Nosotros" height={400} width={400} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About