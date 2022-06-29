import classes from './Footer.module.css'

const Footer = () => {
  return (
    <div className={classes.container}>
      <span>
        <a href="https://de.linkedin.com/in/mika-greif">Mika Greif</a>
      </span>
      <span>|</span>
      <span>
        <a href="/imprint">Imprint</a>
      </span>
    </div>
  )
}

export default Footer
