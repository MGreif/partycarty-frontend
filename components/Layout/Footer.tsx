import classes from './Footer.module.css'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className={classes.container}>
      <span>
        <Link href="https://de.linkedin.com/in/mika-greif">Mika Greif</Link>
      </span>
      <span>|</span>
      <span>
        <Link href="/imprint">Imprint</Link>
      </span>
    </div>
  )
}

export default Footer
