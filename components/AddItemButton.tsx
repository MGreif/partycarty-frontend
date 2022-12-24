import { Autocomplete, Button, Text } from '@mantine/core'
import { createRef, forwardRef, useEffect, useRef, useState } from 'react'
import { IBuyableItem } from './List/ListItem'
import classes from './AddItemButton.module.css'
import { Group } from '@mantine/core'
import CreateItemButton from './CreateItemButton'
import { createBuyableItem } from '../gateway/rest/createBuyableItem'
import { useDebouncedValue } from '@mantine/hooks'
import { useFetchBuyableItems } from '../hooks/useFetchBuyableItems'
import { CATEGORIES, IList } from './List'
import { useListContext } from '../hooks/useListContext'
import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'

interface IAddItemButtonProps {
  onAdd: (buyableItem: IBuyableItem) => void
}

// Todo POST changes when added

const AddItemButton = ({ onAdd }: IAddItemButtonProps) => {
  const list: IList = useListContext()

  const {
    fetch: fetchBuyableItems,
    buyableItems,
    mutateBuyableItems,
    addedItems,
  }: any = useFetchBuyableItems()

  const [searchTerm, setSearchTerm] = useState<string | undefined>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [item, setItem] = useState<IBuyableItem & { value: string }>()
  const [searchTermDebounce] = useDebouncedValue(searchTerm, 150)

  const { t } = useTranslation('list')

  useEffect(() => {
    if (item && item.name !== searchTerm) {
      setItem(undefined)
    }
    // eslint-disable-next-line
  }, [searchTerm])

  useEffect(() => {
    if (searchTermDebounce) fetchBuyableItems(searchTermDebounce)
  }, [searchTermDebounce])

  const handleChange = (item: IBuyableItem & { value: string }) => {
    if (item?._id === 'add-button') {
      setModalOpen(true)
    } else {
      setItem(item)
    }
  }

  // eslint-disable-next-line react/display-name
  const AutoCompleteItem = forwardRef<HTMLDivElement, IBuyableItem>(
    ({ category, fluid, _id, name, ...others }: IBuyableItem, ref) => (
      <div ref={ref} {...others} key={_id}>
        {_id !== 'add-button' ? (
          <Group noWrap>
            <span>{CATEGORIES[category].icon}</span>

            <div>
              <Text>{name}</Text>
              <Text size="xs" color="dimmed">
                {t('categories.' + CATEGORIES[category].value)}
              </Text>
            </div>
          </Group>
        ) : (
          <div className={classes.autocompleteAdd}>
            <span>+</span>
          </div>
        )}
      </div>
    )
  )

  const handleModalSubmit = (values: IBuyableItem) => {
    createBuyableItem(values)
      .then(({ body }: { body: IBuyableItem }) => {
        mutateBuyableItems(body)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setModalOpen(false)
      })
  }

  const handleButtonClick = () => {
    const item = [...addedItems, ...buyableItems].find(
      (i: IBuyableItem) => i.name === searchTerm
    )
    if (!item) return
    onAdd(item)
    setSearchTerm('')
    setItem(undefined)
  }

  const autocompleteItems = useMemo(
    () => [
      ...buyableItems.map((x: IBuyableItem) => ({
        ...x,
        value: x.name,
        fluid: x.fluid.toString(),
        // group: t('categories.' + CATEGORIES[x.category].value),
      })),
      { value: searchTerm || '', _id: 'add-button' },
    ],
    [buyableItems]
  )

  return (
    <div className={classes.container}>
      <CreateItemButton
        open={modalOpen}
        close={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        defaultValues={{ name: searchTerm }}
      />
      <Autocomplete
        className={classes.autocomplete}
        placeholder={t('add-placeholder') || ""}
        itemComponent={AutoCompleteItem}
        data={autocompleteItems}
        maxLength={50}
        onItemSubmit={handleChange}
        onChange={(value: string) => setSearchTerm(value)}
        value={searchTerm}
        defaultValue=""
      />
      {item && (
        <Button className={classes.addButton} onClick={handleButtonClick}>
          +
        </Button>
      )}
    </div>
  )
}

export default AddItemButton
