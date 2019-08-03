import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <div>
                <footer className='bg-dark text-white mt-5 p-4 text-center'>
                Copy &copy; {new Date().getFullYear()} My connector
                </footer>
               
            </div>
        )
    }
}

export default Footer