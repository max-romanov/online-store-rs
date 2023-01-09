import React from 'react'
import q from '../Footer/Footer.module.css'

const Footer = () => {
  return (
    <footer className={q.footer}>
      <div className='mainContainer'>
        <div className={q.footerItems}>
          <a className={q.link} href='https://github.com/max-romanov'>
            @max-romanov
          </a>
          <a className={q.link} href='https://github.com/Pashabn'>
            @pashabn
          </a>
          <span>2023</span>
          <a className={q.link} href="https://rs.school/js">RSSchool</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
