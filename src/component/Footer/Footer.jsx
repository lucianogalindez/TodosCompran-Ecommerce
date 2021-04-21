import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-light text-center text-white pt-2">
            {/* <!-- Grid container --> */}
            <div className="container p-4 pb-0">
                {/* <!-- Section: Social media --> */}
                <section className="mb-4">
                {/* <!-- Facebook --> */}
                <a
                    className="btn btn-primary btn-floating m-1"
                    style={{backgroundColor: '#3b5998'}}
                    href="#!"
                    role="button"
                    ><i className="fab fa-facebook-f"></i
                ></a>

                {/* <!-- Twitter --> */}
                <a
                    className="btn btn-primary btn-floating m-1"
                    style={{backgroundColor: '#55acee'}}
                    href="#!"
                    role="button"
                    ><i className="fab fa-twitter"></i
                ></a>

                {/* <!-- Instagram --> */}
                <a
                    className="btn btn-primary btn-floating m-1"
                    style={{backgroundColor: '#ac2bac'}}
                    href="#!"
                    role="button"
                    ><i className="fab fa-instagram"></i
                ></a>
                </section>
                {/* <!-- Section: Social media --> */}
            </div>
            {/* <!-- Grid container --> */}

            {/* <!-- Copyright --> */}
            <div className="text-center text-dark p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                © 2020 Copyright:
                <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
            </div>
        {/* <!-- Copyright --> */}
        </footer>
    )
}

export default Footer
