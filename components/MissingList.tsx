import { Button, Divider } from '@mantine/core'
import { Text } from '@mantine/core'
import { useRouter } from 'next/router'
import classes from './MissingList.module.css'

const MissingList = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push('/')
  }
  return (
    <div className={classes.container}>
      <h1>This list does not exist</h1>
      <p>
        A list with this id has either not been created or been removed due to
        inactivity
      </p>
      <Divider />
      <div className={classes.buttonContainer}>
        <span>👉</span>
        <Button onClick={handleClick}>Back to home</Button>
        <span>👈</span>
      </div>
    </div>
  )
}

export { MissingList }
