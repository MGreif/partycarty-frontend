import classes from './NewPage.module.css'
import { useRouter } from 'next/router'
import NewListForm from './NewListForm'
import { Divider } from '@mantine/core'

const NewPage = () => {
  const router = useRouter()

  return (
    <div className={classes.container}>
      <h1 className={classes.centered}>👉 Create your own List for free! 👈</h1>
      <article className={classes.article}>
        <p>
          Using PartyCarty, you can create a shopping list which can be shared
          around friends, family or even party groups! 🎉🎉🎉
        </p>
        <p>
          Everyone knows how stressful and confusing party-shopping (or shopping
          in general) could be. To evade this issue, you can create a PartyCarty
          in advance so all guests can add what they want and see what someone
          else is already buying.
        </p>
        <p>
          Guests can vote for items so the person, thats buying the item can buy
          multiple pieces so other guests wont steal your golden piece!
        </p>
      </article>
      <Divider />
      <NewListForm />
      <Divider />
      <div>
        <section className={classes.flexSection}>
          <div>
            <h2>Instructions</h2>
            <ol>
              <li>
                Fill the given form with the description/name of the event
              </li>
              <li>
                Select if other users should be able to <br />{' '}
                <ul>
                  <li>Add items</li>
                  <li>Delete items</li>
                  <li>Set items as bought</li>
                </ul>
              </li>
              <li>Share the link with your friends 🥳🥳</li>
            </ol>
          </div>
          <div>
            <h2>Always expanding item-list</h2>
            <p>
              We try to achieve the best user-experience by providing an quickly
              expanding item-list to autofill your items
            </p>
            <p>
              Each item is categorized and will be shown in a categorized view
              so its easier to find the items inside of a store
            </p>
            <p>
              if you do not get an autofill options, please feel free to{' '}
              <strong>add your product</strong> using the &#34;+&#34; button at
              the bottom of the autofill
            </p>
          </div>
        </section>
      </div>
      <Divider />
      <h3 style={{ margin: '1em auto' }}>Happy Shopping!</h3>
    </div>
  )
}

export default NewPage
